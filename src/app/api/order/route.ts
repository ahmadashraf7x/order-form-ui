import { NextResponse } from "next/server";
import { StudentInfo, DurationOption } from "@/types/order";

type OrderRequestBody = {
    studentInfo: StudentInfo;
    duration: DurationOption;
    sessionsPerMonth: number;
};

export async function POST(req: Request) {
    try {
        const body: OrderRequestBody = await req.json();

        const { studentInfo, duration, sessionsPerMonth } = body;

        if (!studentInfo || !duration || !sessionsPerMonth) {
            return NextResponse.json(
                { message: "Invalid order data" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            orderId: Math.floor(Math.random() * 100000),
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}