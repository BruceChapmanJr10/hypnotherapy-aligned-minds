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

  const fetchMessages = async () => {
    const q = query(
      collection(db, "contactMessages"),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Message, "id">),
    }));

    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleReply = (email: string) => {
    const subject = "Re: Your inquiry with Aligned Minds";

    const body = "Hi,\n\nThank you for reaching out...\n\n";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    await deleteDoc(doc(db, "contactMessages", id));

    fetchMessages();
  };

  if (loading) {
    return <p className="p-10">Loading messages...</p>;
  }

  return (
    <main className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Contact Messages</h1>

      {messages.length === 0 && <p>No messages yet.</p>}

      <div className="grid gap-6">
        {messages.map((msg) => (
          <div key={msg.id} className="border p-6 rounded-xl bg-white shadow">
            <h2 className="font-semibold text-gray-800 text-lg">{msg.name}</h2>

            <p className="text-sm text-gray-600 mb-2">{msg.email}</p>

            <p className="text-gray-800 mb-4">{msg.message}</p>
            {/* REPLY */}
            <button
              onClick={() => handleReply(msg.email)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reply
            </button>

            <button
              onClick={() => handleDelete(msg.id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
