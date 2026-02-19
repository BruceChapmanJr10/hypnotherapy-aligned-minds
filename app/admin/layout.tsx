"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !isLoginPage) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  if (loading && !isLoginPage) {
    return (
      <div className="p-10 text-center text-white bg-gray-950 min-h-screen">
        Checking authentication...
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  /* ---------------- NAV LINK STYLE ---------------- */
  const linkStyle = (path: string) =>
    `p-2 rounded transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-800 text-gray-300"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 py-4">
        <h2 className="font-bold text-lg">Admin Panel</h2>

        <button onClick={() => setMenuOpen(true)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* ================= OVERLAY ================= */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-full
          w-64
          bg-gray-900
          border-r border-gray-800
          p-6
          flex flex-col
          z-50
          transform transition-transform duration-300

          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* MOBILE CLOSE */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Menu</h2>

          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        {/* NAV */}
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-8 hidden md:block">
            Admin Panel
          </h2>

          <nav className="flex flex-col gap-2 text-sm">
            <Link
              href="/admin"
              className={linkStyle("/admin")}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              href="/admin/seo"
              className={linkStyle("/admin/seo")}
              onClick={() => setMenuOpen(false)}
            >
              SEO Manager
            </Link>

            <Link
              href="/admin/hero"
              className={linkStyle("/admin/hero")}
              onClick={() => setMenuOpen(false)}
            >
              Hero Editor
            </Link>

            <Link
              href="/admin/about"
              className={linkStyle("/admin/about")}
              onClick={() => setMenuOpen(false)}
            >
              About Editor
            </Link>

            <Link
              href="/admin/services"
              className={linkStyle("/admin/services")}
              onClick={() => setMenuOpen(false)}
            >
              Services Editor
            </Link>

            <Link
              href="/admin/blog"
              className={linkStyle("/admin/blog")}
              onClick={() => setMenuOpen(false)}
            >
              Blog Manager
            </Link>

            <Link
              href="/admin/footer"
              className={linkStyle("/admin/footer")}
              onClick={() => setMenuOpen(false)}
            >
              Footer Editor
            </Link>

            <Link
              href="/admin/bookings"
              className={linkStyle("/admin/bookings")}
              onClick={() => setMenuOpen(false)}
            >
              Bookings
            </Link>

            <Link
              href="/admin/availability"
              className={linkStyle("/admin/availability")}
              onClick={() => setMenuOpen(false)}
            >
              Availability
            </Link>

            <Link
              href="/admin/contact"
              className={linkStyle("/admin/contact")}
              onClick={() => setMenuOpen(false)}
            >
              Contact Inbox
            </Link>
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 p-2 rounded text-sm"
        >
          Logout
        </button>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10">{children}</main>
    </div>
  );
}
