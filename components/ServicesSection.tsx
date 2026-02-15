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
    <section className="py-20 px-6 bg-gray-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl text-gray-800 font-bold mb-12">Our Services</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
