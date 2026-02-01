import { StudentInfo, DurationOption } from "@/types/order"; 
import { validateStudentInfo } from "./validateStudentInfo";
import { validateCardData, validateBankData } from "./paymentValidation";

interface OrderValidationData {
  studentInfo: StudentInfo;
  sessionsPerMonth: number | null;
  duration: DurationOption | null;
  paymentMethod: "card" | "bank" | null;
  cardData: any;
  bankData: any;
  acceptedTerms: boolean;
}

export const validateOrderForm = (data: OrderValidationData): string | null => {
  const { 
    studentInfo, 
    sessionsPerMonth, 
    duration, 
    paymentMethod, 
    cardData, 
    bankData, 
    acceptedTerms 
  } = data;

  const studentErrors = validateStudentInfo(studentInfo);
  if (Object.keys(studentErrors).length > 0) {
    return "Please fill all required student information";
  }

  if (!sessionsPerMonth) return "Please select number of sessions";
  if (!duration) return "Please select duration";
  if (!paymentMethod) return "Please select a payment method";

  let paymentError: string | null = null;
  if (paymentMethod === "card") {
    paymentError = validateCardData(cardData);
  } else if (paymentMethod === "bank") {
    paymentError = validateBankData(bankData);
  }

  if (paymentError) return paymentError;

  if (!acceptedTerms) return "You must accept the Terms & Conditions";

  return null; 
};