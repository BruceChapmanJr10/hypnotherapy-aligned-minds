"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);

      router.push("/admin");
    } catch (err: any) {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 border border-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
          className="bg-gray-950 border border-gray-700 p-3 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="bg-gray-950 border border-gray-700 p-3 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
        />

        {/* ERROR */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-900 hover:bg-blue-800 transition text-white p-3 rounded font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
