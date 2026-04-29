import { trips } from "@/data/trips";
import Link from "next/link";

export default async function SearchPage({ searchParams }: any) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";

  const filteredTrips = trips.filter((trip) =>
    trip.name.toLowerCase().includes(query)
  );

  return (
    <div className="p-6 bg-white min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        Results for "{query}"
      </h1>

      <div className="flex flex-col gap-4">
        {filteredTrips.map((trip) => {
          const cheapest = trip.vendors.reduce((min, v) =>
            v.price < min.price ? v : min
          );

          return (
            <Link key={trip.id} href={`/trip/${trip.id}`}>
              <div className="flex items-center gap-4 p-4 border rounded-xl">

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