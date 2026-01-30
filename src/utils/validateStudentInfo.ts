import { StudentInfo } from "@/types/order";
export function validateStudentInfo(data: StudentInfo) {
    const errors: Partial<Record<keyof StudentInfo, string>> = {};

    if (!data.fullName.trim()) {
        errors.fullName = "Full name is required";
    }

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email address";
    }

    if (!data.phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(data.phone.replace(/\s/g, ""))) {
        errors.phone = "Invalid phone number";
    }


    if (!data.country) {
        errors.country = "Country is required";
    }

    if (!data.city.trim()) {
        errors.city = "City is required";
    }

    if (!data.address.trim()) {
        errors.address = "Address is required";
    }

    return errors;
}
