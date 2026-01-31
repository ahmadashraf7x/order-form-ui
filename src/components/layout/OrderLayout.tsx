"use client";
import { OrderProvider } from "@/hooks/useOrder";
import { ReactNode } from "react";

interface OrderLayoutProps {
  children: ReactNode;
}

export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <OrderProvider>
      <main className="min-h-screen bg-gray-50 p-6">
           <div className="flex justify-end px-8 py-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
  <span>All advantages</span>

  <img
    src="/uae-flag.png"
    alt="UAE"
    className="h-5 w-7 rounded-sm object-cover"
  />
</div>
      </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {children}
          </div>
        </div>
      </main>
    </OrderProvider>
  );
}
