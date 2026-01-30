"use client";

import { DurationOption, StudentInfo } from "@/types/order";
import { createContext, useContext, useState } from "react";

type OrderContextType = {
  duration: DurationOption | null;
  setDuration: (d: DurationOption) => void;
  sessionsPerMonth: number | null;
  setSessionsPerMonth: (n: number) => void;
  studentInfo: StudentInfo;
  setStudentInfo: (data: StudentInfo) => void;
  payInAdvance: boolean;
  setPayInAdvance: (v: boolean) => void;

};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [duration, setDuration] = useState<DurationOption | null>(null);
  const [sessionsPerMonth, setSessionsPerMonth] = useState<number | null>(null);
  const [payInAdvance, setPayInAdvance] = useState<boolean>(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });


  return (
    <OrderContext.Provider
      value={{
        duration,
        setDuration,
        sessionsPerMonth,
        setSessionsPerMonth,
        studentInfo,
        setStudentInfo,
        payInAdvance,
        setPayInAdvance,
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