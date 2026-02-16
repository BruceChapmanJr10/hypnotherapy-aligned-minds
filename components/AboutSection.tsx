"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AboutSection() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "content", "about");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setContent(snap.data());
      }
    };

    fetchData();
  }, []);

  if (!content) return null;

  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        {content.image && (
          <div className="relative h-[360px] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <Image
              src={content.image}
              alt="About"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* TEXT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">
            {content.title}
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            {content.text}
          </p>
        </div>
      </div>
    </section>
  );
}
