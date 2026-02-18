import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/FooterSection";

export const metadata = {
  title: "Aligned Minds | Home",
  description:
    "Book hypnotherapy sessions designed to help you overcome stress, anxiety, and limiting beliefs.",
};

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
