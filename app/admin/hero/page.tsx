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

  // 🔹 Fetch Hero Content
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

  // 🔹 Handle Text Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle Image Upload
  const handleImageUpload = (url: string) => {
    setForm({
      ...form,
      imageUrl: url,
    });
  };

  // 🔹 Save Hero Content
  const handleSave = async () => {
    const docRef = doc(db, "content", "hero");

    await setDoc(docRef, form);

    alert("Hero section updated!");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Manage Hero Section</h1>

      <div className="flex flex-col gap-6">
        {/* TITLE */}
        <input
          name="title"
          placeholder="Hero Title"
          value={form.title}
          onChange={handleChange}
          className="border p-3"
        />

        {/* SUBTITLE */}
        <input
          name="subtitle"
          placeholder="Hero Subtitle"
          value={form.subtitle}
          onChange={handleChange}
          className="border p-3"
        />

        {/* IMAGE UPLOAD */}
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
              className="bg-purple-600 text-white p-3 rounded"
            >
              Upload Hero Image
            </button>
          )}
        </CldUploadWidget>

        {/* IMAGE PREVIEW */}
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Hero Preview"
            className="w-full h-64 object-cover rounded"
          />
        )}

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white p-3 rounded"
        >
          Save Hero Section
        </button>
      </div>
    </main>
  );
}
