"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/auth-context";
import {
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/features/auth/api/hooks";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { setSession } = useAuth();

  const [mobileNumber, setMobileNumber] = useState(
    searchParams.get("phone") || ""
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [apiError, setApiError] = useState<string | null>(null);

  // TanStack Query Mutations
  const sendOtpMutation = useSendOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();
  const loginMutation = useLoginMutation();

  // 60-second OTP countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpSent, timer]);

  // 1. Send OTP (Live API)
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (mobileNumber.length < 10) {
      setApiError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      await sendOtpMutation.mutateAsync({
        phone: mobileNumber,
        device_token: "",
      });

      setOtpSent(true);
      setTimer(60);
      setOtpValues(["", "", "", "", "", ""]);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to send OTP. Please try again.";
      setApiError(message);
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

  // 2. Verify OTP (Live API)
  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const enteredOtp = otpValues.join("");
    if (enteredOtp.length < 4) {
      setApiError("Please enter the complete OTP");
      return;
    }

    try {
      const res = await verifyOtpMutation.mutateAsync({
        phone: mobileNumber,
        otp: enteredOtp,
        device_token: "",
      });

      const token = res?.token || (res as unknown as { data?: { token?: string } })?.data?.token;
      const userProfile = res?.data || (res as unknown as { user?: typeof res.data })?.user;

      if (token && userProfile) {
        setSession(token, userProfile);
        router.push(redirectPath);
      } else {
        setApiError("Authentication response missing user session.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid OTP. Please check and try again.";
      setApiError(message);
    }
  };

  // 3. Password Login (Live API)
  const handlePasswordLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!mobileNumber || !password) {
      setApiError("Please enter your mobile number and password.");
      return;
    }

    try {
      const isEmail = mobileNumber.includes("@");
      const res = await loginMutation.mutateAsync({
        phone: isEmail ? "" : mobileNumber,
        email: isEmail ? mobileNumber : "",
        password,
        device_token: "",
      });

      const token = res?.token || (res as unknown as { data?: { token?: string } })?.data?.token;
      const userProfile = res?.data || (res as unknown as { user?: typeof res.data })?.user;

      if (token && userProfile) {
        setSession(token, userProfile);
        router.push(redirectPath);
      } else {
        setApiError("Authentication response missing user session.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid mobile number or password.";
      setApiError(message);
    }
  };

  const isSubmitting =
    sendOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    loginMutation.isPending;

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

      {/* 2. Error Banner */}
      {apiError && (
        <div className="flex items-start gap-2 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-800 rounded-md">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{apiError}</div>
        </div>
      )}

      {/* 3. Login Tabs: Phone OTP & Password */}
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
                disabled={isSubmitting || mobileNumber.length < 10}
                className="w-full h-11 text-sm font-bold shadow-sm cursor-pointer"
              >
                {sendOtpMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-xs text-slate-500">
                  Enter 6-digit OTP sent to{" "}
                  <strong className="text-slate-800">+91 {mobileNumber}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setApiError(null);
                  }}
                  className="text-xs text-sky-600 font-bold hover:underline cursor-pointer"
                >
                  Change Number
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
                  onClick={handleSendOtp}
                  className="font-bold text-sky-600 hover:underline cursor-pointer disabled:text-slate-400 disabled:no-underline"
                  disabled={timer > 0 || sendOtpMutation.isPending}
                >
                  {timer > 0 ? `Resend OTP (${timer}s)` : "Resend OTP"}
                </button>
              </div>

              <Button
                type="submit"
                variant="tutopia-blue"
                disabled={isSubmitting || otpValues.join("").length < 4}
                className="w-full h-11 text-sm font-bold shadow-sm cursor-pointer"
              >
                {verifyOtpMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>
            </form>
          )}
        </TabsContent>

        {/* Tab 2: Password Login */}
        <TabsContent value="password" className="space-y-4">
          <form onSubmit={handlePasswordLoginSubmit} className="space-y-4">
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
              disabled={isSubmitting || !mobileNumber || !password}
              className="w-full h-11 text-sm font-bold shadow-sm cursor-pointer"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
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
