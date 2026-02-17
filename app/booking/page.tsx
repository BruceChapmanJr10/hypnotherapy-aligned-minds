"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";

export default function BookingPage() {
  const [openBooking, setOpenBooking] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50 px-6">
      {/* Optional intro content */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Book Your Appointment
        </h1>

        <p className="text-gray-600">
          Select a date and time to schedule your hypnotherapy session.
        </p>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
      />
    </main>
  );
}
