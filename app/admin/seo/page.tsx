"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/* ---------------- SEO PAGE CONFIG ---------------- */
/* Controls which pages appear in the SEO manager.
   Adding a page here automatically creates form
   inputs and Google preview output. */

const seoPages = [
  { key: "home", label: "Homepage", path: "" },
  { key: "blog", label: "Blog", path: "/blog" },
  { key: "about", label: "About", path: "/about" },
  { key: "services", label: "Services", path: "/services" },
  { key: "contact", label: "Contact", path: "/contact" },
];

export default function AdminSEOPage() {
  /* ---------------- SEO STATE ---------------- */
  /* Stores centralized SEO metadata */
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH SEO ---------------- */
  /* Retrieves SEO document from Firestore */
  useEffect(() => {
    const fetchSEO = async () => {
      const ref = doc(db, "content", "seo");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForm(snap.data());
      } else {
        /* Initialize empty structure if doc missing */
        const emptySEO: any = {};

        seoPages.forEach((page) => {
          emptySEO[`${page.key}Title`] = "";
          emptySEO[`${page.key}Description`] = "";
        });

        setForm(emptySEO);
      }

      setLoading(false);
    };

    fetchSEO();
  }, []);

  /* ---------------- INPUT HANDLER ---------------- */
  /* Updates SEO state dynamically */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SAVE SEO ---------------- */
  /* Merges updates into central SEO document */
  const handleSave = async () => {
    const ref = doc(db, "content", "seo");

    await setDoc(ref, form, { merge: true });

    alert("SEO updated!");
  };

  if (loading) {
    return <p className="p-6 md:p-10 text-gray-400">Loading SEO settings...</p>;
  }

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto text-white">
      {/* PAGE TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        SEO Manager
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* ================= FORM SECTION ================= */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-8">
          {seoPages.map((page) => {
            const titleKey = `${page.key}Title`;
            const descKey = `${page.key}Description`;

            return (
              <div key={page.key} className="space-y-4">
                <h2 className="text-lg font-semibold text-white">
                  {page.label} SEO
                </h2>

                {/* PAGE TITLE INPUT */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    {page.label} Title
                  </label>

                  <input
                    name={titleKey}
                    value={form[titleKey] || ""}
                    onChange={handleChange}
                    placeholder={`${page.label} Title`}
                    className="bg-gray-800 p-3 rounded w-full"
                  />
                </div>

                {/* META DESCRIPTION INPUT */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    {page.label} Meta Description
                  </label>

                  <textarea
                    name={descKey}
                    value={form[descKey] || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder={`${page.label} meta description`}
                    className="bg-gray-800 p-3 rounded w-full"
                  />
                </div>
              </div>
            );
          })}

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold mt-4"
          >
            Save SEO Settings
          </button>
        </div>

        {/* ================= GOOGLE PREVIEW ================= */}
        <div className="bg-white text-black rounded-2xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-6">Google Search Preview</h2>

          {seoPages.map((page) => {
            const titleKey = `${page.key}Title`;
            const descKey = `${page.key}Description`;

            return (
              <div key={page.key} className="mb-10">
                {/* URL */}
                <p className="text-sm text-gray-500 mb-1">
                  alignedminds.com{page.path}
                </p>

                {/* TITLE */}
                <p className="text-blue-700 text-lg font-medium leading-snug">
                  {form[titleKey] || `${page.label} Title Preview`}
                </p>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm mt-1">
                  {form[descKey] ||
                    `Your ${page.label.toLowerCase()} meta description will appear here.`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
