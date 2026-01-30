import { DurationOption, StudentInfo } from "@/types/order";

type SubmitOrderPayload = {
    studentInfo: StudentInfo;
    duration: DurationOption;
    sessionsPerMonth: number;
};

export async function submitOrder(payload: SubmitOrderPayload) {
    const response = await fetch("/api/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Order submission failed");
    }

    return response.json();
}