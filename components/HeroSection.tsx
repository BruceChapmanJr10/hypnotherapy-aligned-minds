"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface Props {
  title: string;
  heroImage: string;
}

export default function HeroSection({ title, heroImage }: Props) {
  const [openBooking, setOpenBooking] = useState(false);

  return (
    <section
      className="
      py-24
      px-6
      text-center
      bg-gradient-to-b
      from-blue-50
      to-white
    "
    >
      {/* TITLE */}
      <h1
        className="
        text-5xl
        md:text-6xl
        font-bold
        mb-8
        text-blue-900
        tracking-tight
      "
      >
        {title}
      </h1>

      {/* CTA BUTTONS */}
      <div
        className="
        flex
        justify-center
        gap-6
        mb-14
        flex-wrap
      "
      >
        {/* PRIMARY BUTTON */}
        <button
          onClick={() => setOpenBooking(true)}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-lg
            font-semibold
            transition
            shadow-md
          "
        >
          Book Appointment
        </button>

        {/* SECONDARY BUTTON */}
        <Link href="/contact">
          <button
            className="
              border
              border-blue-600
              text-blue-700
              hover:bg-blue-50
              px-8
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            Contact Us
          </button>
        </Link>
      </div>

      {/* HERO IMAGE */}
      {heroImage && (
        <div className="flex justify-center">
          <div
            className="
            relative
            w-full
            max-w-4xl
            h-[320px]
            md:h-[380px]
            lg:h-[420px]
            rounded-2xl
            overflow-hidden
            shadow-lg
            border
            border-gray-200
            bg-white
          "
          >
            <Image
              src={heroImage}
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
      />
    </section>
  );
}
