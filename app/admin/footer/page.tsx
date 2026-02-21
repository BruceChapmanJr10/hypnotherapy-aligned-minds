"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AdminFooterPage() {
  /* ---------------- FOOTER STATE ---------------- */
  /* Stores global footer content displayed sitewide */
  const [form, setForm] = useState({
    businessName: "",
    description: "",
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH FOOTER ---------------- */
  /* Retrieves footer content from Firestore */
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

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SAVE FOOTER ---------------- */
  /* Updates global footer document */
  const handleSave = async () => {
    const ref = doc(db, "content", "footer");

    await setDoc(ref, form, { merge: true });

    alert("Footer updated!");
  };

  if (loading) {
    return <p className="p-6 md:p-10 text-gray-400">Loading footer...</p>;
  }

  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto text-white">
      {/* PAGE TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        Footer Editor
      </h1>

      {/* ================= FORM ================= */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-6 flex flex-col gap-5">
        {/* BUSINESS NAME */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Business Name
          </label>

          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="Aligned Minds Hypnotherapy"
            className="bg-gray-800 p-3 rounded w-full"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Footer Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Helping you achieve mental clarity..."
            className="bg-gray-800 p-3 rounded w-full"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Phone Number
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(540) 000-0000"
            className="bg-gray-800 p-3 rounded w-full"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Business Email
          </label>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="info@alignedminds.com"
            className="bg-gray-800 p-3 rounded w-full"
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Business Address
          </label>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Winchester, VA"
            className="bg-gray-800 p-3 rounded w-full"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold mt-2"
        >
          Save Footer Changes
        </button>
      </div>
    </main>
  );
}
