"use client";
import { useOrder } from "@/hooks/useOrder";
import { useEffect, useState } from "react";
import { validateStudentInfo } from "@/utils/validateStudentInfo";



export default function StudentInfoStep({ submitAttempted }: { submitAttempted: boolean }) {
    const {
        sessionsPerMonth,
        setSessionsPerMonth,
    } = useOrder();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        address: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!submitAttempted) return;

        const validationErrors = validateStudentInfo(formData);
        setErrors(validationErrors);
    }, [submitAttempted, formData]);


    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
                Student information
            </h3>
            <div>
                <label className="mb-1 block text-sm text-gray-600">
                    Full name
                </label>
                <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={formData.fullName}
                    onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })}

                />
                {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm text-gray-600">
                    Email address
                </label>
                <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })}

                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
            </div>


            <div>
                <label className="mb-1 block text-sm text-gray-600">
                    Phone number
                </label>
                <input
                    type="tel"
                    placeholder="+20 1xxxxxxxxx"
                    className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })}

                />
                {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
            </div>


            <div>
                <label className="mb-1 block text-sm text-gray-600">
                    Country
                </label>
                <select
                    value={formData.country}
                    onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none">

                    <option value="">Select country</option>
                    <option>United Arab Emirates</option>
                    <option>Egypt</option>
                    <option>Austria</option>
                    <option>United Kingdom</option>
                </select>
                {errors.country && (
                    <p className="mt-1 text-xs text-red-600">{errors.country}</p>
                )}
            </div>


            <div>
                <label className="mb-1 block text-sm text-gray-600">
                    City
                </label>
                <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={formData.city}
                    onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })}

                />
                {errors.city && (
                    <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm text-gray-600">
                    Address
                </label>
                <input
                    type="text"
                    placeholder="Enter address"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={formData.address}
                    onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })}

                />
                {errors.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                    Number of sessions per month
                </label>

                <select
                    value={sessionsPerMonth}
                    onChange={(e) => setSessionsPerMonth(Number(e.target.value))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400"
                >
                    {[4, 8, 12, 16].map((n) => (
                        <option key={n} value={n}>
                            {n} sessions
                        </option>
                    ))}
                </select>
            </div>



        </div>
    );
}
