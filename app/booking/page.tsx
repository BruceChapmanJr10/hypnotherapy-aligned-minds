"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";

/* ---------------- BOOKING PAGE CLIENT ---------------- */
/* Handles booking modal interaction and UI rendering */

export default function BookingClient() {
  const [openBooking, setOpenBooking] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50 px-6">
      {/* PAGE INTRO */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Book Your Appointment
        </h1>

        <p className="text-gray-600">
          Select a date and time to schedule your hypnotherapy session.
        </p>
      </div>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
      />
    </main>
  );
}
