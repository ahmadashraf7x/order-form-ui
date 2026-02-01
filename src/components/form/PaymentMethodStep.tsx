"use client";

import { useOrder } from "@/hooks/useOrder";
import VisaIcon from "@/components/icons/VisaIcon";
import MastercardIcon from "@/components/icons/MastercardIcon";

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const formatExpiry = (value: string) => {
    let numbers = value.replace(/\D/g, "");

    if (numbers.length >= 2) {
        const month = numbers.slice(0, 2);
        if (Number(month) > 12) numbers = "12" + numbers.slice(2);
    }

    if (numbers.length <= 2) return numbers;

    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
};

export default function PaymentMethodStep() {
    const {
        paymentMethod,
        setPaymentMethod,
        cardData,
        setCardData,
        bankData,
        setBankData,
    } = useOrder();

    const inputClasses =
        "w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none";

    return (
        <section className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Payment method
            </h3>

            <div className="space-y-3">
                <label
                    className={`flex cursor-pointer flex-col gap-4 rounded-md border p-4 transition
            ${paymentMethod === "card"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300"
                        }`}
                >
                    <div className="flex items-center justify-between">
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

                        <div className="flex items-center gap-2">
                            <VisaIcon />
                            <MastercardIcon />
                        </div>
                    </div>

                    {paymentMethod === "card" && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Card Number"
                                maxLength={16}
                                value={cardData.number}
                                onChange={(e) =>
                                    setCardData({
                                        ...cardData,
                                        number: onlyNumbers(e.target.value),
                                    })
                                }
                                className={inputClasses}
                            />

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    value={cardData.expiry}
                                    onChange={(e) =>
                                        setCardData({
                                            ...cardData,
                                            expiry: formatExpiry(e.target.value),
                                        })
                                    }
                                    className={inputClasses}
                                />

                                <input
                                    type="password"
                                    inputMode="numeric"
                                    placeholder="CVV"
                                    maxLength={3}
                                    value={cardData.cvv}
                                    onChange={(e) =>
                                        setCardData({
                                            ...cardData,
                                            cvv: onlyNumbers(e.target.value),
                                        })
                                    }
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    )}
                </label>

                <label
                    className={`flex cursor-pointer flex-col gap-4 rounded-md border p-4 transition
            ${paymentMethod === "bank"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "bank"}
                            onChange={() => setPaymentMethod("bank")}
                        />

                        <span className="text-sm font-medium text-gray-800">
                            Bank transfer
                        </span>
                    </div>

                    {paymentMethod === "bank" && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Account holder name"
                                value={bankData.name}
                                onChange={(e) =>
                                    setBankData({ ...bankData, name: e.target.value })
                                }
                                className={inputClasses}
                            />

                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Account number / IBAN"
                                value={bankData.account}
                                onChange={(e) =>
                                    setBankData({
                                        ...bankData,
                                        account: onlyNumbers(e.target.value),
                                    })
                                }
                                className={inputClasses}
                            />
                        </div>
                    )}
                </label>
            </div>
        </section>
    );
}
