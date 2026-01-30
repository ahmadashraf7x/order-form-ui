import { PricingConfig } from "@/types/pricing";

export function calculateTotalPrice(
  sessionsPerMonth: number,
  duration: number,
  pricing: PricingConfig
) {
  const baseMonthly = sessionsPerMonth * pricing.pricePerSession;
  const discountRate = pricing.discounts[duration] ?? 0;

  const discountAmount = baseMonthly * discountRate;
  const monthlyAfterDiscount = baseMonthly - discountAmount;
  const finalTotal = monthlyAfterDiscount * duration;

  return {
    monthlyPrice: baseMonthly,
    discountRate,
    discountAmount,
    finalTotal,
  };
}