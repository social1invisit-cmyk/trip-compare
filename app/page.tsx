"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trips } from "@/data/trips";

export default function Home() {
  const router = useRouter();

  const categories = ["Party", "Beach"];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-sm">📍 India</div>

        <div className="font-bold text-lg">
          TRIP<span className="text-orange-500">COMPARE</span>
        </div>

        <div className="flex gap-4 text-xl">
          🔔 📍
        </div>
      </div>

      {/* HERO */}
      <div className="px-6 mt-6">
        <h1 className="text-6xl font-extrabold leading-none">FIND</h1>

        <p className="text-orange-500 text-2xl font-semibold mt-2">
          YOUR TYPE OF TRIP
        </p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search Destination or Category..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/search?q=${e.currentTarget.value}`);
              }
            }}
            className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* CATEGORY PILLS */}
      <div className="px-6 mt-6 flex gap-2 overflow-x-auto">
        {["Women", "LGBTQ", "Corporate", "Friends"].map((cat) => (
          <button
            key={cat}
            onClick={() => router.push(`/search?q=${cat}`)}
            className="px-4 py-2 bg-white border rounded-full text-sm shadow"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CATEGORY SECTIONS */}
      {categories.map((cat) => {
        const filtered = trips.filter((trip) =>
          trip.category.includes(cat)
        );

        return (
          <div key={cat} className="px-6 mt-10">

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                {cat.toUpperCase()} TRIPS
              </h2>

              <button
                onClick={() => router.push(`/search?q=${cat}`)}
                className="text-orange-500 text-sm"
              >
                See all →
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {filtered.map((trip) => (
                <Link key={trip.id} href={`/trip/${trip.id}`}>
                  <div className="relative min-w-[160px] h-[200px] rounded-xl overflow-hidden shadow">

                    <Image
                      src={trip.image}
                      alt={trip.name}
                      fill
                      priority
                      sizes="(max-width:768px) 100vw, 200px"
                      className="object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm p-2">
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