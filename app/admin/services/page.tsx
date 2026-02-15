"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Service {
  id?: string;
  title: string;
  description: string;
  price: string;
  image: string;
  active: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Service>({
    title: "",
    description: "",
    price: "",
    image: "",
    active: true,
  });

  // 🔹 Fetch Services
  const fetchServices = async () => {
    const snapshot = await getDocs(collection(db, "services"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Service),
    }));

    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // 🔹 Handle Input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Add / Update Service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { id, ...serviceData } = form;

      await updateDoc(doc(db, "services", editingId), serviceData);

      alert("Service updated!");
      setEditingId(null);
    } else {
      const { id, ...serviceData } = form;

      await addDoc(collection(db, "services"), serviceData);

      alert("Service added!");
    }

    setForm({
      title: "",
      description: "",
      price: "",
      image: "",
      active: true,
    });

    fetchServices();
  };

  // 🔹 Delete Service
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    await deleteDoc(doc(db, "services", id));
    fetchServices();
  };

  // 🔹 Edit Service
  const handleEdit = (service: Service) => {
    setForm(service);
    setEditingId(service.id || null);
  };

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Manage Services</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-16">
        <input
          name="title"
          placeholder="Service Title"
          value={form.title}
          onChange={handleChange}
          className="border p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Service Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3"
          rows={4}
          required
        />

        <input
          name="price"
          placeholder="Price (ex: $150)"
          value={form.price}
          onChange={handleChange}
          className="border p-3"
          required
        />

        <input
          name="image"
          placeholder="Image URL or /public path"
          value={form.image}
          onChange={handleChange}
          className="border p-3"
        />

        {form.image && (
          <div className="relative w-48 h-32 mt-2">
            <img
              src={form.image}
              alt="Preview"
              className="object-cover rounded border"
            />
          </div>
        )}

        <button className="bg-blue-600 text-white p-3 rounded">
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* SERVICE LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="border p-4 rounded-lg flex flex-col gap-2"
          >
            <h2 className="font-semibold text-lg">{service.title}</h2>

            <p className="text-sm text-gray-600">{service.price}</p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleEdit(service)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(service.id!)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
