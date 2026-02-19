"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AdminFooterPage() {
  const [form, setForm] = useState({
    businessName: "",
    description: "",
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "content", "footer");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForm(snap.data() as any);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  /* ---------------- INPUT ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    const ref = doc(db, "content", "footer");
    await setDoc(ref, form);

    alert("Footer updated!");
  };

  if (loading) {
    return <p className="p-6 md:p-10 text-gray-400">Loading footer...</p>;
  }

  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto text-white">
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        Footer Editor
      </h1>

      {/* FORM CARD */}
      <div
        className="
          bg-gray-900
          border border-gray-800
          rounded-2xl
          p-5 md:p-6
          flex flex-col gap-5
        "
      >
        {/* BUSINESS NAME */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Business Name
          </label>

          <input
            name="businessName"
            placeholder="Aligned Minds Hypnotherapy"
            value={form.businessName}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Footer Description
          </label>

          <textarea
            name="description"
            placeholder="Helping you achieve mental clarity..."
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Phone Number
          </label>

          <input
            name="phone"
            placeholder="(540) 000-0000"
            value={form.phone}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Business Email
          </label>

          <input
            name="email"
            placeholder="info@alignedminds.com"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Business Address
          </label>

          <input
            name="address"
            placeholder="Winchester, VA"
            value={form.address}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="
            bg-blue-600
            hover:bg-blue-700
            transition
            text-white
            py-3
            rounded-lg
            font-semibold
            mt-2
          "
        >
          Save Footer Changes
        </button>
      </div>
    </main>
  );
}
