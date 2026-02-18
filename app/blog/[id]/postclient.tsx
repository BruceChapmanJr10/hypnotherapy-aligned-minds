"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PostClient() {
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
    <main className="min-h-screen py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
          {post.title}
        </h1>

        {post.image && (
          <div className="relative w-full h-[320px] md:h-[420px] mb-10 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="text-gray-700 leading-relaxed text-lg space-y-6">
          {post.content}
        </div>
      </article>
    </main>
  );
}
