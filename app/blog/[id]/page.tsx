import PostClient from "./postclient";

/* ---------------- SEO ---------------- */
export async function generateMetadata({ params }: any) {
  // Safety guard — prevents crash during build
  if (!params?.id) {
    return {
      title: "Hypnotherapy Article | Aligned Minds",
      description: "Read hypnotherapy insights and mental wellness guidance.",
    };
  }

  return {
    title: "Hypnotherapy Article | Aligned Minds",
    description: "Read hypnotherapy insights and mental wellness guidance.",
  };
}

/* ---------------- PAGE ---------------- */
export default function BlogPostPage() {
  return <PostClient />;
}
