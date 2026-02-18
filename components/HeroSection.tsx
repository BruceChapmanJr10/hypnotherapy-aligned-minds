"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import BookingModal from "@/components/BookingModal";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { Sofia } from "next/font/google";

export const metadata = {
  title: "Aligned Minds | Home",
  description:
    "Book hypnotherapy sessions designed to help you overcome stress, anxiety, and limiting beliefs.",
};

const sofia = Sofia({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeroSection() {
  const [openBooking, setOpenBooking] = useState(false);
  const [content, setContent] = useState<any>(null);

  // Fetch hero CMS content
  useEffect(() => {
    const fetchHero = async () => {
      const ref = doc(db, "content", "hero");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setContent(snap.data());
      }
    };

    fetchHero();
  }, []);

  if (!content) return null;

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
        className={`
        ${sofia.className}
        text-5xl
        md:text-6xl
        font-bold
        mb-6
        text-blue-900
        tracking-tight
      `}
      >
        {content.title}
      </h1>

      {/* SUBTITLE */}
      {content.subtitle && (
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      )}

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
      {content.imageUrl && (
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
              src={content.imageUrl}
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
