"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  heroImage: string;
}

export default function HeroSection({ title, heroImage }: Props) {
  return (
    <section className="py-20 bg-gray-300 px-6 text-center">
      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-6 text-gray-900">{title}</h1>

      {/* CTA BUTTONS */}
      <div className="flex justify-center gap-6 mb-10">
        <Link href="/booking">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            Book Appointment
          </button>
        </Link>

        <Link href="/contact">
          <button className="border border-gray-400 text-blue-700 hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition">
            Contact Us
          </button>
        </Link>
      </div>

      {/* HERO IMAGE */}
      {heroImage && (
        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl h-[320px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg">
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
    </section>
  );
}
