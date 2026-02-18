"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import BookingModal from "@/components/BookingModal";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  active: boolean;
}

export default function PricingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [openBooking, setOpenBooking] = useState(false);

  //  Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, "services"));

      const data: Service[] = snapshot.docs.map((doc) => {
        const serviceData = doc.data();

        return {
          id: doc.id,
          title: serviceData.title || "",
          description: serviceData.description || "",
          price: serviceData.price || "",
          image: serviceData.image || "",
          active: serviceData.active ?? true,
        };
      });

      setServices(data.filter((s) => s.active));
    };

    fetchServices();
  }, []);

  return (
    <>
      <main
        className="
          min-h-screen
          py-24
          px-6
          bg-gradient-to-b
          from-blue-50
          to-white
        "
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Session Pricing
          </h1>

          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Choose the session that best supports your transformation journey.
          </p>

          {/* PRICING CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  border border-gray-200
                  p-8
                  flex flex-col
                  justify-between
                  hover:shadow-xl
                  transition
                "
              >
                {/* TITLE */}
                <h2 className="text-xl font-bold text-blue-900 mb-3">
                  {service.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm mb-6">
                  {service.description}
                </p>

                {/* PRICE */}
                <div className="text-3xl font-bold text-blue-600 mb-6">
                  {service.price}
                </div>

                {/* BOOK BUTTON */}
                <button
                  onClick={() => setOpenBooking(true)}
                  className="
                    bg-blue-600
                    text-white
                    py-3
                    rounded-lg
                    hover:bg-blue-700
                    transition
                    font-semibold
                  "
                >
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
      />
    </>
  );
}
