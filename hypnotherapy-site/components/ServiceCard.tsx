"use client";

import Image from "next/image";
import { Service } from "../types/service";

interface Props {
  service: Service;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 w-full bg-gray-800">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-800 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 text-center">
        <h3 className="text-xl text-gray-800 font-semibold mb-3">
          {service.title}
        </h3>

        <button
          onClick={onClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          More Info
        </button>
      </div>
    </div>
  );
}
