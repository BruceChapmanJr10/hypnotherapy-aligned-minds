"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function BlogPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const ref = doc(db, "blogPosts", id as string);

      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPost(snap.data());
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return null;

  return (
    <main className="p-10 max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {post.image && <img src={post.image} className="rounded mb-6" />}

      <p className="leading-relaxed text-gray-300">{post.content}</p>
    </main>
  );
}
