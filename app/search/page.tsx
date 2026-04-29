"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { trips } from "@/data/trips";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [budget, setBudget] = useState(100000);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("cheap");

  let filteredTrips = trips.filter((trip) =>
    trip.name.toLowerCase().includes(query)
  );

  // category filter
  if (category !== "All") {
    filteredTrips = filteredTrips.filter((trip) =>
      trip.category.includes(category)
    );
  }

  // budget filter
  filteredTrips = filteredTrips.filter((trip) => {
    const cheapest = Math.min(...trip.vendors.map((v) => v.price));
    return cheapest <= budget;
  });

  // sorting
  filteredTrips.sort((a, b) => {
    const priceA = Math.min(...a.vendors.map((v) => v.price));
    const priceB = Math.min(...b.vendors.map((v) => v.price));

    if (sort === "cheap") return priceA - priceB;
    if (sort === "expensive") return priceB - priceA;
    return 0;
  });

  return (
    <div className="p-6 bg-white min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        Results for "{query}"
      </h1>

      {/* FILTERS */}
      <div className="mb-6 space-y-4">

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
        <div className="flex gap-2">
          {["All", "Party", "Beach"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-sm ${
                category === c
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          {["cheap", "expensive"].map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-1 rounded ${
                sort === s
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

      </div>

      {/* RESULTS */}
      <div className="flex flex-col gap-4">
        {filteredTrips.map((trip) => {
          const cheapest = trip.vendors.reduce((min, v) =>
            v.price < min.price ? v : min
          );

          return (
            <Link key={trip.id} href={`/trip/${trip.id}`}>
              <div className="flex items-center gap-4 p-4 border rounded-xl hover:shadow">

                <img
                  src={trip.image}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{trip.name}</h2>
                  <p className="text-sm text-gray-500">
                    {trip.duration}
                  </p>
                </div>

                <div className="text-orange-500 font-bold">
                  ₹{cheapest.price}
                </div>

              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}