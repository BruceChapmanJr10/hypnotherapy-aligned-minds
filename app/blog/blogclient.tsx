"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

/* ---------------- BLOG POST TYPE ---------------- */
/* Represents summary data for blog listing */
interface Post {
  id: string;
  title: string;
  image: string;
}

export default function BlogClient() {
  const [posts, setPosts] = useState<Post[]>([]);

  /* ---------------- FETCH BLOG POSTS ---------------- */
  /* Retrieves blog post summaries for listing page */
  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "blogPosts"));

      const data: Post[] = snapshot.docs.map((docSnap) => {
        const postData = docSnap.data() as Omit<Post, "id">;

        return {
          id: docSnap.id,
          ...postData,
        };
      });

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-4">
          Wellness Blog
        </h1>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-14">
          Insights, guidance, and hypnotherapy techniques to support your mental
          clarity and emotional well-being.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100"
            >
              {post.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-5">
                <h2 className="font-semibold text-lg text-blue-900 leading-snug">
                  {post.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
