"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4 text-sm">
          <Link href="/admin">Dashboard</Link>

          <Link href="/admin/about">About Editor</Link>

          <Link href="/admin/services">Services</Link>

          <Link href="/admin/bookings">Bookings</Link>

          <Link href="/admin/availability">Availability</Link>

          <Link href="/admin/contact">Contact Inbox</Link>

          <Link href="/admin/blog">Blog Manager</Link>
        </nav>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
