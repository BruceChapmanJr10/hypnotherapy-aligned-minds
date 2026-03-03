import Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/* ---------------- CREATE CHECKOUT SESSION ---------------- */
/* Creates Stripe session using Firestore service pricing */

export async function POST(req: Request) {
  try {
    const { bookingId, serviceId } = await req.json();

    if (!bookingId || !serviceId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    /* ---------------- ENV CHECK ---------------- */
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Missing STRIPE_SECRET_KEY");
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 },
      );
    }

    /* ---------------- INIT STRIPE SAFELY ---------------- */
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    /* ---------------- FETCH SERVICE ---------------- */
    const serviceRef = doc(db, "services", serviceId);
    const serviceSnap = await getDoc(serviceRef);

    if (!serviceSnap.exists()) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const service = serviceSnap.data();

    /* Convert "$120" → 12000 cents */
    const amount =
      Math.round(parseFloat(service.price.replace(/[^0-9.]/g, ""))) * 100;

    /* ---------------- CREATE SESSION ---------------- */
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: service.title,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?bookingId=${bookingId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: {
        bookingId,
        serviceId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
