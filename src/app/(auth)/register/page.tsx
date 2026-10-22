"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Phone, MapPin, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    sameAsMobile: true,
    targetExam: "SSC, RAIL, WBCS",
    city: "Kolkata",
    pincode: "700006",
    password: "",
  });

  const examOptions = [
    "SSC, RAIL, WBCS",
    "All Bank Exams",
    "Exams Portal",
    "GK From Class 9 to 12",
  ];

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({
      ...prev,
      mobile: val,
      whatsapp: prev.sameAsMobile ? val : prev.whatsapp,
    }));
  };

  const handleSameAsMobileToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sameAsMobile: checked,
      whatsapp: checked ? prev.mobile : "",
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-md border border-slate-200/80 shadow-xs space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Create Account
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          রেজিস্ট্রেশন করে আজই শুরু করো তোমার সরকারি চাকরির প্রস্তুতি
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Full Name
          </label>
          <Input
            type="text"
            placeholder="e.g. Abhilash Bera"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Mobile Number
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-sm font-bold text-slate-500">
              +91
            </span>
            <Input
              type="tel"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={formData.mobile}
              onChange={handleMobileChange}
              className="pl-14 text-base font-medium"
              required
            />
          </div>
        </div>

        {/* WhatsApp Number with checkbox */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              WhatsApp Number
            </label>
            <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sameAsMobile}
                onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span>Same as mobile</span>
            </label>
          </div>
          {!formData.sameAsMobile && (
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-sm font-bold text-slate-500">
                +91
              </span>
              <Input
                type="tel"
                maxLength={10}
                placeholder="WhatsApp number"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    whatsapp: e.target.value.replace(/\D/g, ""),
                  }))
                }
                className="pl-14 text-base font-medium"
              />
            </div>
          )}
        </div>

        {/* Target Exam Track */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Target Exam Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {examOptions.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, targetExam: opt }))
                }
                className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all ${
                  formData.targetExam === opt
                    ? "bg-sky-50 border-sky-600 text-sky-700 ring-2 ring-sky-500/20"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* City & Pincode Grid matching 7.png */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              City
            </label>
            <Input
              type="text"
              placeholder="e.g. Kolkata"
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pincode
            </label>
            <Input
              type="text"
              maxLength={6}
              placeholder="e.g. 700006"
              value={formData.pincode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pincode: e.target.value.replace(/\D/g, ""),
                }))
              }
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Create Password
          </label>
          <Input
            type="password"
            placeholder="Minimum 8 characters"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>

        <Button
          type="submit"
          variant="tutopia-blue"
          className="w-full h-12 text-sm font-bold shadow-sm mt-2"
        >
          Create Account
        </Button>
      </form>

      {/* Switch to Login */}
      <div className="pt-4 border-t border-slate-100 text-center text-sm text-slate-600">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-bold text-sky-600 hover:text-sky-700 hover:underline"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
