"use client";
export default function OrderSummary() {
  return (
    <aside className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Plan</span>
          <span className="h-4 w-20 rounded bg-gray-100" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Duration</span>
          <span className="h-4 w-16 rounded bg-gray-100" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Payment</span>
          <span className="h-4 w-24 rounded bg-gray-100" />
        </div>

        <hr />

        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span className="h-6 w-24 rounded bg-gray-200" />
        </div>
      </div>
    </aside>
  );
}
