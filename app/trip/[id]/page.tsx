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
    <div className="bg-[#f3f4f6] min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-[240px] md:h-[380px]">
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          priority
          className="object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-2xl md:text-4xl font-bold">
            {trip.name}
          </h1>
          <p className="text-sm opacity-90 mt-1">
            {trip.location} • {trip.duration}
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1 space-y-5">

          <div className="bg-white p-5 rounded-2xl shadow border">
            <h2 className="font-semibold mb-2 text-lg">About Trip</h2>
            <p className="text-gray-600 text-sm">
              {trip.description || "No description available."}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow border">
            <h2 className="font-semibold mb-3 text-lg">Trip Details</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><span className="font-medium">Location:</span> {trip.location}</p>
              <p><span className="font-medium">Duration:</span> {trip.duration}</p>
              <p><span className="font-medium">Category:</span> {trip.category?.join(", ")}</p>
              <p><span className="font-medium">Group Size:</span> 10-20</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow border">
            <h2 className="font-semibold mb-2 text-lg">Highlights</h2>

            <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
              <li>Beautiful locations</li>
              <li>Group experience</li>
              <li>Local culture & food</li>
              <li>Adventure activities</li>
            </ul>
          </div>

        </div>

        {/* RIGHT */}
        <div className="md:w-[320px]">

          <div className="bg-white p-5 rounded-2xl shadow-lg border md:sticky md:top-6">

            <p className="text-sm text-gray-500">Starting from</p>

            <h2 className="text-3xl font-bold text-orange-500">
              ₹{cheapest}
            </h2>

            <div className="mt-2 text-sm">
              ⭐ 4.5
            </div>

            {/* ✅ REAL REDIRECT BUTTON */}
            <a
              href={trip.bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-5 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold shadow hover:bg-blue-700 transition text-center"
            >
              Book Now
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}