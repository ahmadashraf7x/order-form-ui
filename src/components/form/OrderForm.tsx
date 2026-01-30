import StudentInfoStep from "./StudentInfoStep";

export default function OrderForm() {
  return (
    <section className="lg:col-span-2 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        Registration details
      </h2>

      <div className="space-y-8">
        <StudentInfoStep />
      </div>
    </section>
  );
}
