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
  });

  const [loading, setLoading] = useState(true);

  // Fetch about content
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

  // 🔹 Handle text input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageUpload = (url: string) => {
    setForm({
      ...form,
      image: url,
    });
  };

  // Save content
  const handleSave = async () => {
    const ref = doc(db, "content", "about");

    await setDoc(ref, form);

    alert("About section updated!");
  };

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Edit About Section</h1>

      <div className="flex flex-col gap-6">
        {/* TITLE */}
        <input
          name="title"
          placeholder="Section Title"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* TEXT */}
        <textarea
          name="text"
          placeholder="About text..."
          value={form.text}
          onChange={handleChange}
          rows={6}
          className="border p-3 rounded"
        />

        {/* CLOUDINARY UPLOAD */}
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
              className="bg-purple-600 text-white py-3 rounded"
            >
              Upload About Image
            </button>
          )}
        </CldUploadWidget>

        {/* IMAGE PREVIEW */}
        {form.image && (
          <img
            src={form.image}
            alt="About Preview"
            className="w-full h-64 object-cover rounded"
          />
        )}

        {/* SAVE */}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}
