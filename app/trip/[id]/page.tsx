import { trips } from "@/data/trips";
import Image from "next/image";

export default function TripDetail({ params }: any) {
  const trip = trips.find((t) => t.id === params.id);

  if (!trip) return <div className="p-6">Trip not found</div>;

  return (
    <div className="min-h-screen bg-white">

      <div className="relative h-[300px] w-full">
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <h1 className="text-2xl font-bold">{trip.name}</h1>

        <div className="mt-6">
          {trip.vendors.map((v) => (
            <div key={v.id} className="flex justify-between border p-4 rounded mb-2">
              <span>{v.name}</span>
              <span>₹{v.price}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}