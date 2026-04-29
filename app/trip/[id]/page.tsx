import { trips } from "@/data/trips";
import Image from "next/image";

export default async function TripDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return <div className="p-6">Trip not found</div>;
  }

  const cheapest = Math.min(
    ...(trip.vendors || []).map((v: any) => v.price)
  );

  return (
    <div className="bg-[#f5f5f5] min-h-screen">

      {/* HERO IMAGE */}
      <div className="relative w-full h-[220px] md:h-[350px]">
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-xl md:text-3xl font-bold">
            {trip.name}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-6 py-6 max-w-6xl mx-auto">

        {/* LEFT SIDE */}
        <div className="flex-1 space-y-4">

          {/* ABOUT */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">About Trip</h2>
            <p className="text-gray-600 text-sm">
              {trip.description || "No description available."}
            </p>
          </div>

          {/* DETAILS */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Trip Details</h2>

            <div className="grid grid-cols-2 gap-3 text-sm">

              <p><span className="font-medium">Location:</span> {trip.location}</p>
              <p><span className="font-medium">Duration:</span> {trip.duration}</p>

              <p><span className="font-medium">Category:</span> {trip.category?.join(", ")}</p>
              <p><span className="font-medium">Group Size:</span> 10-20</p>

            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Highlights</h2>

            <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
              <li>Beautiful locations</li>
              <li>Group experience</li>
              <li>Local culture & food</li>
              <li>Adventure activities</li>
            </ul>
          </div>

        </div>

        {/* RIGHT SIDE (PRICE BOX) */}
        <div className="md:w-[300px]">

          <div className="bg-white p-4 rounded-xl shadow md:sticky md:top-6">

            <p className="text-sm text-gray-500">Starting from</p>

            <h2 className="text-2xl font-bold text-orange-500">
              ₹{cheapest}
            </h2>

            <div className="mt-2 text-sm">
              ⭐ 4.5
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Book Now
            </button>

            <button className="w-full mt-2 border py-2 rounded-lg">
              Add to Compare
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}