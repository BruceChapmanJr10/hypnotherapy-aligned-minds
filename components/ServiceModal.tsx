"use client";

import { Service } from "../types/service";

/* ---------------- SERVICE MODAL COMPONENT ---------------- */
/* Displays expanded service details in overlay modal */

interface Props {
  service: Service | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: Props) {
  if (!service) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-blue-950/40
        backdrop-blur-sm
        flex items-center justify-center
        z-50
        p-4
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-title"
    >
      {/* MODAL CARD */}
      <div
        className="
          relative
          bg-white
          rounded-2xl
          max-w-lg
          w-full
          p-8
          shadow-xl
          border border-gray-200
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close service details"
          className="
            absolute
            top-4 right-4
            w-9 h-9
            flex items-center justify-center
            rounded-full
            bg-gray-100
            text-gray-600
            hover:bg-blue-100
            hover:text-blue-700
            transition
            shadow-sm
          "
        >
          ✕
        </button>

        {/* TITLE */}
        <h2
          id="service-title"
          className="
            text-2xl
            font-bold
            text-blue-900
            mb-4
          "
        >
          {service.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-700 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* PRICE */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <p className="font-semibold text-blue-900 text-lg">
            Price: {service.price}
          </p>
        </div>
      </div>
    </div>
  );
}
