import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    pricePerSession: 20,
    discounts: {
      6: 0,
      9: 0.05,
      12: 0.1,
      18: 0.15,
      24: 0.15,
      36: 0.15,
    },
  });
}