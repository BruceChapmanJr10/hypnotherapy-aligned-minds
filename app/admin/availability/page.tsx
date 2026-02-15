"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function AdminAvailabilityPage() {
  const [availability, setAvailability] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch schedule
  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "availability", "schedule");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setAvailability(snap.data());
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // 🔹 Add time
  const addTime = (day: string) => {
    const time = prompt("Enter time (ex: 9:00 AM)");

    if (!time) return;

    setAvailability((prev: any) => ({
      ...prev,
      [day]: [...(prev[day] || []), time],
    }));
  };

  // 🔹 Remove time
  const removeTime = (day: string, index: number) => {
    const updated = [...availability[day]];
    updated.splice(index, 1);

    setAvailability((prev: any) => ({
      ...prev,
      [day]: updated,
    }));
  };

  // 🔹 Save to Firestore
  const saveAvailability = async () => {
    const ref = doc(db, "availability", "schedule");

    await updateDoc(ref, availability);

    alert("Availability updated!");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Manage Availability</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {days.map((day) => (
          <div key={day} className="border rounded-xl p-6 bg-white shadow">
            <h2 className="font-semibold text-lg capitalize mb-4">{day}</h2>

            {/* TIME LIST */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(availability[day] || []).map((time: string, index: number) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center gap-2"
                >
                  {time}

                  <button
                    onClick={() => removeTime(day, index)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ADD BUTTON */}
            <button
              onClick={() => addTime(day)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Time
            </button>
          </div>
        ))}
      </div>

      {/* SAVE */}
      <button
        onClick={saveAvailability}
        className="mt-10 bg-green-600 text-white px-6 py-3 rounded"
      >
        Save Changes
      </button>
    </main>
  );
}
