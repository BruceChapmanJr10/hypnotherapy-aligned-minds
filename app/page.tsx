"use client";

import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import HeroSection from "@/components/HeroSection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/FooterSection";

export default function HomePage() {
  return (
    <main>
      {/* HERO — CMS CONTROLLED */}
      <HeroSection />

      {/* SERVICES */}
      <ServicesSection />

      {/* ABOUT — CMS CONTROLLED */}
      <AboutSection />

      {/* BLOG PREVIEW */}
      <BlogPreview />

      {/* FOOTER — CMS CONTROLLED */}
      <Footer />
    </main>
  );
}
