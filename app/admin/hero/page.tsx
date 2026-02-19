"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CldUploadWidget } from "next-cloudinary";

export default function AdminHeroPage() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH HERO ---------------- */
  const fetchHero = async () => {
    const docRef = doc(db, "content", "hero");
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      setForm(snapshot.data() as any);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHero();
  }, []);

  /* ---------------- INPUT ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = (url: string) => {
    setForm({
      ...form,
      imageUrl: url,
    });
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    const docRef = doc(db, "content", "hero");
    await setDoc(docRef, form);

    alert("Hero section updated!");
  };

  if (loading) {
    return <p className="p-6 md:p-10 text-gray-400">Loading hero content...</p>;
  }

  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto text-white">
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        Hero Section Editor
      </h1>

      {/* FORM CARD */}
      <div
        className="
          bg-gray-900
          border border-gray-800
          rounded-2xl
          p-5 md:p-6
          flex flex-col gap-6
        "
      >
        {/* ---------------- TITLE ---------------- */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Hero Title</label>

          <input
            name="title"
            placeholder="Aligned Minds Hypnotherapy"
            value={form.title}
            onChange={handleChange}
            className="
              bg-gray-800
              p-3
              rounded
              w-full
              text-sm md:text-base
            "
          />
        </div>

        {/* ---------------- SUBTITLE ---------------- */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Hero Subtitle
          </label>

          <input
            name="subtitle"
            placeholder="Transform your mind and life through hypnotherapy"
            value={form.subtitle}
            onChange={handleChange}
            className="
              bg-gray-800
              p-3
              rounded
              w-full
              text-sm md:text-base
            "
          />
        </div>

        {/* ---------------- IMAGE UPLOAD ---------------- */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Hero Background Image
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
                  w-full
                  bg-purple-600
                  hover:bg-purple-700
                  transition
                  text-white
                  py-3
                  rounded-lg
                  font-semibold
                "
              >
                Upload Hero Image
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* ---------------- IMAGE PREVIEW ---------------- */}
        {form.imageUrl && (
          <div>
            <p className="text-sm text-gray-400 mb-2">Image Preview</p>

            <img
              src={form.imageUrl}
              alt="Hero Preview"
              className="
                w-full
                h-48 md:h-64
                object-cover
                rounded-xl
                border border-gray-800
              "
            />
          </div>
        )}

        {/* ---------------- SAVE BUTTON ---------------- */}
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
          Save Hero Changes
        </button>
      </div>
    </main>
  );
}
