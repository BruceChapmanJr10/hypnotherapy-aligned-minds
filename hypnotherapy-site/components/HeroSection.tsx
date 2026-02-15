"use client";

import Image from "next/image";

interface Props {
  title: string;
  heroImage: string;
}

export default function HeroSection({ title, heroImage }: Props) {
  return (
    <section className="py-20 px-6 text-center">
      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-10 text-gray-900">{title}</h1>

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
