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

  // 🔹 Fetch footer content
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

  // 🔹 Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Save
  const handleSave = async () => {
    const ref = doc(db, "content", "footer");

    await setDoc(ref, form);

    alert("Footer updated!");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Edit Footer</h1>

      <div className="flex flex-col gap-6">
        <input
          name="businessName"
          placeholder="Business Name"
          value={form.businessName}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="border p-3 rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <button
          onClick={handleSave}
          className="bg-blue-900 text-white py-3 rounded"
        >
          Save Footer
        </button>
      </div>
    </main>
  );
}
