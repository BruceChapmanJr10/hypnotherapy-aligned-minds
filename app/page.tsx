"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import HeroSection from "@/components/HeroSection";
import BlogPreview from "@/components/BlogPreview";

interface HomepageContent {
  title: string;
  heroImage: string;
  aboutTitle: string;
  aboutText: string;
}

export default function HomePage() {
  const [content, setContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const docRef = doc(db, "homepage", "main");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data() as HomepageContent);
      }
    };

    fetchContent();
  }, []);

  if (!content) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <main>
      <HeroSection title={content.title} heroImage={content.heroImage} />

      <ServicesSection />

      <AboutSection title={content.aboutTitle} text={content.aboutText} />

      <BlogPreview />
    </main>
  );
}
