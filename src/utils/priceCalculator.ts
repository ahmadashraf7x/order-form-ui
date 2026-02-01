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



const monthlyPrice = baseMonthly;
const monthlyDiscount = monthlyPrice * discountRate;
const totalDiscount = monthlyDiscount * duration;
const monthlyPriceAfterDiscount = monthlyPrice - monthlyDiscount;
const totalPrice = monthlyPriceAfterDiscount * duration;



    return {
        monthlyPrice,
        discountRate,
        monthlyDiscount,
        monthlyPriceAfterDiscount,
        totalPrice,
        totalDiscount
        
    };
}