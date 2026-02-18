"use client";

import Image from "next/image";
import { Service } from "../types/service";

export const metadata = {
  title: "Aligned Minds | Home",
  description:
    "Book hypnotherapy sessions designed to help you overcome stress, anxiety, and limiting beliefs.",
};

interface Props {
  service: Service;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: Props) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-sm
      overflow-hidden
      hover:shadow-md
      hover:-translate-y-1
      transition
      duration-300
    "
    >
      {/* IMAGE */}
      <div
        className="
        relative
        h-48
        w-full
        bg-gray-100
      "
      >
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="
            flex
            items-center
            justify-center
            h-full
            text-gray-400
            text-sm
          "
          >
            No Image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 text-center">
        <h3
          className="
          text-xl
          font-semibold
          text-blue-900
          mb-4
        "
        >
          {service.title}
        </h3>

        <button
          onClick={onClick}
          className="
            bg-blue-600
            text-white
            px-5
            py-2.5
            rounded-lg
            hover:bg-blue-700
            transition
            shadow-sm
            font-medium
          "
        >
          More Info
        </button>
      </div>
    </div>
  );
}
