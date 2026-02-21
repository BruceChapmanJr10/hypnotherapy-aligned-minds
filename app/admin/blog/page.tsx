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
import { CldUploadWidget } from "next-cloudinary";

/* ---------------- BLOG POST TYPE ---------------- */
/* Each post maintains its own SEO metadata */
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

  /* ---------------- FORM STATE ---------------- */
  /* Includes per-post SEO fields */
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

    const data = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Post),
    }));

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ---------------- FORM INPUT HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = (url: string) => {
    setForm({
      ...form,
      image: url,
    });
  };

  /* ---------------- ADD / UPDATE POST ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, ...postData } = form;

    if (editingId) {
      /* Update existing post */
      await updateDoc(doc(db, "blogPosts", editingId), {
        ...postData,
      });

      alert("Post updated!");
      setEditingId(null);
    } else {
      /* Create new post */
      await addDoc(collection(db, "blogPosts"), {
        ...postData,
        createdAt: Timestamp.now(),
      });

      alert("Post added!");
    }

    /* Reset form */
    setForm({
      title: "",
      content: "",
      image: "",
      seoTitle: "",
      seoDescription: "",
    });

    fetchPosts();
  };

  /* ---------------- DELETE POST ---------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    await deleteDoc(doc(db, "blogPosts", id));
    fetchPosts();
  };

  /* ---------------- EDIT POST ---------------- */
  const handleEdit = (post: Post) => {
    setForm(post);
    setEditingId(post.id || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        Blog Manager
      </h1>

      {/* ================= CREATE / EDIT FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-5 md:p-6 rounded-2xl border border-gray-800 mb-12"
      >
        {/* POST TITLE */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Post Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full"
            required
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-sm mb-2 text-gray-300">Blog Image</label>

          <CldUploadWidget
            uploadPreset="aligned_minds_unsigned"
            onSuccess={(result: any) => {
              handleImageUpload(result.info.secure_url);
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="bg-purple-600 hover:bg-purple-700 transition py-3 rounded-lg w-full"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg mt-3 border border-gray-700"
            />
          )}
        </div>

        {/* POST CONTENT */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Post Content
          </label>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={6}
            className="bg-gray-800 p-3 rounded w-full"
            required
          />
        </div>

        {/* PER-POST SEO */}
        <div className="border border-gray-700 rounded-xl p-4 mt-2">
          <h2 className="font-semibold mb-4 text-lg text-blue-400">
            SEO Settings (Per Post)
          </h2>

          <input
            name="seoTitle"
            placeholder="SEO Title"
            value={form.seoTitle}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded w-full mb-3"
          />

          <textarea
            name="seoDescription"
            placeholder="SEO Meta Description"
            value={form.seoDescription}
            onChange={handleChange}
            rows={3}
            className="bg-gray-800 p-3 rounded w-full"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg">
          {editingId ? "Update Post" : "Add Post"}
        </button>
      </form>

      {/* ================= POST LIST ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-900 p-5 rounded-2xl border border-gray-800"
          >
            <h2 className="font-bold">{post.title}</h2>

            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="h-32 w-full object-cover rounded mt-3"
              />
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(post)}
                className="flex-1 bg-yellow-500 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(post.id!)}
                className="flex-1 bg-red-600 py-2 rounded"
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
