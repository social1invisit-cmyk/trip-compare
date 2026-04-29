"use client";

import Image from "next/image";
import Link from "next/link";
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

  const categories = ["Party", "Beach"];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-sm">📍 India</div>

        <div className="font-bold text-lg">
          TRIP<span className="text-orange-500">COMPARE</span>
        </div>

        <div>🔔</div>
      </div>

      {/* HERO */}
      <div className="px-6 mt-6">
        <h1 className="text-6xl font-extrabold">FIND</h1>

        <p className="text-orange-500 text-2xl mt-2">
          YOUR TYPE OF TRIP
        </p>

        <input
          placeholder="Search destination or category..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              router.push(`/search?q=${encodeURIComponent(e.currentTarget.value)}`);
            }
          }}
          className="mt-6 w-full p-4 rounded-full border"
        />
      </div>

      {/* CATEGORY CHIPS */}
      <div className="px-6 mt-6 flex gap-2">
        {["Women", "LGBTQ", "Corporate", "Friends"].map((c) => (
          <button
            key={c}
            onClick={() => router.push(`/search?q=${c}`)}
            className="px-4 py-2 bg-white border rounded-full"
          >
            {c}
          </button>
        ))}
      </div>

      {/* SECTIONS */}
      {categories.map((cat) => {
        const filtered = trips.filter((t) =>
          (t.category || []).includes(cat)
        );

        return (
          <div key={cat} className="px-6 mt-10">

            <div className="flex justify-between">
              <h2 className="font-semibold">{cat} Trips</h2>

              <button
                onClick={() => router.push(`/search?q=${cat}`)}
                className="text-orange-500"
              >
                See all →
              </button>
            </div>

            <div className="flex gap-4 mt-4 overflow-x-auto">
              {filtered.map((trip) => (
                <Link key={trip.id} href={`/trip/${trip.id}`}>
                  <div className="relative w-[160px] h-[200px] rounded-xl overflow-hidden">

                    <Image
                      src={trip.image}
                      alt={trip.name}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />

                    <div className="absolute bottom-2 left-2 text-white text-sm">
                      {trip.name}
                    </div>

                  </div>
                </Link>
              ))}
            </div>

          </div>
        );
      })}
    </main>
  );
}