"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TripCard from "@/components/TripCard";

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
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Results for "{query}"
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 px-4 md:px-6 pb-10">

        {/* FILTER */}
        <div className="w-full md:w-[280px] bg-white p-4 rounded-xl shadow">

          <h2 className="font-semibold mb-4">Filters</h2>

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
        <div className="flex-1 space-y-4 md:space-y-6 max-w-4xl">

          {filtered.length === 0 && (
            <p className="text-gray-500">No trips found</p>
          )}

          {filtered.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}

        </div>
      </div>
    </div>
  );
}