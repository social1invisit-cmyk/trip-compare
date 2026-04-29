import { NextResponse } from "next/server";
import { trips } from "@/data/trips";

export async function GET() {
  return NextResponse.json(trips);
}