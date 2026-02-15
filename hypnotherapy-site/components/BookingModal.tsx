"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: Props) {
  const [date, setDate] = useState<Date | null>(new Date());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center">
          Book Appointment
        </h2>

        {/* CALENDAR */}
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          className="mx-auto"
        />

        {/* SELECTED DATE */}
        {date && (
          <p className="text-center mt-4 text-gray-700">
            Selected: {date.toDateString()}
          </p>
        )}

        {/* BOOK BUTTON */}
        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
