"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AdminSEOPage() {
  const [form, setForm] = useState({
    homeTitle: "",
    homeDescription: "",
    blogTitle: "",
    blogDescription: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Fetch SEO
  useEffect(() => {
    const fetchSEO = async () => {
      const ref = doc(db, "content", "seo");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForm(snap.data() as any);
      }

      setLoading(false);
    };

    fetchSEO();
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
    const ref = doc(db, "content", "seo");
    await setDoc(ref, form);

    alert("SEO updated!");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">SEO Manager</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* ---------------- FORM ---------------- */}
        <div className="flex flex-col gap-6">
          {/* HOMEPAGE TITLE */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Homepage Title
            </label>
            <input
              name="homeTitle"
              placeholder="Aligned Minds Hypnotherapy | Winchester VA"
              value={form.homeTitle}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

          {/* HOMEPAGE DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Homepage Meta Description
            </label>
            <textarea
              name="homeDescription"
              placeholder="Professional hypnotherapy sessions designed to help you overcome stress and anxiety."
              value={form.homeDescription}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              rows={3}
            />
          </div>

          {/* BLOG TITLE */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Blog Page Title
            </label>
            <input
              name="blogTitle"
              placeholder="Hypnotherapy Blog | Aligned Minds"
              value={form.blogTitle}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

          {/* BLOG DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Blog Meta Description
            </label>
            <textarea
              name="blogDescription"
              placeholder="Insights, guidance, and hypnotherapy techniques to support mental clarity."
              value={form.blogDescription}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              rows={3}
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Save SEO
          </button>
        </div>

        {/* ---------------- GOOGLE PREVIEW ---------------- */}
        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <h2 className="font-semibold text-lg mb-6 text-gray-800">
            Google Preview
          </h2>

          {/* HOMEPAGE PREVIEW */}
          <div className="mb-10">
            <p className="text-sm text-gray-500 mb-1">
              alignedmindshypnotherapy.com
            </p>

            <p className="text-blue-700 text-lg font-medium leading-snug">
              {form.homeTitle || "Homepage Title Preview"}
            </p>

            <p className="text-gray-600 text-sm mt-1">
              {form.homeDescription ||
                "Your homepage meta description will appear here."}
            </p>
          </div>

          {/* BLOG PREVIEW */}
          <div>
            <p className="text-sm text-gray-500 mb-1">
              alignedmindshypnotherapy.com/blog
            </p>

            <p className="text-blue-700 text-lg font-medium leading-snug">
              {form.blogTitle || "Blog Title Preview"}
            </p>

            <p className="text-gray-600 text-sm mt-1">
              {form.blogDescription ||
                "Your blog meta description will appear here."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
