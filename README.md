# 🧠 Aligned Minds – Full-Stack Website & Custom CMS

A production-ready full-stack web application built using **Next.js, Firebase, and Cloudinary**.

This project showcases building a custom content management system (CMS), admin dashboard, booking workflow, SEO controls, and real-time database integration.

---

## 🚀 Overview

Aligned Minds is a business website + internal CMS that allows non-technical users to manage website content dynamically without code changes.

Content updates instantly via Firestore, eliminating the need for redeployment.

---

## 🛠 Tech Stack

### Frontend

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Responsive Mobile-First Design

### Backend / Database

- Firebase Firestore
- Firebase Authentication
- Secure Admin Route Protection

### Media & Integrations

- Cloudinary Image Uploads
- Stripe-Ready Deposit Payments
- Dynamic SEO Metadata

---

## 🔐 Admin CMS Features

Custom-built admin dashboard includes:

- Auth-protected admin routes
- Mobile slide-out navigation
- Hero section editor
- About section editor
- Services manager (CRUD + SEO)
- Blog manager (CRUD + SEO + images)
- Availability scheduler
- Booking dashboard
- Contact inbox
- Footer content editor
- Global SEO manager with Google preview

All content is stored in Firestore and rendered dynamically across the site.

---

## 📅 Booking System

Features include:

- Timed session booking (30–120 minutes)
- Availability slot selection
- Firestore booking storage
- Deposit tracking
- Admin booking management dashboard

---

## 📈 SEO System

- Page-level metadata
- Blog post SEO fields
- Service SEO fields
- Global SEO settings
- Google search preview inside admin panel

---

## 📸 Image Management

Images are uploaded via **Cloudinary unsigned uploads** and stored as URLs in Firestore.

Used for:

- Blog featured images
- Service images
- Hero section
- About section

---

## 💡 Engineering Highlights

- Built a custom CMS instead of using third-party platforms
- Firebase Auth route protection
- Real-time Firestore reads/writes
- Dynamic SEO rendering
- Mobile-responsive admin panel
- Cloud image hosting integration
- Scalable content architecture

---

## 🧪 Local Development

Clone repo:

```bash
git clone https://github.com/BruceChapmanJr10/aligned-minds.git
cd aligned-minds
npm install
npm run dev


Create .env.local:

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```
