"use client";
import { useEffect, useState } from "react";
import StudentInfoStep from "./StudentInfoStep";
import { useOrder } from "@/hooks/useOrder";
import { validateStudentInfo } from "@/utils/validateStudentInfo";
import { submitOrder } from "@/services/order.service";

export default function OrderForm() {
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const { studentInfo, duration, sessionsPerMonth, paymentMethod } = useOrder();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setError(null);
        setSuccess(false);
    }, [studentInfo, sessionsPerMonth, duration, paymentMethod]);



    const handleContinue = async () => {
        setSubmitAttempted(true);
        setError(null);
        setSuccess(false);

        const studentErrors = validateStudentInfo(studentInfo);
        if (Object.keys(studentErrors).length > 0) {
            setError("Please fill all required student information");
            return;
        }

        if (!paymentMethod) {
            setError("Please select a payment method");
            return;
        }

        if (!sessionsPerMonth) {
            setError("Please select number of sessions");
            return;
        }

        if (!duration) {
            setError("Please select duration");
            return;
        }


        setLoading(true);
        try {
            const data = await submitOrder({
                studentInfo,
                duration,
                sessionsPerMonth,
            });

            setSuccess(true);
            console.log("ORDER SUBMITTED", data);
        } catch {
            setError("Failed to submit order");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="lg:col-span-2 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
                Registration & Booking Details
            </h2>

            <div className="space-y-8">
                <StudentInfoStep submitAttempted={submitAttempted} />
                {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 text-sm">Order submitted successfully!</p>
                )}

                <button
                    type="button"
                    onClick={handleContinue}
                    disabled={loading}
                    className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    {loading
                        ? "Submitting..."
                        : success
                            ? "Proceed to Payment"
                            : "Continue"}
                </button>
            </div>
        </section>
    );
}