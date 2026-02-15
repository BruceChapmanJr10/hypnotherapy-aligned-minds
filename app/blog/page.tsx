"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  image: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "blogPosts"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Post),
      }));

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <main className="p-10 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-10">Blog</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="bg-gray-900 p-4 rounded-xl"
          >
            {post.image && <img src={post.image} className="rounded mb-3" />}

            <h2 className="font-semibold">{post.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
