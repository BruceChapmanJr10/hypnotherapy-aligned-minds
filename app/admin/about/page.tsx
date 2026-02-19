"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CldUploadWidget } from "next-cloudinary";

export default function AdminAboutPage() {
  const [form, setForm] = useState({
    title: "",
    text: "",
    image: "",
    seoTitle: "",
    seoDescription: "",
  });

  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "content", "about");
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

  /* ---------------- IMAGE ---------------- */
  const handleImageUpload = (url: string) => {
    setForm({
      ...form,
      image: url,
    });
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    const ref = doc(db, "content", "about");
    await setDoc(ref, form);

    alert("About section updated!");
  };

  if (loading) {
    return <p className="p-6 md:p-10 text-gray-300">Loading...</p>;
  }

  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto text-white">
      {/* PAGE TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        Edit About Section
      </h1>

      <div className="flex flex-col gap-8">
        {/* ================= CONTENT ================= */}
        <section
          className="
            bg-gray-900
            border border-gray-800
            rounded-2xl
            p-5 md:p-6
            shadow
          "
        >
          <h2 className="text-lg md:text-xl font-semibold text-blue-400 mb-4">
            About Content
          </h2>

          <div className="flex flex-col gap-4">
            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-400">Section Title</label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="bg-gray-800 p-3 rounded w-full"
                placeholder="About Section Title"
              />
            </div>

            {/* TEXT */}
            <div>
              <label className="text-sm text-gray-400">About Text</label>

              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                rows={6}
                className="bg-gray-800 p-3 rounded w-full"
                placeholder="Write about your practice..."
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                About Image
              </label>

              <CldUploadWidget
                uploadPreset="aligned_minds_unsigned"
                onSuccess={(result: any) => {
                  handleImageUpload(result.info.secure_url);
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="
                      bg-purple-600
                      hover:bg-purple-700
                      transition
                      py-3
                      px-4
                      rounded
                      w-full
                    "
                  >
                    Upload Image
                  </button>
                )}
              </CldUploadWidget>
            </div>

            {/* PREVIEW */}
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="
                  w-full
                  h-48 md:h-64
                  object-cover
                  rounded-lg
                  border border-gray-700
                "
              />
            )}
          </div>
        </section>

        {/* ================= SEO ================= */}
        <section
          className="
            bg-gray-900
            border border-gray-800
            rounded-2xl
            p-5 md:p-6
            shadow
          "
        >
          <h2 className="text-lg md:text-xl font-semibold text-blue-400 mb-4">
            About Page SEO
          </h2>

          <div className="flex flex-col gap-4">
            {/* SEO TITLE */}
            <div>
              <label className="text-sm text-gray-400">
                SEO Title (Google Page Title)
              </label>

              <input
                name="seoTitle"
                value={form.seoTitle}
                onChange={handleChange}
                className="bg-gray-800 p-3 rounded w-full"
                placeholder="About Hypnotherapy | Aligned Minds"
              />
            </div>

            {/* SEO DESCRIPTION */}
            <div>
              <label className="text-sm text-gray-400">
                SEO Meta Description
              </label>

              <textarea
                name="seoDescription"
                value={form.seoDescription}
                onChange={handleChange}
                rows={3}
                className="bg-gray-800 p-3 rounded w-full"
                placeholder="Learn about our hypnotherapy approach..."
              />
            </div>
          </div>
        </section>

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
          "
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}
