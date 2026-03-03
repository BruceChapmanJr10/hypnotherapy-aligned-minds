"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";

/* ---------------- FOOTER COMPONENT ---------------- */
/* Displays CMS business info + contact form.
   Mobile layout stacks vertically with copyright at bottom. */

export default function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------------- FETCH FOOTER CONTENT ---------------- */
  useEffect(() => {
    const fetchFooter = async () => {
      const ref = doc(db, "content", "footer");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setContent(snap.data());
      }
    };

    fetchFooter();
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

  /* ---------------- SUBMIT FORM ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await addDoc(collection(db, "contactMessages"), {
      ...form,
      createdAt: Timestamp.now(),
    });

    setForm({ name: "", email: "", message: "" });
    setLoading(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 4000);
  };

  if (!content) return null;

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* ---------------- TOP SECTION ---------------- */}
        {/* Stacks vertically on mobile, side-by-side on desktop */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT — BUSINESS INFO */}
          <div className="flex flex-col gap-4 text-gray-800">
            <h2 className="text-2xl font-bold text-blue-900">
              {content.businessName}
            </h2>

            <p className="text-gray-600">{content.description}</p>

            <div className="mt-4 flex flex-col gap-2 text-gray-700">
              <p>📍 {content.address}</p>
              <p>📞 {content.phone}</p>
              <p>✉️ {content.email}</p>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-900">
              Contact Us
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-white border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-500"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-500"
              />

              <textarea
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                className="bg-white border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-900 hover:bg-blue-800 text-white p-3 rounded font-semibold"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="text-green-600 text-sm">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ---------------- COPYRIGHT ---------------- */}
        {/* Always appears at very bottom */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          © {new Date().getFullYear()} {content.businessName}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
