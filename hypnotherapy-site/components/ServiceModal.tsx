"use client";

import { Service } from "../types/service";

interface Props {
  service: Service | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: Props) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-2xl text-gray-800 font-bold mb-4">
          {service.title}
        </h2>

        <p className="mb-4 text-gray-800">{service.description}</p>

        <p className="font-semibold text-gray-800 text-lg">
          Price: {service.price}
        </p>
      </div>
    </div>
  );
}
