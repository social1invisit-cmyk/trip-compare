import { trips } from "@/data/trips";
import Image from "next/image";

export default async function TripDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ FIX

  const trip = trips.find((t) => t.id === id);

  if (!trip) return <div className="p-6">Trip not found</div>;

  const cheapest = trip.vendors.reduce((min, v) =>
    v.price < min.price ? v : min
  );

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="relative h-[300px] w-full">
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <h1 className="text-2xl font-bold">{trip.name}</h1>

        <p className="text-gray-500 mt-1">
          {trip.duration} • {trip.location}
        </p>

        {/* BEST DEAL */}
        <div className="mt-6 p-4 bg-green-100 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Best Price</p>
            <p className="text-lg font-bold">₹{cheapest.price}</p>
          </div>
          <span className="text-green-700 font-semibold">
            {cheapest.name}
          </span>
        </div>

        {/* VENDORS */}
        <div className="mt-6 space-y-3">
          {trip.vendors.map((v) => (
            <div
              key={v.id}
              className={`flex justify-between items-center border p-4 rounded-xl ${
                v.price === cheapest.price
                  ? "border-green-500 bg-green-50"
                  : ""
              }`}
            >
              <div>
                <p className="font-semibold">{v.name}</p>
                <p className="text-sm text-gray-500">
                  ⭐ {v.rating}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">₹{v.price}</p>
                <button className="text-sm text-orange-500">
                  View Deal →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}