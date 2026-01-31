"use client";

import { useOrder } from "@/hooks/useOrder";
import VisaIcon from "@/components/icons/VisaIcon";
import MastercardIcon from "@/components/icons/MastercardIcon";

export default function PaymentMethodStep() {
    const { paymentMethod, setPaymentMethod } = useOrder();

    return (
        <section className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Payment method
            </h3>

            <div className="space-y-3">
                {/* Card payment */}
                <label
                    className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition
            ${paymentMethod === "card"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                        />

                        <span className="text-sm font-medium text-gray-800">
                            Credit / Debit Card
                        </span>
                    </div>

                    {/* Card icons */}
                    <div className="flex items-center gap-2">
                        <VisaIcon />
                        <MastercardIcon />
                    </div>
                </label>

                {/* Bank transfer */}
                <label
                    className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 transition
            ${paymentMethod === "bank"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300"
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                    />

                    <span className="text-sm font-medium text-gray-800">
                        Bank transfer
                    </span>
                </label>
            </div>
        </section>
    );
}