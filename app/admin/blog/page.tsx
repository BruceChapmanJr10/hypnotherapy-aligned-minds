"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

interface Post {
  id?: string;
  title: string;
  content: string;
  image: string;
  createdAt?: any;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [form, setForm] = useState<Post>({
    title: "",
    content: "",
    image: "",
  });

  // 🔹 Fetch posts
  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "blogPosts"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Post),
    }));

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔹 Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Add post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addDoc(collection(db, "blogPosts"), {
      ...form,
      createdAt: Timestamp.now(),
    });

    setForm({
      title: "",
      content: "",
      image: "",
    });

    fetchPosts();
  };

  // 🔹 Delete
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "blogPosts", id));

    fetchPosts();
  };

  return (
    <main className="p-10 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-10">Blog Manager</h1>

      {/* ADD POST */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-16">
        <input
          name="title"
          placeholder="Post Title"
          value={form.title}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded"
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded"
        />

        <textarea
          name="content"
          placeholder="Post content..."
          value={form.content}
          onChange={handleChange}
          rows={6}
          className="bg-gray-800 p-3 rounded"
          required
        />

        <button className="bg-blue-600 py-3 rounded">Add Post</button>
      </form>

      {/* POSTS LIST */}
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 p-6 rounded-xl">
            <h2 className="font-bold">{post.title}</h2>

            <button
              onClick={() => handleDelete(post.id!)}
              className="bg-red-600 px-3 py-1 mt-3 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
