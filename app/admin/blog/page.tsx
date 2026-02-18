"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

interface Post {
  id?: string;
  title: string;
  content: string;
  image: string;

  // 🔥 NEW SEO FIELDS
  seoTitle: string;
  seoDescription: string;

  createdAt?: any;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Post>({
    title: "",
    content: "",
    image: "",
    seoTitle: "",
    seoDescription: "",
  });

  /* ---------------- FETCH POSTS ---------------- */
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

  /* ---------------- INPUT ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- ADD / UPDATE ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, ...postData } = form;

    if (editingId) {
      await updateDoc(doc(db, "blogPosts", editingId), postData);
      alert("Post updated!");
      setEditingId(null);
    } else {
      await addDoc(collection(db, "blogPosts"), {
        ...postData,
        createdAt: Timestamp.now(),
      });

      alert("Post added!");
    }

    setForm({
      title: "",
      content: "",
      image: "",
      seoTitle: "",
      seoDescription: "",
    });

    fetchPosts();
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    await deleteDoc(doc(db, "blogPosts", id));
    fetchPosts();
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (post: Post) => {
    setForm(post);
    setEditingId(post.id || null);
  };

  return (
    <main className="p-10 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-10">Blog Manager</h1>

      {/* ---------------- FORM ---------------- */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-16">
        {/* TITLE */}
        <div>
          <label className="block text-sm mb-1">Post Title</label>
          <input
            name="title"
            placeholder="Post Title"
            value={form.title}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full"
            required
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm mb-1">Image URL</label>
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm mb-1">Post Content</label>
          <textarea
            name="content"
            placeholder="Post content..."
            value={form.content}
            onChange={handleChange}
            rows={6}
            className="bg-gray-800 p-3 rounded w-full"
            required
          />
        </div>

        {/* ---------------- SEO SECTION ---------------- */}
        <div className="border border-gray-700 rounded-lg p-4 mt-4">
          <h2 className="font-semibold mb-4 text-lg text-blue-400">
            SEO Settings
          </h2>

          {/* SEO TITLE */}
          <div className="mb-3">
            <label className="block text-sm mb-1">SEO Title</label>
            <input
              name="seoTitle"
              placeholder="How Hypnotherapy Helps Anxiety | Aligned Minds"
              value={form.seoTitle}
              onChange={handleChange}
              className="bg-gray-800 p-3 rounded w-full"
            />
          </div>

          {/* SEO DESCRIPTION */}
          <div>
            <label className="block text-sm mb-1">SEO Meta Description</label>
            <textarea
              name="seoDescription"
              placeholder="Discover how hypnotherapy can reduce anxiety and stress naturally."
              value={form.seoDescription}
              onChange={handleChange}
              rows={3}
              className="bg-gray-800 p-3 rounded w-full"
            />
          </div>
        </div>

        <button className="bg-blue-600 py-3 rounded">
          {editingId ? "Update Post" : "Add Post"}
        </button>
      </form>

      {/* ---------------- POSTS LIST ---------------- */}
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 p-6 rounded-xl">
            <h2 className="font-bold">{post.title}</h2>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(post)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(post.id!)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
