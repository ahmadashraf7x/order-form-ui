"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import { fetchPricingConfig } from "@/api/pricing.api";
import { calculateTotalPrice } from "@/utils/priceCalculator";
import { PricingConfig } from "@/types/pricing";
import { submitOrder } from "@/services/order.service";
import { validateOrderForm } from "@/utils/orderValidation";



export default function OrderSummary() {
  const { duration, sessionsPerMonth, payInAdvance, paymentMethod, studentInfo, submitAttempted, setSubmitAttempted, cardData, bankData } = useOrder();
  const [pricing, setPricing] = useState<PricingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);




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

  useEffect(() => {
    setSuccess(false);
    setSubmitError(null);
  }, [sessionsPerMonth, duration, paymentMethod, acceptedTerms, studentInfo, cardData, bankData]);

  const handleOrderNow = async () => {
    setSubmitAttempted(true);
    setSubmitError(null);
    setSuccess(false);
    const validationError = validateOrderForm({
      studentInfo,
      sessionsPerMonth,
      duration,
      paymentMethod,
      cardData,
      bankData,
      acceptedTerms
    });

    if (validationError) {
      setSubmitError(validationError);
      return;
    }
    if (!canCalculate) {
      return;
    }

    setSubmitting(true);
    try {
      const data = await submitOrder({
        studentInfo,
        duration,
        sessionsPerMonth,
      });

      setSuccess(true);
      console.log("ORDER SUBMITTED", data);
    } catch {
      setSubmitError("Failed to submit order");
    } finally {
      setSubmitting(false);
    }
  };



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

  const canCalculate =
    sessionsPerMonth !== null && duration !== null;


  const result = canCalculate ? calculateTotalPrice(sessionsPerMonth, duration, pricing, payInAdvance) : null;

  return (
    <aside className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Order Summary
      </h2>
      {!result && (
        <p className="mb-4 rounded bg-blue-50 px-3 py-2 text-xs text-blue-700 border border-blue-100">
          {!duration && !sessionsPerMonth
            ? "Please select a duration and number of sessions to see pricing."
            : !duration
              ? "Please select a duration to see the final price."
              : "Please select sessions per month to calculate total."}
        </p>
      )}

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Duration</span>
          <span className="font-medium text-gray-900">
            {duration ? `${duration} months` : "—"}

          </span>
        </div>

        <div className="flex justify-between">
          <span>Sessions / month</span>
          <span className="font-medium text-gray-900">
            {sessionsPerMonth ?? "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Payment method</span>
          <span className="font-medium text-gray-900">
            {paymentMethod
              ? paymentMethod === "card"
                ? "Card"
                : "Bank transfer"
              : "—"}
          </span>
        </div>
        {payInAdvance && (
          <div className="flex justify-between text-green-600">
            <span>Pay in advance</span>
            <span>Yes</span>
          </div>
        )}

        {result && (
          <>
            <div className="flex justify-between">
              <span>Monthly price</span>
              <span className="font-medium text-gray-900">
                ${result.monthlyPrice.toFixed(2)}
              </span>
            </div>

            {result.discountRate > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Total Discount</span>
                <span>- ${result.totalDiscount.toFixed(2)}</span>
              </div>
            )}

            <hr className="my-2" />

            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>Total for {duration} months</span>
              <span>${result.totalPrice.toFixed(2)}</span>
            </div>
          </>
        )}

        <div className="mt-4 flex items-start gap-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1"
          />
          <label className="text-sm text-gray-600">
            I accept the{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Terms & Conditions
            </span>
          </label>
        </div>

        {submitError && (
          <p className="mt-2 text-sm text-red-600">{submitError}</p>
        )}

        {success && (
          <p className="mt-2 text-sm text-green-600">
            Order submitted successfully!
          </p>
        )}


        <button
          type="button"
          onClick={handleOrderNow}
          disabled={submitting || success}
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : success ? "Submitted Successfully!" : "Order Now"}
        </button>


      </div>
    </aside>
  );
}
