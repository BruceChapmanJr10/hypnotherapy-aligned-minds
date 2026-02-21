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

/* ---------------- BOOKING TYPE ---------------- */
/* Represents a scheduled client session */
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

  /* ---------------- FETCH BOOKINGS ---------------- */
  /* Retrieves bookings ordered by newest first */
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

  /* ---------------- DELETE BOOKING ---------------- */
  /* Permanently removes a booking record */
  const handleDelete = async (id: string) => {
    if (!confirm("Cancel this booking?")) return;

    await deleteDoc(doc(db, "bookings", id));
    fetchBookings();
  };

  if (loading) {
    return <p className="p-10 text-white">Loading bookings...</p>;
  }

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Bookings Dashboard
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-400">No bookings yet.</p>
      )}

      {/* ---------------- MOBILE VIEW ---------------- */}
      <div className="md:hidden space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">{booking.name}</h2>

              <button
                onClick={() => handleDelete(booking.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>

            <p className="text-gray-400 text-sm">{booking.email}</p>

            <div className="text-sm space-y-1">
              <p>
                📅 {booking.date} — {booking.time}
              </p>

              <p>⏱ Duration: {booking.duration} min</p>

              <p className="font-semibold text-blue-400">💲 ${booking.price}</p>

              <p>
                💳 Deposit:{" "}
                {booking.depositPaid ? (
                  <span className="text-green-400 font-semibold">
                    Paid (${booking.depositAmount})
                  </span>
                ) : (
                  <span className="text-red-400 font-semibold">Unpaid</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- DESKTOP TABLE ---------------- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-900 text-gray-300 text-left">
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
              <tr key={booking.id} className="border-t border-gray-800">
                <td className="p-3 font-medium">{booking.name}</td>

                <td className="p-3">{booking.email}</td>

                <td className="p-3">{booking.date}</td>

                <td className="p-3">{booking.time}</td>

                <td className="p-3">{booking.duration} min</td>

                <td className="p-3 font-semibold text-blue-400">
                  ${booking.price}
                </td>

                <td className="p-3">
                  {booking.depositPaid ? (
                    <span className="text-green-400 font-semibold">
                      Paid (${booking.depositAmount})
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold">Unpaid</span>
                  )}
                </td>

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
