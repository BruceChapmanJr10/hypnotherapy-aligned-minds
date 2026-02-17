"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  image: string;
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<Post[]>([]);

  // 🔹 Fetch latest posts
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "blogPosts"),
        orderBy("createdAt", "desc"),
        limit(3),
      );

      const snapshot = await getDocs(q);

      const data: Post[] = snapshot.docs.map((doc) => {
        const postData = doc.data() as Omit<Post, "id">;

        return {
          ...postData,
          id: doc.id,
        };
      });

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-900">
          Latest From The Blog
        </h2>

        {/* POSTS GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              )}

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
