"use client";
import { useOrder, DurationOption } from "@/hooks/useOrder";

const durations: DurationOption[] = [6, 9, 12, 18, 24, 36];

export default function PlanStep() {
  const {
    duration,
    setDuration,
  } = useOrder();

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Order overview
      </h3>

    
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-gray-600">
          Duration
        </p>

        <div className="grid grid-cols-3 gap-2">
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`rounded-md border px-3 py-2 text-sm transition
                ${
                  duration === d
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
            >
              {d} months
            </button>
          ))}
        </div>
      </div>

     
      
    </section>
  );
}
