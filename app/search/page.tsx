"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const [trips, setTrips] = useState<any[]>([]);
  const [budget, setBudget] = useState(100000);

  useEffect(() => {
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch(() => setTrips([]));
  }, []);

  if (!trips.length) {
    return <div className="p-6">Loading trips...</div>;
  }

  let filtered = trips.filter((t) =>
    (t.name || "").toLowerCase().includes(query) ||
    (t.location || "").toLowerCase().includes(query) ||
    (t.category || []).some((c: string) =>
      c.toLowerCase().includes(query)
    )
  );

  filtered = filtered.filter((trip) => {
    const minPrice = Math.min(...(trip.vendors || []).map((v: any) => v.price));
    return minPrice <= budget;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">

      {/* HEADER */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Results for "{query}"
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-6 pb-10">

        {/* FILTER PANEL */}
        <div className="w-full md:w-[280px] bg-white p-4 rounded-xl shadow">

          <h2 className="font-semibold mb-4">Filters</h2>

          {/* Budget */}
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Max Budget: ₹{budget}
            </p>
            <input
              type="range"
              min={10000}
              max={100000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Category */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {["Party", "Beach", "Friends"].map((c) => (
                <button
                  key={c}
                  className="px-3 py-1 border rounded-full text-sm"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RESULTS */}
        <div className="flex-1 space-y-4">

          {filtered.length === 0 && (
            <p className="text-gray-500">
              No trips found
            </p>
          )}

          {filtered.map((trip) => {
            const cheapest = Math.min(
              ...(trip.vendors || []).map((v: any) => v.price)
            );

            return (
              <Link key={trip.id} href={`/trip/${trip.id}`}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col md:flex-row overflow-hidden">

                  {/* IMAGE */}
                  <div className="relative w-full md:w-[250px] h-[180px]">
                    <Image
                      src={trip.image}
                      alt={trip.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 p-4 flex flex-col justify-between">

                    <div>
                      <h2 className="text-lg font-semibold">
                        {trip.name}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {trip.location} • {trip.duration}
                      </p>

                      {/* TAGS */}
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {(trip.category || []).map((c: string) => (
                          <span
                            key={c}
                            className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-between items-center mt-4">

                      <p className="text-sm text-gray-500">
                        Multiple vendors available
                      </p>

                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-500">
                          ₹{cheapest}
                        </p>
                        <p className="text-xs text-gray-400">
                          Starting price
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}