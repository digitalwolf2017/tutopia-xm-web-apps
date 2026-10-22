"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Check,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/auth-context";
import { DUMMY_USERS, DummyUser } from "@/features/auth/dummy-users";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [mobileNumber, setMobileNumber] = useState(DUMMY_USERS[0].mobile);
  const [password, setPassword] = useState(DUMMY_USERS[0].password);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [selectedUser, setSelectedUser] = useState<DummyUser | null>(DUMMY_USERS[0]);

  const handleSelectDummyUser = (dUser: DummyUser, directLogin: boolean) => {
    setSelectedUser(dUser);
    setMobileNumber(dUser.mobile);
    setPassword(dUser.password);

    if (directLogin) {
      login(dUser);
      router.push("/");
      return;
    }

    // Auto-fill OTP boxes if already in OTP step
    setOtpValues(dUser.otp.split(""));
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      // Pre-fill demo OTP for seamless simulation
      const match = DUMMY_USERS.find((u) => u.mobile === mobileNumber);
      const demoOtp = match ? match.otp : "123456";
      setOtpValues(demoOtp.split(""));
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
    const active = selectedUser || mobileNumber;
    login(active);
    router.push("/");
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-md border border-slate-200/80 shadow-xs space-y-5">
      {/* 1. Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          লগ ইন করে তোমার পরীক্ষার প্রস্তুতি চালিয়ে যাও
        </p>
      </div>

      {/* 2. Dummy User Simulation Selector */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Simulate Demo Users</span>
          </div>
          <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-1.5 py-0.5 rounded">
            Quick 1-Click
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">
          Choose a simulated student account to auto-fill or log in directly:
        </p>

        <div className="space-y-1.5">
          {DUMMY_USERS.map((dUser) => {
            const isSelected = selectedUser?.id === dUser.id;
            return (
              <div
                key={dUser.id}
                className={`p-2 rounded-md border transition-all text-xs flex items-center justify-between gap-2 ${
                  isSelected
                    ? "bg-sky-50/80 border-sky-300 ring-1 ring-sky-400"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="min-w-0 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700 shrink-0">
                    {dUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-900 truncate">
                        {dUser.name}
                      </span>
                      <span
                        className={`text-[9px] font-semibold px-1 py-0.2 rounded border ${dUser.badgeColor}`}
                      >
                        {dUser.badge}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      +91 {dUser.mobile} • {dUser.targetExam}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelectDummyUser(dUser, false)}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Fill into form"
                  >
                    Fill
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDummyUser(dUser, true)}
                    className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                    title="Log in immediately as this user"
                  >
                    <span>Login</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Login Tabs: OTP & Password */}
      <Tabs defaultValue="otp" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
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
                    onChange={(e) =>
                      setMobileNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter 10-digit mobile number"
                    className="pl-14 text-base font-medium"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="tutopia-blue"
                className="w-full h-11 text-sm font-bold shadow-sm cursor-pointer"
              >
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-xs text-slate-500">
                  Enter 6-digit OTP sent to{" "}
                  <strong className="text-slate-800">+91 {mobileNumber}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-xs text-sky-600 font-bold hover:underline cursor-pointer"
                >
                  Change Number
                </button>
              </div>

              {/* Demo OTP Helper */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-md px-3 py-1.5 text-xs text-emerald-800">
                <span className="text-[11px]">
                  Simulation Code: <strong>{selectedUser?.otp || "123456"}</strong>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setOtpValues((selectedUser?.otp || "123456").split(""))
                  }
                  className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>

              {/* 6 Box OTP Inputs */}
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-10 sm:w-12 h-11 sm:h-12 text-center text-lg sm:text-xl font-bold rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Didn&apos;t receive code?</span>
                <button
                  type="button"
                  className="font-bold text-sky-600 hover:underline cursor-pointer"
                  disabled={timer > 0}
                >
                  Resend OTP ({timer}s)
                </button>
              </div>

              <Button
                type="submit"
                variant="tutopia-blue"
                className="w-full h-11 text-sm font-bold shadow-sm cursor-pointer"
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
                  onChange={(e) =>
                    setMobileNumber(e.target.value.replace(/\D/g, ""))
                  }
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
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
              className="w-full h-11 text-sm font-bold shadow-sm cursor-pointer"
            >
              Log In
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      {/* Switch to Register */}
      <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
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
