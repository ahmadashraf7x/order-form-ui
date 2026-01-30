"use client";

import { createContext, useContext, useState } from "react";

export type DurationOption = 6 | 9 | 12 | 18 | 24 | 36;

type OrderContextType = {
  duration: DurationOption;
  setDuration: (d: DurationOption) => void;
  sessionsPerMonth: number;
  setSessionsPerMonth: (n: number) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [duration, setDuration] = useState<DurationOption>(6);
  const [sessionsPerMonth, setSessionsPerMonth] = useState(8);

  return (
    <OrderContext.Provider
      value={{
        duration,
        setDuration,
        sessionsPerMonth,
        setSessionsPerMonth,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used inside OrderProvider");
  }

  return context;
}