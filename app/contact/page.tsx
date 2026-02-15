"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted (we will connect Firebase later)");
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input placeholder="Name" className="border p-2" required />

        <input
          placeholder="Email"
          type="email"
          className="border p-2"
          required
        />

        <textarea
          placeholder="Message"
          className="border p-2"
          rows={5}
          required
        />

        <button className="bg-blue-600 text-white p-3 rounded">
          Send Message
        </button>
      </form>
    </main>
  );
}
