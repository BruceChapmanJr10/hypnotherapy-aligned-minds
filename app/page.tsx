import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/FooterSection";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/* ---------------- FETCH HOMEPAGE SEO ---------------- */
/* Retrieves centralized SEO metadata for homepage */
async function getSEO() {
  const ref = doc(db, "content", "seo");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  return {};
}

/* ---------------- DYNAMIC METADATA ---------------- */
/* Injects homepage SEO into search engines and social platforms */
export async function generateMetadata() {
  const seo = await getSEO();

  const title =
    seo.homeTitle ||
    "Aligned Minds Hypnotherapy | Anxiety & Mindset Transformation";

  const description =
    seo.homeDescription ||
    "Professional hypnotherapy sessions designed to reduce anxiety, improve mindset, and help you overcome limiting beliefs. Serving clients seeking emotional balance and personal transformation.";

  return {
    title,
    description,

    /* OpenGraph (Facebook, LinkedIn, iMessage) */
    openGraph: {
      title,
      description,
      url: "https://alignedminds.com",
      siteName: "Aligned Minds Hypnotherapy",
      type: "website",
    },

    /* Twitter / X preview */
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ---------------- HOMEPAGE RENDER ---------------- */
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
