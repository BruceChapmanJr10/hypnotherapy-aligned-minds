"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";

/* ---------------- FOOTER COMPONENT ---------------- */
/* Displays CMS-managed business info and
   includes a lightweight contact form. */

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
  /* Retrieves business contact information from CMS */
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

  /* ---------------- SUBMIT CONTACT FORM ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...form,
        createdAt: Timestamp.now(),
      });

      setForm({ name: "", email: "", message: "" });
      setSuccess(true);

      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Footer form error:", error);
    }

    setLoading(false);
  };

  if (!content) return null;

  return (
    <footer className="bg-gray-100 border-t border-gray-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* ---------------- BUSINESS INFO ---------------- */}
        <div className="flex flex-col gap-4 text-gray-800">
          <h2 className="text-2xl font-bold text-blue-900">
            {content.businessName}
          </h2>

          <p className="text-gray-600">{content.description}</p>

          {/* NAP (Name, Address, Phone) consistency for local SEO */}
          <address className="not-italic mt-6 flex flex-col gap-2 text-gray-700">
            <p>📍 {content.address}</p>
            <p>📞 {content.phone}</p>
            <p>✉️ {content.email}</p>
          </address>

          <p className="text-sm text-gray-500 mt-8">
            © {new Date().getFullYear()} {content.businessName}. All rights
            reserved.
          </p>
        </div>

        {/* ---------------- CONTACT FORM ---------------- */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Contact Us</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              aria-label="Full Name"
              className="bg-white border border-gray-300 p-3 rounded text-gray-900"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              aria-label="Email Address"
              className="bg-white border border-gray-300 p-3 rounded text-gray-900"
            />

            <textarea
              name="message"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
              aria-label="Message"
              className="bg-white border border-gray-300 p-3 rounded text-gray-900"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 hover:bg-blue-800 transition text-white p-3 rounded font-semibold"
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
    </footer>
  );
}
