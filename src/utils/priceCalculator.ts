import { PricingConfig } from "@/types/pricing";


export function calculateTotalPrice(
    sessionsPerMonth: number,
    duration: number,
    pricing: PricingConfig,
    payInAdvance: boolean
) {
    const baseMonthly = sessionsPerMonth * pricing.pricePerSession;
    let discountRate = pricing.discounts[duration] ?? 0;

    if (payInAdvance) {
        const additionalDiscount = 0.05;
        discountRate += additionalDiscount;
    }


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