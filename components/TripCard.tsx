"use client";

import Image from "next/image";
import Link from "next/link";

export default function TripCard({ trip }: any) {
  const cheapest = Math.min(
    ...(trip.vendors || []).map((v: any) => v.price)
  );

  return (
    <Link href={`/trip/${trip.id}`}>

      <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition w-full">

        {/* MOBILE */}
        <div className="flex gap-3 p-3 md:hidden">

          {/* IMAGE */}
          <div className="relative w-[110px] h-[110px] rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={trip.image}
              alt={trip.name}
              fill
              sizes="110px"
              className="object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="flex-1">

            <h2 className="text-sm font-semibold leading-tight">
              {trip.name}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              {trip.duration} • {trip.location}
            </p>

            <div className="text-xs mt-1">⭐ 4.5</div>

            <div className="flex gap-1 mt-2 flex-wrap">
              {(trip.category || []).slice(0, 2).map((c: string) => (
                <span
                  key={c}
                  className="text-[10px] px-2 py-[2px] bg-gray-100 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mt-3">

              <div>
                <p className="text-[10px] text-gray-400">Starting</p>
                <p className="text-sm font-bold text-orange-500">
                  ₹{cheapest}
                </p>
              </div>

              <span className="text-xs text-orange-500 font-semibold">
                View →
              </span>

            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex p-4 gap-6 items-center">

          {/* IMAGE */}
          <div className="relative w-[220px] h-[140px] rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={trip.image}
              alt={trip.name}
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="flex-1">

            <h2 className="text-lg font-semibold">
              {trip.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {trip.duration} • {trip.location}
            </p>

            <div className="flex items-center gap-2 mt-2 text-sm">
              ⭐ 4.5
            </div>

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

            <p className="text-sm text-gray-500 mt-2">
              Multiple vendors available
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="text-right flex flex-col items-end justify-between h-full">

            <div>
              <p className="text-xs text-gray-400">Starting from</p>
              <p className="text-xl font-bold text-orange-500">
                ₹{cheapest}
              </p>
            </div>

            <button className="mt-3 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
              View →
            </button>

          </div>

        </div>

      </div>

    </Link>
  );
}