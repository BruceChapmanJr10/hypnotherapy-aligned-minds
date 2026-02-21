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

import { CldUploadWidget } from "next-cloudinary";

/* ================= TYPES ================= */

interface Service {
  id?: string;
  title: string;
  description: string;
  price: string;
  image: string;
  active: boolean;
  seoTitle: string;
  seoDescription: string;
}

/* ================= PAGE ================= */

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Service>({
    title: "",
    description: "",
    price: "",
    image: "",
    active: true,
    seoTitle: "",
    seoDescription: "",
  });

  /* ================= FETCH ================= */

  const fetchServices = async () => {
    const snapshot = await getDocs(collection(db, "services"));

    //  Normalize old docs so fields are never undefined
    const data = snapshot.docs.map((docSnap) => {
      const service = docSnap.data() as Partial<Service>;

      return {
        id: docSnap.id,
        title: service.title || "",
        description: service.description || "",
        price: service.price || "",
        image: service.image || "",
        active: service.active ?? true,
        seoTitle: service.seoTitle || "",
        seoDescription: service.seoDescription || "",
      };
    });

    setServices(data as Service[]);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  /* ================= INPUT ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= IMAGE ================= */

  const handleImageUpload = (url: string) => {
    setForm({
      ...form,
      image: url,
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, ...serviceData } = form;

    if (editingId) {
      await updateDoc(doc(db, "services", editingId), serviceData);
      alert("Service updated!");
      setEditingId(null);
    } else {
      await addDoc(collection(db, "services"), serviceData);
      alert("Service added!");
    }

    // Reset form
    setForm({
      title: "",
      description: "",
      price: "",
      image: "",
      active: true,
      seoTitle: "",
      seoDescription: "",
    });

    fetchServices();
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    await deleteDoc(doc(db, "services", id));
    fetchServices();
  };

  /* ================= EDIT ================= */

  const handleEdit = (service: Service) => {
    //  Prevent undefined fields
    setForm({
      id: service.id,
      title: service.title || "",
      description: service.description || "",
      price: service.price || "",
      image: service.image || "",
      active: service.active ?? true,
      seoTitle: service.seoTitle || "",
      seoDescription: service.seoDescription || "",
    });

    setEditingId(service.id || null);

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= UI ================= */

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto text-white">
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        Manage Services
      </h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="
          bg-gray-900
          border border-gray-800
          rounded-2xl
          p-5 md:p-6
          flex flex-col gap-5
          mb-14
        "
      >
        {/* -------- CONTENT -------- */}
        <h2 className="text-lg font-semibold text-blue-400">Service Content</h2>

        <input
          name="title"
          placeholder="Service Title"
          value={form.title}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Service Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="bg-gray-800 p-3 rounded w-full"
          required
        />

        <input
          name="price"
          placeholder="Price (ex: $150)"
          value={form.price}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded w-full"
          required
        />

        {/* -------- IMAGE UPLOAD -------- */}
        <div>
          <label className="text-sm text-gray-300 block mb-2">
            Service Image
          </label>

          <CldUploadWidget
            uploadPreset="aligned_minds_unsigned"
            onSuccess={(result: any) => {
              handleImageUpload(result.info.secure_url);
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="
                  bg-purple-600
                  hover:bg-purple-700
                  transition
                  p-3
                  rounded
                  w-full
                  font-semibold
                "
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* IMAGE PREVIEW */}
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="
              w-full
              max-w-sm
              h-48
              object-cover
              rounded-lg
              border
              border-gray-700
            "
          />
        )}

        {/* -------- SEO -------- */}
        <div className="border border-gray-800 rounded-xl p-4 mt-4">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">
            Service SEO
          </h2>

          <input
            name="seoTitle"
            placeholder="SEO Title (Google Page Title)"
            value={form.seoTitle}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full mb-3"
          />

          <textarea
            name="seoDescription"
            placeholder="SEO Meta Description"
            value={form.seoDescription}
            onChange={handleChange}
            rows={3}
            className="bg-gray-800 p-3 rounded w-full"
          />
        </div>

        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            transition
            p-3
            rounded
            font-semibold
          "
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* ================= SERVICES LIST ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="
              bg-gray-900
              border border-gray-800
              rounded-2xl
              p-5
              flex flex-col
              gap-3
            "
          >
            {/* IMAGE */}
            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}

            {/* INFO */}
            <h2 className="font-semibold text-lg">{service.title}</h2>

            <p className="text-blue-400 font-semibold">{service.price}</p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleEdit(service)}
                className="bg-yellow-500 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(service.id!)}
                className="bg-red-600 px-3 py-1 rounded text-sm"
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
