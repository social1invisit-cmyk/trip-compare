"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch(() => setTrips([]));
  }, []);

  const categories = ["Party", "Dating", "Women", "Biking"];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm">📍 India</div>
        <div className="font-semibold">OLL <span className="text-orange-500">EXPLORE</span></div>
        <div className="flex gap-2">🔔 📍</div>
      </div>

      {/* HERO */}
      <div className="px-4 mt-4">
        <h1 className="text-5xl font-extrabold leading-none">FIND</h1>
        <p className="text-orange-500 text-lg mt-1">YOUR TYPE OF TRIP</p>

        <input
          placeholder="Search Destination, Trip Type or Operator"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              router.push(`/search?q=${e.currentTarget.value}`);
            }
          }}
          className="mt-4 w-full p-3 rounded-full border bg-white"
        />
      </div>

      {/* GROUP CATEGORIES */}
      <div className="px-4 mt-6">
        <div className="flex justify-between">
          <h2 className="font-semibold">Group Trip Categories</h2>
          <button className="text-sm">See all</button>
        </div>

        <div className="flex gap-3 mt-3 overflow-x-auto">
          {["Party", "Women Only", "Dating", "LGBTQ"].map((c) => (
            <div
              key={c}
              onClick={() => router.push(`/search?q=${c}`)}
              className="min-w-[80px] h-[80px] bg-white border rounded-xl flex items-center justify-center text-xs cursor-pointer"
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* BANNER */}
      <div className="px-4 mt-6">
        <div className="h-[120px] bg-pink-200 rounded-xl flex items-center justify-center">
          <p className="font-bold">NIGHT CARNIVAL</p>
        </div>
      </div>

      {/* TRIP SECTIONS */}
      {categories.map((cat) => {
        const filtered = trips.filter((t) =>
          (t.category || []).includes(cat)
        );

        return (
          <div key={cat} className="px-4 mt-6">

            <div className="flex justify-between">
              <h2 className="font-semibold">{cat} Trips</h2>
              <button
                onClick={() => router.push(`/search?q=${cat}`)}
                className="text-sm"
              >
                See all
              </button>
            </div>

            <div className="flex gap-3 mt-3 overflow-x-auto">
              {filtered.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => router.push(`/trip/${trip.id}`)}
                  className="min-w-[120px] cursor-pointer"
                >
                  <div className="relative w-[120px] h-[120px] rounded-xl overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="text-xs mt-1 text-center">{trip.name}</p>
                </div>
              ))}
            </div>

          </div>
        );
      })}
    </main>
  );
}