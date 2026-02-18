"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  duration?: number;
  price?: number;
  depositAmount?: number;
  depositPaid?: boolean;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch bookings
  const fetchBookings = async () => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    const data: Booking[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        name: data.name,
        email: data.email,
        date: data.date,
        time: data.time,
        duration: data.duration || 60,
        price: data.price || 0,
        depositAmount: data.depositAmount || 0,
        depositPaid: data.depositPaid || false,
      };
    });

    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔹 Delete booking
  const handleDelete = async (id: string) => {
    if (!confirm("Cancel this booking?")) return;

    await deleteDoc(doc(db, "bookings", id));
    fetchBookings();
  };

  if (loading) {
    return <p className="p-10">Loading bookings...</p>;
  }

  return (
    <main className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-blue-900">
        Bookings Dashboard
      </h1>

      {bookings.length === 0 && <p>No bookings yet.</p>}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Price</th>
              <th className="p-3">Deposit</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-3 font-medium">{booking.name}</td>

                <td className="p-3">{booking.email}</td>

                <td className="p-3">{booking.date}</td>

                <td className="p-3">{booking.time}</td>

                {/* DURATION */}
                <td className="p-3">{booking.duration} min</td>

                {/* PRICE */}
                <td className="p-3 font-semibold text-blue-900">
                  ${booking.price}
                </td>

                {/* DEPOSIT STATUS */}
                <td className="p-3">
                  {booking.depositPaid ? (
                    <span className="text-green-600 font-semibold">
                      Paid (${booking.depositAmount})
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">Unpaid</span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
