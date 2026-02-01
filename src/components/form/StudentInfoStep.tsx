"use client";
import { useOrder } from "@/hooks/useOrder";
import { useEffect, useState, useMemo } from "react";
import { validateStudentInfo } from "@/utils/validateStudentInfo";
import "react-phone-input-2/lib/style.css";
import PhoneInput, { CountryData } from "react-phone-input-2";
import countryList from "react-select-country-list";
import Select from "react-select";
import { customStyles } from "@/styles/reactSelectStyles";


export default function StudentInfoStep() {
    const {
        studentInfo,
        setStudentInfo,
        sessionsPerMonth,
        setSessionsPerMonth,
        submitAttempted,
        setSubmitAttempted
    } = useOrder();

    const [errors, setErrors] = useState<Record<string, string>>({});
    const countries = useMemo(() => countryList().getData(), []);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sessionOptions = [
        { value: 4, label: "4 sessions" },
        { value: 8, label: "8 sessions" },
        { value: 12, label: "12 sessions" },
        { value: 16, label: "16 sessions" },
    ];



    useEffect(() => {
        if (!submitAttempted) return;
        const validationErrors = validateStudentInfo(studentInfo);
        setErrors(validationErrors);
    }, [submitAttempted, studentInfo]);

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
                Student information
            </h3>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full name
                </label>
                <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={studentInfo.fullName}
                    onChange={(e) => {
                        setStudentInfo({ ...studentInfo, fullName: e.target.value });

                    }}
                />
                {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={studentInfo.email}
                    onChange={(e) => {
                        setStudentInfo({ ...studentInfo, email: e.target.value });

                    }}
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Country</label>
                {isMounted ? (
                    <Select
                        options={countries}
                        value={countries.find((c) => c.value === studentInfo.country)}
                        onChange={(option) => {
                            setStudentInfo({ ...studentInfo, country: option?.value || "", phone: "" });

                        }}
                        styles={customStyles}
                        placeholder="Select country..."
                        isSearchable={true}
                        menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                    />
                ) : (
                    <div className="h-[38px] w-full bg-gray-50 border border-gray-300 rounded-md"></div>
                )}
                {errors.country && (
                    <p className="mt-1 text-xs text-red-600">{errors.country}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone number
                </label>
                <PhoneInput
                    country={(studentInfo.country || "AE").toLowerCase()}
                    enableSearch
                    value={studentInfo.phone}
                    onChange={(value, country) => {
                        const selectedCountry = country as CountryData;
                        setStudentInfo({
                            ...studentInfo,
                            phone: value,
                            country: selectedCountry.countryCode.toUpperCase(),
                        });

                    }}
                    containerClass="!w-full"
                    inputClass="!w-full !border-gray-300 !py-2.5 !text-sm !text-gray-900 !font-medium"
                />
                {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    City
                </label>
                <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={studentInfo.city}
                    onChange={(e) => {
                        setStudentInfo({ ...studentInfo, city: e.target.value });

                    }}
                />
                {errors.city && (
                    <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Address
                </label>
                <input
                    type="text"
                    placeholder="Enter address"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                    value={studentInfo.address}
                    onChange={(e) => {
                        setStudentInfo({ ...studentInfo, address: e.target.value });

                    }}
                />
                {errors.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Number of sessions per month
                </label>
                {isMounted ? (
                    <Select
                        options={sessionOptions}
                        value={sessionOptions.find(opt => opt.value === sessionsPerMonth)}
                        onChange={(opt) => setSessionsPerMonth(opt?.value || 0)}
                        styles={customStyles}
                        isSearchable={false}
                        placeholder="Select sessions"
                        menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                    />
                ) : (
                    <div className="h-[38px] w-full bg-gray-50 border border-gray-300 rounded-md"></div>
                )}
            </div>
        </div>
    );
}