import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Sofia } from "next/font/google";

const sofia = Sofia({
  subsets: ["latin"],
  weight: ["400"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aligned Minds Hypnotherapy",
  description:
    "Professional hypnotherapy services focused on mental clarity, stress relief, and personal transformation.",

  keywords: [
    "Hypnotherapy",
    "Hypnosis",
    "Mental wellness",
    "Stress relief",
    "Aligned Minds",
  ],

  openGraph: {
    title: "Aligned Minds Hypnotherapy",
    description:
      "Transform your mindset with professional hypnotherapy sessions.",
    url: "https://alignedminds.com",
    siteName: "Aligned Minds",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
