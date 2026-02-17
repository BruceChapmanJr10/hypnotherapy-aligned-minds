"use client";

import Link from "next/link";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  return (
    <>
      <header
        className="
        bg-white
        border-b
        border-gray-200
        shadow-sm
        sticky
        top-0
        z-40
      "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
          px-6
          py-4
        "
        >
          {/* LOGO */}
          <Link
            href="/"
            className="
              text-xl
              font-bold
              text-blue-900
              tracking-tight
            "
          >
            Aligned Minds
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="
            hidden
            md:flex
            items-center
            gap-8
            text-sm
            font-medium
            text-gray-700
          "
          >
            <Link href="/" className="hover:text-blue-700 transition">
              Home
            </Link>

            <Link href="/#services" className="hover:text-blue-700 transition">
              Services
            </Link>

            <Link href="/blog" className="hover:text-blue-700 transition">
              Blog
            </Link>

            <Link href="/contact" className="hover:text-blue-700 transition">
              Contact
            </Link>

            {/* BOOK BUTTON */}
            <button
              onClick={() => setOpenBooking(true)}
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-blue-700
                transition
                shadow-sm
              "
            >
              Book
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden
              text-2xl
              text-blue-900
            "
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
            className="
            md:hidden
            flex
            flex-col
            gap-4
            px-6
            pb-6
            text-gray-700
            bg-white
            border-t
            border-gray-200
          "
          >
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>

            <button
              onClick={() => {
                setOpenBooking(true);
                setOpen(false);
              }}
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                text-center
                hover:bg-blue-700
                transition
              "
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
      />
    </>
  );
}
