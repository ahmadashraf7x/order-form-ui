"use client";
import OrderLayout from "@/components/layout/OrderLayout";
import OrderForm from "@/components/form/OrderForm";
import PlanStep from "@/components/form/PlanStep";
import OrderSummary from "@/components/summary/OrderSummary";
import PaymentMethodStep from "@/components/form/PaymentMethodStep";

export default function HomePage() {
  return (
    <OrderLayout>
      <OrderForm />
      <div className="space-y-6">
        <PlanStep />
        <PaymentMethodStep />

        <OrderSummary />
      </div>
    </OrderLayout>
  );
}
