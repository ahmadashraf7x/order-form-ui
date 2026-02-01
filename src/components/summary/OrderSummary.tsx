"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import { fetchPricingConfig } from "@/api/pricing.api";
import { calculateTotalPrice } from "@/utils/priceCalculator";
import { PricingConfig } from "@/types/pricing";
import { submitOrder } from "@/services/order.service";
import { validateStudentInfo } from "@/utils/validateStudentInfo";
import { validateCardData, validateBankData } from "@/utils/paymentValidation";


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

    const studentErrors = validateStudentInfo(studentInfo);
    if (Object.keys(studentErrors).length > 0) {
      setSubmitError("Please fill all required student information");
      return;
    }

    if (!sessionsPerMonth) {
      setSubmitError("Please select number of sessions");
      return;
    }

    if (!duration) {
      setSubmitError("Please select duration");
      return;
    }

    if (!paymentMethod) {
      setSubmitError("Please select a payment method");
      return;
    }

    if (paymentMethod === "card") {
      const cardError = validateCardData(cardData);
      if (cardError) {
        setSubmitError(cardError);
        return;
      }
    }

    if (paymentMethod === "bank") {
      const bankError = validateBankData(bankData);
      if (bankError) {
        setSubmitError(bankError);
        return;
      }
    }


    if (!acceptedTerms) {
      setSubmitError("You must accept the Terms & Conditions");
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
          <span>Payment method</span>
          <span className="font-medium text-gray-900">
            {paymentMethod
              ? paymentMethod === "card"
                ? "Card"
                : "Bank transfer"
              : "Not selected"}
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
                <span>Discount</span>
                <span>- ${result.discountAmount.toFixed(2)}</span>
              </div>
            )}

            <hr className="my-2" />

            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>Total</span>
              <span>${result.finalTotal.toFixed(2)}</span>
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
          disabled={submitting}
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Order Now"}
        </button>


      </div>
    </aside>
  );
}
