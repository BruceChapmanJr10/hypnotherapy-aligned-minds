"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";

export default function BookingPage() {
  const [openBooking, setOpenBooking] = useState(true);

  return (
    <main
      className="
        min-h-screen
        py-24
        px-6
        bg-gradient-to-b
        from-blue-50
        to-white
        flex
        items-center
        justify-center
      "
    >
      {/* PAGE CONTAINER */}
      <div className="text-center max-w-2xl">
        {/* TITLE */}
        <h1
          className="
            text-4xl
            md:text-5xl
            font-bold
            text-blue-900
            mb-6
          "
        >
          Book Your Appointment
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-600 mb-10 text-lg">
          Choose a date and time that works best for you. We’re here to support
          your journey.
        </p>

        {/* BUTTON (optional if modal auto-opens) */}
        <button
          onClick={() => setOpenBooking(true)}
          className="
            bg-blue-600
            text-white
            px-8
            py-3
            rounded-lg
            hover:bg-blue-700
            transition
            font-semibold
            shadow
          "
        >
          Open Booking Calendar
        </button>
      </div>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
      />
    </main>
  );
}
