"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { db } from "../lib/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/* ---------------- BOOKING MODAL COMPONENT ---------------- */
/* Handles appointment scheduling, availability lookup,
   Firestore booking creation, and Stripe redirect */

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}

export default function BookingModal({ isOpen, onClose, serviceId }: Props) {
  const [availability, setAvailability] = useState<any>({});
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(60);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH AVAILABILITY ---------------- */
  useEffect(() => {
    const fetchAvailability = async () => {
      const ref = doc(db, "availability", "schedule");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setAvailability(snap.data());
      }
    };

    fetchAvailability();
  }, []);

  /* ---------------- FETCH BOOKED SLOTS ---------------- */
  useEffect(() => {
    if (!date) return;

    const fetchBookings = async () => {
      const formattedDate = date.toISOString().split("T")[0];

      const q = query(
        collection(db, "bookings"),
        where("date", "==", formattedDate),
      );

      const snapshot = await getDocs(q);
      const booked = snapshot.docs.map((docSnap) => docSnap.data().time);

      setBookedSlots(booked);
    };

    fetchBookings();
  }, [date]);

  const getDayName = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  if (!isOpen) return null;

  const dayName = date ? getDayName(date) : "";
  const allSlots: string[] = availability[dayName] || [];

  /* ---------------- CREATE BOOKING + STRIPE ---------------- */
  const handleBooking = async () => {
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    if (!form.name || !form.email) {
      alert("Please fill out your details.");
      return;
    }

    try {
      setLoading(true);

      //  Create Firestore booking first
      const docRef = await addDoc(collection(db, "bookings"), {
        name: form.name,
        email: form.email,
        date: date.toISOString().split("T")[0],
        time,
        duration,
        depositPaid: false,
        createdAt: Timestamp.now(),
      });

      //  Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: docRef.id,
          serviceId: serviceId,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Stripe error response:", text);
        alert("Payment initialization failed.");
        return;
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to redirect to payment.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 border border-gray-200">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
          Book Appointment
        </h2>

        {/* CALENDAR */}
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          className="mx-auto border border-gray-200 rounded-xl p-2 shadow-sm"
        />

        {/* TIME SLOTS */}
        <div className="mt-8">
          <h3 className="font-semibold text-gray-800 mb-3 text-center">
            Select Time
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {allSlots.map((slot: string) => {
              const isBooked = bookedSlots.includes(slot);

              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  onClick={() => setTime(slot)}
                  className={`p-2 rounded-lg border text-sm font-medium transition
                  ${
                    isBooked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
                      : time === slot
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-900 border-gray-200 hover:bg-blue-50"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* DURATION */}
        <div className="mt-8">
          <h3 className="font-semibold text-gray-800 mb-2 text-center">
            Session Length
          </h3>

          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border border-gray-300 bg-white p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value={30}>30 Minutes</option>
            <option value={60}>60 Minutes</option>
            <option value={90}>90 Minutes</option>
            <option value={120}>120 Minutes</option>
          </select>
        </div>

        {/* CLIENT INFO */}
        <div className="mt-8 flex flex-col gap-3">
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 bg-white p-3 rounded-lg text-gray-900 placeholder-gray-500"
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 bg-white p-3 rounded-lg text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* SUMMARY */}
        {date && time && (
          <p className="text-center mt-5 text-gray-700">
            {date.toDateString()} at{" "}
            <span className="font-semibold text-blue-900">{time}</span> —{" "}
            {duration} min
          </p>
        )}

        {/* BOOK BUTTON */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm & Pay Deposit"}
        </button>
      </div>
    </div>
  );
}
