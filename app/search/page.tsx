"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [trips, setTrips] = useState<any[]>([]);
  const [budget, setBudget] = useState(100000);

  useEffect(() => {
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  let filtered = trips.filter(
    (t) =>
      t.name.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query) ||
      t.category.some((c: string) =>
        c.toLowerCase().includes(query)
      )
  );

  return (
    <div className="p-6 bg-white min-h-screen">

      <h1 className="text-xl font-bold mb-4">
        Results for "{query}"
      </h1>

      {/* BUDGET */}
      <input
        type="range"
        min={10000}
        max={100000}
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="w-full mb-6"
      />

      {/* RESULTS */}
      <div className="space-y-4">
        {filtered.map((trip) => (
          <Link key={trip.id} href={`/trip/${trip.id}`}>
            <div className="flex gap-4 p-4 border rounded-xl">

              <img
                src={trip.image}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2>{trip.name}</h2>
                <p className="text-sm text-gray-500">
                  {trip.duration}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}