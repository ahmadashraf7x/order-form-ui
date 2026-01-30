"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import { fetchPricingConfig } from "@/api/pricing.api";
import { calculateTotalPrice } from "@/utils/priceCalculator";
import { PricingConfig } from "@/types/pricing";

export default function OrderSummary() {
  const { duration, sessionsPerMonth } = useOrder();
const [pricing, setPricing] = useState<PricingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const data = await fetchPricingConfig();
        setPricing(data);
      } catch {
        setError("Failed to load pricing");
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, []);

  if (loading) {
    return (
      <aside className="rounded-lg bg-white p-6 shadow-md text-gray-700">
        Loading summary...
      </aside>
    );
  }

  if (error || !pricing) {
    return (
      <aside className="rounded-lg bg-white p-6 shadow-md text-red-600">
        {error ?? "Something went wrong"}
      </aside>
    );
  }

  const {
    monthlyPrice,
    discountRate,
    discountAmount,
    finalTotal,
  } = calculateTotalPrice(sessionsPerMonth, duration, pricing);

  return (
    <aside className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Duration</span>
          <span className="font-medium text-gray-900">
            {duration} months
          </span>
        </div>

        <div className="flex justify-between">
          <span>Sessions / month</span>
          <span className="font-medium text-gray-900">
            {sessionsPerMonth}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Monthly price</span>
          <span className="font-medium text-gray-900">
            ${monthlyPrice.toFixed(2)}
          </span>
        </div>

        {discountRate > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>- ${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <hr className="my-2" />

        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}
