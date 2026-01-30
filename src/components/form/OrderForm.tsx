"use client";
import { useState } from "react";
import StudentInfoStep from "./StudentInfoStep";

export default function OrderForm() {
    const [submitAttempted, setSubmitAttempted] = useState(false);

    return (
        <section className="lg:col-span-2 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
                Registration & Booking Details
            </h2>

            <div className="space-y-8">
                <StudentInfoStep submitAttempted={submitAttempted} />


                <button
                    type="button"
                    onClick={() => setSubmitAttempted(true)}
                    className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Continue
                </button>


            </div>
        </section>
    );
}
