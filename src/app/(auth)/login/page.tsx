"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function LoginPage() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("9734341856");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login and redirect to home
    router.push("/");
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-md border border-slate-200/80 shadow-xs space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          লগ ইন করে তোমার পরীক্ষার প্রস্তুতি চালিয়ে যাও
        </p>
      </div>

      <Tabs defaultValue="otp" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="otp">Phone OTP</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        {/* Tab 1: OTP Login */}
        <TabsContent value="otp" className="space-y-4">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
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
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit mobile number"
                    className="pl-14 text-base font-medium"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="tutopia-blue"
                className="w-full h-12 text-sm font-bold shadow-sm"
              >
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="text-center space-y-1">
                <p className="text-xs text-slate-500">
                  Enter 6-digit OTP sent to{" "}
                  <strong className="text-slate-800">+91 {mobileNumber}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-xs text-sky-600 font-bold hover:underline"
                >
                  Change Number
                </button>
              </div>

              {/* 6 Box OTP Inputs */}
              <div className="flex justify-between gap-2">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-13 text-center text-xl font-bold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Didn&apos;t receive code?</span>
                <button
                  type="button"
                  className="font-bold text-sky-600 hover:underline"
                  disabled={timer > 0}
                >
                  Resend OTP ({timer}s)
                </button>
              </div>

              <Button
                type="submit"
                variant="tutopia-blue"
                className="w-full h-12 text-sm font-bold shadow-sm"
              >
                Verify & Continue
              </Button>
            </form>
          )}
        </TabsContent>

        {/* Tab 2: Password Login */}
        <TabsContent value="password" className="space-y-4">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit mobile number"
                  className="pl-14 text-base font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-sky-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="tutopia-blue"
              className="w-full h-12 text-sm font-bold shadow-sm"
            >
              Log In
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      {/* Switch to Register */}
      <div className="pt-4 border-t border-slate-100 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-sky-600 hover:text-sky-700 hover:underline"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
