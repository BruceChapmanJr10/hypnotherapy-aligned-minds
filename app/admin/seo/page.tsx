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

  /* ---------------- FETCH SEO ---------------- */
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
    const ref = doc(db, "content", "seo");
    await setDoc(ref, form);

    alert("SEO updated!");
  };

  if (loading) {
    return <p className="p-6 md:p-10 text-gray-400">Loading SEO settings...</p>;
  }

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto text-white">
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        SEO Manager
      </h1>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* ================= FORM ================= */}
        <div
          className="
            bg-gray-900
            border border-gray-800
            rounded-2xl
            p-5 md:p-6
            flex flex-col gap-6
          "
        >
          {/* HOMEPAGE TITLE */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Homepage Title
            </label>

            <input
              name="homeTitle"
              placeholder="Aligned Minds Hypnotherapy | Winchester VA"
              value={form.homeTitle}
              onChange={handleChange}
              className="bg-gray-800 p-3 rounded w-full"
            />
          </div>

          {/* HOMEPAGE DESCRIPTION */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Homepage Meta Description
            </label>

            <textarea
              name="homeDescription"
              placeholder="Professional hypnotherapy sessions designed to help you overcome stress and anxiety."
              value={form.homeDescription}
              onChange={handleChange}
              rows={3}
              className="bg-gray-800 p-3 rounded w-full"
            />
          </div>

          {/* BLOG TITLE */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Blog Page Title
            </label>

            <input
              name="blogTitle"
              placeholder="Hypnotherapy Blog | Aligned Minds"
              value={form.blogTitle}
              onChange={handleChange}
              className="bg-gray-800 p-3 rounded w-full"
            />
          </div>

          {/* BLOG DESCRIPTION */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Blog Meta Description
            </label>

            <textarea
              name="blogDescription"
              placeholder="Insights, guidance, and hypnotherapy techniques to support mental clarity."
              value={form.blogDescription}
              onChange={handleChange}
              rows={3}
              className="bg-gray-800 p-3 rounded w-full"
            />
          </div>

          {/* SAVE */}
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
            Save SEO Settings
          </button>
        </div>

        {/* ================= GOOGLE PREVIEW ================= */}
        <div
          className="
            bg-white
            text-black
            rounded-2xl
            p-5 md:p-6
            shadow
          "
        >
          <h2 className="font-semibold text-lg mb-6">Google Search Preview</h2>

          {/* HOMEPAGE */}
          <div className="mb-10">
            <p className="text-sm text-gray-500 mb-1">alignedminds.com</p>

            <p className="text-blue-700 text-lg font-medium leading-snug">
              {form.homeTitle || "Homepage Title Preview"}
            </p>

            <p className="text-gray-600 text-sm mt-1">
              {form.homeDescription ||
                "Your homepage meta description will appear here."}
            </p>
          </div>

          {/* BLOG */}
          <div>
            <p className="text-sm text-gray-500 mb-1">alingedminds.com/blog</p>

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
