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

  /* ---------------- FETCH ---------------- */
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto text-white">
      {/* PAGE TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        Blog Manager
      </h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col gap-4
          bg-gray-900
          p-5 md:p-6
          rounded-2xl
          border border-gray-800
          mb-12
        "
      >
        {/* TITLE */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Post Title</label>

          <input
            name="title"
            placeholder="Post Title"
            value={form.title}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
            required
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Image URL</label>

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Post Content
          </label>

          <textarea
            name="content"
            placeholder="Post content..."
            value={form.content}
            onChange={handleChange}
            rows={6}
            className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
            required
          />
        </div>

        {/* ================= SEO ================= */}
        <div className="border border-gray-700 rounded-xl p-4 mt-2">
          <h2 className="font-semibold mb-4 text-lg text-blue-400">
            SEO Settings
          </h2>

          {/* SEO TITLE */}
          <div className="mb-3">
            <label className="block text-sm mb-1 text-gray-300">
              SEO Title
            </label>

            <input
              name="seoTitle"
              placeholder="How Hypnotherapy Helps Anxiety | Aligned Minds"
              value={form.seoTitle}
              onChange={handleChange}
              className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
            />
          </div>

          {/* SEO DESCRIPTION */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              SEO Meta Description
            </label>

            <textarea
              name="seoDescription"
              placeholder="Discover how hypnotherapy can reduce anxiety and stress naturally."
              value={form.seoDescription}
              onChange={handleChange}
              rows={3}
              className="bg-gray-800 p-3 rounded w-full text-sm md:text-base"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            transition
            py-3
            rounded-lg
            font-semibold
            mt-2
          "
        >
          {editingId ? "Update Post" : "Add Post"}
        </button>
      </form>

      {/* ================= POSTS LIST ================= */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="
              bg-gray-900
              p-5
              rounded-2xl
              border border-gray-800
              flex flex-col
              justify-between
            "
          >
            <div>
              <h2 className="font-bold text-lg mb-2">{post.title}</h2>

              {post.seoTitle && (
                <p className="text-xs text-gray-400">SEO: {post.seoTitle}</p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(post)}
                className="
                  flex-1
                  bg-yellow-500
                  hover:bg-yellow-600
                  px-3 py-2
                  rounded
                  text-sm
                  font-semibold
                "
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(post.id!)}
                className="
                  flex-1
                  bg-red-600
                  hover:bg-red-700
                  px-3 py-2
                  rounded
                  text-sm
                  font-semibold
                "
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
