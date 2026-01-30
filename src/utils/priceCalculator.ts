export function calculateTotalPrice(
  sessionsPerMonth: number,
  duration: number
) {
  const pricePerSession = 20;

  const monthlyPrice = sessionsPerMonth * pricePerSession;
  const baseTotal = monthlyPrice * duration;

  let discountRate = 0;

  if (duration >= 18) {
    discountRate = 0.15;
  } else if (duration >= 12) {
    discountRate = 0.1;
  } else if (duration >= 9) {
    discountRate = 0.05;
  }

  const discountAmount = baseTotal * discountRate;
  const finalTotal = baseTotal - discountAmount;

  return {
    pricePerSession,
    monthlyPrice,
    baseTotal,
    discountRate,
    discountAmount,
    finalTotal,
  };
}