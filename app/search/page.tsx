"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

  // budget filter
  filtered = filtered.filter((trip) => {
    const minPrice = Math.min(...trip.vendors.map((v: any) => v.price));
    return minPrice <= budget;
  });

  return (
    <div className="p-6 bg-white min-h-screen">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        Results for "{query}"
      </h1>

      {/* BUDGET */}
      <div className="mb-6">
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

      {/* RESULTS */}
      <div className="space-y-4">

        {filtered.length === 0 && (
          <p className="text-gray-500">
            No trips found for "{query}"
          </p>
        )}

        {filtered.map((trip) => {
          const cheapest = Math.min(
            ...trip.vendors.map((v: any) => v.price)
          );

          return (
            <Link key={trip.id} href={`/trip/${trip.id}`}>
              <div className="flex items-center gap-4 p-4 border rounded-xl hover:shadow">

                <div className="relative w-24 h-24">
                  <Image
                    src={trip.image}
                    alt={trip.name}
                    fill
                    sizes="96px"
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold">
                    {trip.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {trip.duration}
                  </p>
                </div>

                <div className="text-orange-500 font-bold">
                  ₹{cheapest}
                </div>

              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}