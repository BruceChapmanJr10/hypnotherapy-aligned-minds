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

  const isLoginPage = pathname === "/admin/login";

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

  //  Login page has no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        <div>
          <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

          <nav className="flex flex-col gap-4 text-sm">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/hero">Hero Editor</Link>
            <Link href="/admin/about">About Editor</Link>
            <Link href="/admin/services">Services Editor</Link>
            <Link href="/admin/blog">Blog Manager</Link>
            <Link href="/admin/footer">Footer Editor</Link>
            <Link href="/admin/bookings">Bookings</Link>
            <Link href="/admin/availability">Availability</Link>
            <Link href="/admin/contact">Contact Inbox</Link>
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded text-sm"
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
