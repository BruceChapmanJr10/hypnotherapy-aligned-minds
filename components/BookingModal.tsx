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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: Props) {
  const [availability, setAvailability] = useState<any>({});
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  // 🔹 Fetch availability from Firestore
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

  useEffect(() => {
    if (!date) return;

    const fetchBookings = async () => {
      const formattedDate = date.toISOString().split("T")[0];

      const q = query(
        collection(db, "bookings"),
        where("date", "==", formattedDate),
      );

      const snapshot = await getDocs(q);

      const booked = snapshot.docs.map((doc) => doc.data().time);

      setBookedSlots(booked);
    };

    fetchBookings();
  }, [date]);

  // Convert date → day name
  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  };

  if (!isOpen) return null;

  const dayName = date ? getDayName(date) : "";
  const allSlots: string[] = availability[dayName] || [];

  const timeSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

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
      await addDoc(collection(db, "bookings"), {
        name: form.name,
        email: form.email,
        date: date.toISOString().split("T")[0], // YYYY-MM-DD
        time: time,
        createdAt: Timestamp.now(),
      });

      alert("Appointment booked successfully!");

      // Reset form
      setTime(null);
      setForm({ name: "", email: "" });

      onClose();
    } catch (error) {
      console.error(error);
      alert("Error booking appointment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="sticky top-0 ml-auto block text-gray-500 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Book Appointment
        </h2>

        {/*  CALENDAR */}
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          className="mx-auto border rounded-lg p-2"
        />

        {/*  TIME SLOTS */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Select Time</h3>

          {timeSlots.length === 0 && (
            <p className="text-gray-500 text-sm">
              No availability for this day.
            </p>
          )}
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
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : time === slot
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-900 border-gray-300 hover:bg-blue-50"
        }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* 👤 FORM */}
        <div className="mt-6 flex flex-col gap-3">
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded text-gray-900"
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded text-gray-900"
          />
        </div>

        {/* 📌 SUMMARY */}
        {date && time && (
          <p className="text-center mt-4 text-gray-700">
            {date.toDateString()} at {time}
          </p>
        )}

        {/* ✅ BOOK BUTTON */}
        <button
          onClick={handleBooking}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
