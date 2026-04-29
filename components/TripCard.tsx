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

        {/* MOBILE FIRST DESIGN */}
        <div className="flex gap-3 p-3">

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

            {/* TITLE */}
            <h2 className="text-sm font-semibold leading-tight">
              {trip.name}
            </h2>

            {/* SUBTEXT */}
            <p className="text-xs text-gray-500 mt-1">
              {trip.duration} • {trip.location}
            </p>

            {/* RATING */}
            <div className="flex items-center text-xs mt-1">
              ⭐ 4.5
            </div>

            {/* TAGS */}
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

            {/* PRICE + CTA */}
            <div className="flex justify-between items-center mt-3">

              <div>
                <p className="text-[10px] text-gray-400">Starting</p>
                <p className="text-sm font-bold text-orange-500">
                  ₹{cheapest}
                </p>
              </div>

              <button className="text-xs text-orange-500 font-semibold">
                View →
              </button>

            </div>

          </div>
        </div>

      </div>

    </Link>
  );
}