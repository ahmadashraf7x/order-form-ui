"use client";

import { createContext, useContext, useState } from "react";

export type StudentInfo = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
};

export type DurationOption = 6 | 9 | 12 | 18 | 24 | 36;

type OrderContextType = {
  duration: DurationOption;
  setDuration: (d: DurationOption) => void;
  sessionsPerMonth: number;
  setSessionsPerMonth: (n: number) => void;
  studentInfo: StudentInfo;
  setStudentInfo: (data: StudentInfo) => void;

};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [duration, setDuration] = useState<DurationOption>(6);
  const [sessionsPerMonth, setSessionsPerMonth] = useState(8);
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