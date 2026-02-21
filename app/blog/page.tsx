import BlogClient from "./blogclient";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/* ---------------- FETCH BLOG SEO ---------------- */
/* Retrieves centralized SEO metadata for blog listing page */
async function getSEO() {
  const ref = doc(db, "content", "seo");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  return {};
}

/* ---------------- DYNAMIC METADATA ---------------- */
/* Injects SEO into page head for Google + social sharing */
export async function generateMetadata() {
  const seo = await getSEO();

  const title = seo.blogTitle || "Hypnotherapy Blog | Aligned Minds";

  const description =
    seo.blogDescription ||
    "Explore hypnotherapy insights, mental wellness strategies, and transformational techniques designed to support emotional balance and personal growth.";

  return {
    title,
    description,

    /* OpenGraph (Facebook, LinkedIn, iMessage) */
    openGraph: {
      title,
      description,
      url: "https://alignedminds.com/blog",
      siteName: "Aligned Minds Hypnotherapy",
      type: "website",
    },

    /* Twitter Preview */
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ---------------- PAGE RENDER ---------------- */
export default function BlogPage() {
  return <BlogClient />;
}
