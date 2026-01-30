import { PricingConfig } from "@/types/pricing";

export async function fetchPricingConfig(): Promise<PricingConfig> {
  const res = await fetch("/api/pricing");

  if (!res.ok) {
    throw new Error("Failed to fetch pricing config");
  }

  return res.json();
}