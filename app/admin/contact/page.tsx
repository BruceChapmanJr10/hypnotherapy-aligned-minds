"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ---------------- */
  const fetchMessages = async () => {
    const q = query(
      collection(db, "contactMessages"),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Message, "id">),
    }));

    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  /* ---------------- REPLY ---------------- */
  const handleReply = (email: string) => {
    const subject = "Re: Your inquiry with Aligned Minds";
    const body = "Hi,\n\nThank you for reaching out...\n\n";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    await deleteDoc(doc(db, "contactMessages", id));
    fetchMessages();
  };

  if (loading) {
    return <p className="p-6 md:p-10">Loading messages...</p>;
  }

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
        Contact Messages
      </h1>

      {messages.length === 0 && <p>No messages yet.</p>}

      {/* MESSAGE LIST */}
      <div className="grid gap-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="
              border
              p-5 md:p-6
              rounded-xl
              bg-white
              shadow
              flex
              flex-col
              gap-4
            "
          >
            {/* HEADER */}
            <div>
              <h2 className="font-semibold text-gray-800 text-lg">
                {msg.name}
              </h2>

              <p className="text-sm text-gray-500 break-all">{msg.email}</p>
            </div>

            {/* MESSAGE BODY */}
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {msg.message}
            </p>

            {/* ACTION BUTTONS */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                pt-2
              "
            >
              <button
                onClick={() => handleReply(msg.email)}
                className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded
                  hover:bg-blue-700
                  w-full
                  sm:w-auto
                "
              >
                Reply
              </button>

              <button
                onClick={() => handleDelete(msg.id)}
                className="
                  bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded
                  hover:bg-red-700
                  w-full
                  sm:w-auto
                "
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
