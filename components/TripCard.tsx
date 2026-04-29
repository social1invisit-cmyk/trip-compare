import Link from "next/link";
import Image from "next/image";

export default function TripCard({ trip }: any) {
  const cheapest = Math.min(...trip.vendors.map((v: any) => v.price));

  return (
    <div className="bg-white border rounded-2xl p-3 md:p-4 shadow hover:shadow-md transition flex flex-col md:flex-row gap-3 md:gap-4">

      {/* IMAGE */}
      <div className="relative w-full md:w-44 h-28 md:h-32 rounded-xl overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">

        <div>
          <h2 className="font-semibold text-base md:text-lg leading-tight">
            {trip.name}
          </h2>

          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {trip.location} • {trip.duration}
          </p>

          <div className="text-xs md:text-sm mt-1">⭐ 4.5</div>

          {/* TAGS */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {trip.category.map((c: string) => (
              <span
                key={c}
                className="text-[10px] md:text-xs px-2 py-0.5 border rounded-full"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Multiple vendors available
          </p>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex flex-row md:flex-col justify-between items-center md:items-end mt-2 md:mt-0">

        {/* PRICE */}
        <div className="text-left md:text-right">
          <p className="text-[10px] md:text-xs text-gray-400">
            Starting from
          </p>
          <p className="text-base md:text-lg font-bold text-orange-500">
            ₹{cheapest}
          </p>
        </div>

        {/* BUTTON */}
        <Link
          href={`/trip/${trip.id}`}
          className="text-xs md:text-sm font-medium text-orange-500 hover:underline"
        >
          View →
        </Link>

      </div>

    </div>
  );
}