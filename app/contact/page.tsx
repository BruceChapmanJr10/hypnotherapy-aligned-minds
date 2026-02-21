"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/* ---------------- CONTACT CLIENT ---------------- */
/* Handles contact form submission and Firestore storage */

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SUBMIT FORM ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...form,
        createdAt: Timestamp.now(),
      });

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen py-24 px-6 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border border-blue-100">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6">
          Contact Aligned Minds Hypnotherapy
        </h1>

        {success && (
          <p className="text-green-600 text-center mb-6 font-medium">
            Message sent successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-200 p-3 rounded-lg"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-200 p-3 rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Your Message..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
            className="bg-gray-50 border border-gray-200 p-3 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mt-2"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}
