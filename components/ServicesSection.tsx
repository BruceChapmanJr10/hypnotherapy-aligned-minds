"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Service } from "../types/service";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, "services"));

      const data: Service[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Service, "id">),
      }));

      setServices(data.filter((s) => s.active));
    };

    fetchServices();
  }, []);

  return (
    <section
      className="
        py-24
        px-6
        bg-gradient-to-b
        from-blue-50
        to-white
      "
      id="services"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* TITLE */}
        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-blue-900
            mb-4
          "
        >
          Our Services
        </h2>

        {/* SUBTEXT */}
        <p
          className="
            text-gray-600
            max-w-2xl
            mx-auto
            mb-14
            leading-relaxed
          "
        >
          Personalized hypnotherapy sessions designed to support healing,
          clarity, and lasting change.
        </p>

        {/* GRID */}
        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-10
          "
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
