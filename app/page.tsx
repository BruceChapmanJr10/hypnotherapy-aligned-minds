import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/FooterSection";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/* ---------------- SEO ---------------- */
export async function generateMetadata() {
  const ref = doc(db, "content", "seo");
  const snap = await getDoc(ref);

  const seo = snap.exists() ? snap.data() : null;

  return {
    title: seo?.homeTitle || "Aligned Minds | Hypnotherapy",
    description:
      seo?.homeDescription ||
      "Professional hypnotherapy sessions designed to help you overcome stress, anxiety, and limiting beliefs.",
  };
}

/* ---------------- PAGE ---------------- */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <BlogPreview />
      <Footer />
    </main>
  );
}
