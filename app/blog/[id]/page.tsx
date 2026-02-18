import PostClient from "./postclient";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/* ---------------- SEO ---------------- */
export async function generateMetadata({ params }: any) {
  const ref = doc(db, "blogPosts", params.id);
  const snap = await getDoc(ref);

  const post = snap.exists() ? snap.data() : null;

  return {
    title:
      post?.seoTitle || post?.title || "Hypnotherapy Article | Aligned Minds",

    description:
      post?.seoDescription ||
      "Read hypnotherapy insights and mental wellness guidance from Aligned Minds.",
  };
}

/* ---------------- PAGE ---------------- */
export default function BlogPostPage() {
  return <PostClient />;
}
