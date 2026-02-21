"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

/* ---------------- BLOG PREVIEW COMPONENT ---------------- */
/* Displays latest blog posts on homepage.
   Pulls limited post data from Firestore. */

interface Post {
  id: string;
  title: string;
  image?: string;
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<Post[]>([]);

  /* ---------------- FETCH RECENT POSTS ---------------- */
  /* Retrieves most recent blog entries for preview */
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "blogPosts"),
        orderBy("createdAt", "desc"),
        limit(3),
      );

      const snapshot = await getDocs(q);

      const data: Post[] = snapshot.docs.map((docSnap) => {
        const postData = docSnap.data();

        return {
          id: docSnap.id,
          title: postData.title,
          image: postData.image || "",
        };
      });

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        {/* SECTION TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-900">
          Latest From The Blog
        </h2>

        {/* POST GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <div className="h-48 w-full bg-gray-100">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={`Blog post: ${post.title}`}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image Available
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* VIEW ALL LINK */}
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
