"use client";

import { DurationOption, StudentInfo } from "@/types/order";
import { createContext, useContext, useState } from "react";
type paymentMethod = "card" | "bank"

type OrderContextType = {
  duration: DurationOption | null;
  setDuration: (d: DurationOption) => void;
  sessionsPerMonth: number | null;
  setSessionsPerMonth: (n: number) => void;
  studentInfo: StudentInfo;
  setStudentInfo: (data: StudentInfo) => void;
  payInAdvance: boolean;
  setPayInAdvance: (v: boolean) => void;
  paymentMethod: paymentMethod | null;
  setPaymentMethod: (m: paymentMethod) => void;
  submitAttempted: boolean;
  setSubmitAttempted: (v: boolean) => void;
  cardData: {
    number: string;
    expiry: string;
    cvv: string;
  };
  setCardData: (data: { number: string; expiry: string; cvv: string }) => void;
  bankData: {
    name: string;
    account: string;
  };
  setBankData: (data: { name: string; account: string }) => void;

};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [duration, setDuration] = useState<DurationOption | null>(null);
  const [sessionsPerMonth, setSessionsPerMonth] = useState<number | null>(null);
  const [payInAdvance, setPayInAdvance] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<paymentMethod | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const [bankData, setBankData] = useState({
    name: "",
    account: "",
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
        paymentMethod,
        setPaymentMethod,
        submitAttempted,
        setSubmitAttempted,
        cardData,
        setCardData,
        bankData,
        setBankData,
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