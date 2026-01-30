"use client";
import OrderLayout from "@/components/layout/OrderLayout";
import OrderForm from "@/components/form/OrderForm";
import OrderSummary from "@/components/summary/OrderSummary";

export default function HomePage() {
  return (
    <OrderLayout>
      <OrderForm />
      <OrderSummary />
    </OrderLayout>
  );
}
