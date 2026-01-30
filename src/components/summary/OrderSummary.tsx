"use client";

import { useOrder } from "@/hooks/useOrder";
import { calculateTotalPrice } from "@/utils/priceCalculator";

export default function OrderSummary() {
  const { duration, sessionsPerMonth } = useOrder();

  const {
    monthlyPrice,
    discountRate,
    discountAmount,
    finalTotal,
  } = calculateTotalPrice(sessionsPerMonth, duration);

  return (
    <aside className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Duration</span>
          <span>{duration} months</span>
        </div>

        <div className="flex justify-between">
          <span>Sessions / month</span>
          <span>{sessionsPerMonth}</span>
        </div>

        <div className="flex justify-between">
          <span>Monthly price</span>
          <span>${monthlyPrice.toFixed(2)}</span>
        </div>

        {discountRate > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountRate * 100}%)</span>
            <span>- ${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <hr />

        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}