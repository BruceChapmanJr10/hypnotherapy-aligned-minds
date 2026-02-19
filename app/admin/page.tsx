"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome to Admin Dashboard
        </h1>

        <p className="text-gray-400 text-sm md:text-base">
          Manage your website content, bookings, and settings.
        </p>
      </div>

      {/* QUICK ACTION CARDS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {/* HERO */}
        <Link
          href="/admin/hero"
          className="
            bg-gray-900
            border border-gray-800
            p-6
            rounded-xl
            hover:border-blue-600
            transition
          "
        >
          <h2 className="font-semibold text-lg mb-2">Hero Section</h2>
          <p className="text-gray-400 text-sm">
            Edit homepage title & hero image
          </p>
        </Link>

        {/* ABOUT */}
        <Link
          href="/admin/about"
          className="
            bg-gray-900
            border border-gray-800
            p-6
            rounded-xl
            hover:border-blue-600
            transition
          "
        >
          <h2 className="font-semibold text-lg mb-2">About Section</h2>
          <p className="text-gray-400 text-sm">Update bio & about content</p>
        </Link>

        {/* SERVICES */}
        <Link
          href="/admin/services"
          className="
            bg-gray-900
            border border-gray-800
            p-6
            rounded-xl
            hover:border-blue-600
            transition
          "
        >
          <h2 className="font-semibold text-lg mb-2">Services</h2>
          <p className="text-gray-400 text-sm">Manage pricing & sessions</p>
        </Link>

        {/* BLOG */}
        <Link
          href="/admin/blog"
          className="
            bg-gray-900
            border border-gray-800
            p-6
            rounded-xl
            hover:border-blue-600
            transition
          "
        >
          <h2 className="font-semibold text-lg mb-2">Blog Manager</h2>
          <p className="text-gray-400 text-sm">Create & edit blog posts</p>
        </Link>

        {/* BOOKINGS */}
        <Link
          href="/admin/bookings"
          className="
            bg-gray-900
            border border-gray-800
            p-6
            rounded-xl
            hover:border-blue-600
            transition
          "
        >
          <h2 className="font-semibold text-lg mb-2">Bookings</h2>
          <p className="text-gray-400 text-sm">View scheduled appointments</p>
        </Link>

        {/* AVAILABILITY */}
        <Link
          href="/admin/availability"
          className="
            bg-gray-900
            border border-gray-800
            p-6
            rounded-xl
            hover:border-blue-600
            transition
          "
        >
          <h2 className="font-semibold text-lg mb-2">Availability</h2>
          <p className="text-gray-400 text-sm">Manage weekly schedule</p>
        </Link>
      </div>
    </div>
  );
}
