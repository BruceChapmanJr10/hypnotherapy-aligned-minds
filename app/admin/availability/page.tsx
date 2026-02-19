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

  /* ---------------- FETCH ---------------- */
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

  /* ---------------- ADD TIME ---------------- */
  const addTime = (day: string) => {
    const time = prompt("Enter time (ex: 9:00 AM)");

    if (!time) return;

    setAvailability((prev: any) => ({
      ...prev,
      [day]: [...(prev[day] || []), time],
    }));
  };

  /* ---------------- REMOVE TIME ---------------- */
  const removeTime = (day: string, index: number) => {
    const updated = [...availability[day]];
    updated.splice(index, 1);

    setAvailability((prev: any) => ({
      ...prev,
      [day]: updated,
    }));
  };

  /* ---------------- SAVE ---------------- */
  const saveAvailability = async () => {
    const ref = doc(db, "availability", "schedule");
    await updateDoc(ref, availability);

    alert("Availability updated!");
  };

  if (loading) return <p className="p-6 md:p-10">Loading...</p>;

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto text-white">
      {/* PAGE TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-blue-400">
        Manage Availability
      </h1>

      {/* ================= DAYS GRID ================= */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6 md:gap-8
        "
      >
        {days.map((day) => (
          <div
            key={day}
            className="
              bg-gray-900
              border border-gray-800
              rounded-2xl
              p-5 md:p-6
              shadow
              flex flex-col
            "
          >
            {/* DAY HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold capitalize text-blue-400">
                {day}
              </h2>

              <span className="text-xs text-gray-400">
                {(availability[day] || []).length} slots
              </span>
            </div>

            {/* TIME SLOTS */}
            <div className="flex flex-wrap gap-2 mb-5">
              {(availability[day] || []).map((time: string, index: number) => (
                <div
                  key={index}
                  className="
                      bg-blue-600/20
                      text-blue-300
                      px-3 py-1
                      rounded-lg
                      flex items-center gap-2
                      text-xs md:text-sm
                    "
                >
                  {time}

                  <button
                    onClick={() => removeTime(day, index)}
                    className="text-red-400 hover:text-red-300 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ADD BUTTON */}
            <button
              onClick={() => addTime(day)}
              className="
                mt-auto
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-2.5
                rounded-lg
                transition
                text-sm
                font-semibold
              "
            >
              + Add Time
            </button>
          </div>
        ))}
      </div>

      {/* ================= SAVE BUTTON ================= */}
      <div className="mt-10 md:mt-14 text-center">
        <button
          onClick={saveAvailability}
          className="
            w-full sm:w-auto
            bg-green-600
            hover:bg-green-700
            text-white
            px-8
            py-3
            rounded-lg
            font-semibold
            shadow
            transition
          "
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}
