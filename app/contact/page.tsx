"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function ContactPage() {
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
    <main className="py-20 px-6 bg-gray-950 min-h-screen text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-10 rounded-2xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        {success && (
          <p className="text-green-400 text-center mb-6">
            Message sent successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* NAME */}
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            required
          />

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            required
          />

          {/* MESSAGE */}
          <textarea
            name="message"
            placeholder="Your Message..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="bg-gray-800 border border-gray-700 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}
