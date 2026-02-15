"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-950 text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO / BRAND */}
        <Link href="/" className="text-xl font-bold">
          Aligned Minds
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/">Home</Link>

          <Link href="/services">Services</Link>

          <Link href="/blog">Blog</Link>

          <Link href="/contact">Contact</Link>

          <Link
            href="/#booking"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Book
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </header>
  );
}
