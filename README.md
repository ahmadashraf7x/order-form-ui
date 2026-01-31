![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=fff)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![REST API](https://img.shields.io/badge/API-REST-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

# GoStudent-like Order Page – Front-End Developer Test

## 📌 Overview
This project recreates a UI similar to **GoStudent’s order page**, built using modern front-end techniques with a strong focus on **code quality**, **user experience**, and **scalability**.

The implementation demonstrates advanced front-end concepts such as state management, dynamic pricing, form validation, API integration, and responsive layout architecture.

---

## 🎯 Objectives Covered
- Recreate a GoStudent-like order flow UI
- Use modern front-end technologies (HTML5, CSS3, ES6+)
- Implement interactive elements and REST API integration
- Ensure WordPress compatibility readiness
- Provide robust form validation
- Deliver responsive, mobile-first design
- Maintain clean, maintainable, well-structured code

---

## 🧱 Tech Stack
- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Flexbox + Grid)
- **State Management:** React Context API
- **API:** Next.js API Routes (REST-style)
- **Validation:** Custom field-level & submit-level validation
- **Architecture:** Component-based, scalable structure

---

## 🧩 Folder Structure

```text
src/
├─ app/
│  ├─ api/
│  │  ├─ pricing/
│  │  │  └─ route.ts
│  │  └─ order/
│  │     └─ route.ts
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ api/
│  └─ pricing.api.ts
│
├─ components/
│  ├─ form/
│  │  ├─ OrderForm.tsx
│  │  ├─ StudentInfoStep.tsx
│  │  ├─ PlanStep.tsx
│  │  └─ PaymentMethodStep.tsx
│  ├─ summary/
│  │  └─ OrderSummary.tsx
│  ├─ layout/
│  │  └─ OrderLayout.tsx
│  └─ icons/
│     ├─ VisaIcon.tsx
│     └─ MastercardIcon.tsx
│
├─ hooks/
│  └─ useOrder.tsx
│
├─ services/
│  └─ order.service.ts
│
├─ utils/
│  ├─ priceCalculator.ts
│  └─ validateStudentInfo.ts
│
├─ types/
│  ├─ order.ts
│  └─ pricing.ts
```

---

## 🔄 Order Flow
1. **Student Information**
   - Full form with field-level validation
   - Errors appear only after submission attempt
   - Individual field errors clear automatically on change

2. **Plan Selection**
   - Duration selection
   - Optional “Pay in advance” toggle with additional discount

3. **Payment Method**
   - Card / Bank transfer selection
   - Visual feedback + icons (Visa / Mastercard)

4. **Order Summary**
   - Dynamic pricing based on user selections
   - Discount calculation
   - Terms & Conditions acceptance
   - Final order submission

---

## 🧠 State Management
All shared state is managed centrally via a custom `useOrder` hook using React Context:
- Student information
- Selected duration
- Sessions per month
- Payment method
- Pay-in-advance flag
- Submission attempt state (used for validation coordination)

This ensures:
- Single source of truth
- Clean data flow
- Easy extensibility

---

## 💰 Pricing Logic
Pricing is calculated dynamically using:
- Sessions per month
- Duration-based discounts
- Additional discount when paying in advance

All calculations are isolated in:
utils/priceCalculator.ts

This keeps business logic separate from UI components.

---

## ✅ Form Validation Strategy
- **Field-level validation** for student inputs
- **Submit-level validation** on “Order Now”
- Errors:
  - Appear only after submission attempt
  - Clear automatically per-field when corrected
  - Summary-level errors reset on relevant state changes

This results in a clean and professional UX without noisy validation.

---

## 🌍 WordPress Compatibility
While this project is implemented in Next.js, it is **fully compatible in concept with WordPress environments**:

- Uses REST-style API architecture (same as WordPress REST API)
- UI is decoupled from backend logic
- Can be easily adapted to:
  - Headless WordPress
  - Custom plugin integration
  - Embedded UI via iframe or shortcode

No framework-specific assumptions block WordPress usage.

---

## 🔁 RTL Support
The layout is built using flexible, direction-agnostic components (Flexbox / Grid).

RTL support can be enabled easily by:
- Adding `dir="rtl"` at layout level
- Adjusting Tailwind configuration if required

The UI is **RTL-ready by design**.

---

## 📱 Responsive Design
- Mobile-first layout
- Fully responsive across screen sizes
- Tested with flexible grid system
- No fixed-width dependencies

---

## 🧪 API Endpoints
### GET `/api/pricing`
Returns pricing configuration:
- Price per session
- Discount mapping per duration

### POST `/api/order`
Accepts order payload and simulates order creation.

---

## 🧼 Code Quality
- Clear separation of concerns
- Strong typing with TypeScript
- Reusable, isolated components
- Readable naming conventions
- Production-ready structure

---

## ▶️ Run Locally

```bash
git clone https://github.com/ahmadashraf7x/order-form-ui
cd order-form-ui
npm install
npm run dev
```

## 🌍 Live Demo

🚀 https://order-form-eml419udb-ahmad-ashrafs-projects-d3b30ff3.vercel.app

---

### 📌 Author
**Ahmad Ashraf**

Front-End Developer

## 📎 Notes

This implementation prioritizes architecture, validation flow, and maintainability over pixel-perfect UI.
The structure is intentionally designed to mirror real-world production environments.

## ✅ Conclusion

All requested requirements have been fully implemented.
Additional attention was given to scalability, validation UX, and clean architectural separation.
The result reflects modern front-end engineering best practices suitable for production environments.
