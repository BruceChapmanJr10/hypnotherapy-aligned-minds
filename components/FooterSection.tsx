"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await addDoc(collection(db, "contactMessages"), {
      ...form,
      createdAt: Timestamp.now(),
    });

    setForm({ name: "", email: "", message: "" });
    setLoading(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* LEFT — CONTACT INFO */}
        <div className="flex flex-col gap-4 text-gray-800">
          <h2 className="text-2xl font-bold text-blue-900">
            Aligned Minds Hypnotherapy
          </h2>

          <p className="text-gray-600">
            Transform your mindset and create lasting change through
            professional hypnotherapy sessions.
          </p>

          <div className="mt-6 flex flex-col gap-2 text-gray-700">
            <p>📍 Winchester, Virginia</p>
            <p>📞 (540) 000‑0000</p>
            <p>✉️ info@alignedmindshypnotherapy.com</p>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            © {new Date().getFullYear()} Aligned Minds. All rights reserved.
          </p>
        </div>

        {/* RIGHT — CONTACT FORM */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Contact Us</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300 p-3 rounded"
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300 p-3 rounded"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
              className="bg-white border border-gray-300 p-3 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 hover:bg-blue-800 transition text-white p-3 rounded font-semibold"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-600 text-sm">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
}
