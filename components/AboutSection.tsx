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
    <section className="py-20 bg-white px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* IMAGE */}
        {content.image && (
          <div className="relative h-[320px] w-full rounded-xl overflow-hidden shadow">
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
          <h2 className="text-3xl text-gray-800 font-bold mb-4">
            {content.title}
          </h2>

          <p className="text-gray-700 leading-relaxed">{content.text}</p>
        </div>
      </div>
    </section>
  );
}
