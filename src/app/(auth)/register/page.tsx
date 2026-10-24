"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  User,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/auth-context";
import {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/features/auth/api/hooks";
import { authEndpoints } from "@/features/auth/api/endpoints";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { setSession } = useAuth();

  // Multi-step registration flow: "details" -> "otp"
  const [step, setStep] = useState<"details" | "otp">("details");

  // Step 1: User info
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  // Step 2: OTP verification
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  // Status feedback
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mutations
  const registerMutation = useRegisterMutation();
  const sendOtpMutation = useSendOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  // 60-second OTP countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  // Handle phone number input (numeric only, max 10 digits)
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setMobile(val);
  };

  // Step 1: Submit Name & Phone -> Register & Trigger OTP
  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 2) {
      setApiError("Please enter your full name.");
      return;
    }

    if (mobile.length !== 10) {
      setApiError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      // 1. Pre-check if phone is already registered
      try {
        await authEndpoints.checkPhoneUnique(mobile);
      } catch (err: unknown) {
        // If unique check explicitly indicates phone already exists
        const msg =
          err instanceof Error
            ? err.message
            : "This phone number is already registered.";
        if (
          msg.toLowerCase().includes("already") ||
          msg.toLowerCase().includes("exists") ||
          msg.toLowerCase().includes("taken")
        ) {
          setApiError(`${msg} Please log in with your phone.`);
          return;
        }
      }

      // 2. Call Register API with Name and Phone
      await registerMutation.mutateAsync({
        name: cleanName,
        phone: mobile,
        device_token: "",
      });

      // 3. Dispatch OTP to the phone number
      await sendOtpMutation.mutateAsync({
        phone: mobile,
        device_token: "",
      });

      // Transition to OTP step
      setStep("otp");
      setTimer(60);
      setOtpValues(["", "", "", "", "", ""]);
      setSuccessMessage(`OTP sent successfully to +91 ${mobile}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please check your details and try again.";
      setApiError(message);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (timer > 0 || sendOtpMutation.isPending) return;
    setApiError(null);

    try {
      await sendOtpMutation.mutateAsync({
        phone: mobile,
        device_token: "",
      });
      setTimer(60);
      setSuccessMessage(`A new OTP has been sent to +91 ${mobile}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to resend OTP. Please try again.";
      setApiError(message);
    }
  };

  // OTP 6-box input handling
  const handleOtpChange = (index: number, value: string) => {
    // Handle paste of full 6-digit code
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      if (digits.length > 0) {
        const newOtp = [...otpValues];
        digits.forEach((d, i) => {
          if (index + i < 6) newOtp[index + i] = d;
        });
        setOtpValues(newOtp);
        const nextIndex = Math.min(index + digits.length, 5);
        document.getElementById(`reg-otp-${nextIndex}`)?.focus();
        return;
      }
    }

    const cleanChar = value.replace(/\D/g, "");
    const newOtp = [...otpValues];
    newOtp[index] = cleanChar;
    setOtpValues(newOtp);

    // Auto-focus next input
    if (cleanChar && index < 5) {
      document.getElementById(`reg-otp-${index + 1}`)?.focus();
    }
  };

  // Handle backspace navigation across OTP boxes
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      document.getElementById(`reg-otp-${index - 1}`)?.focus();
    }
  };

  // Step 2: Verify OTP & Establish Session
  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    const enteredOtp = otpValues.join("");
    if (enteredOtp.length < 4) {
      setApiError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      const res = await verifyOtpMutation.mutateAsync({
        phone: mobile,
        otp: enteredOtp,
        device_token: "",
      });

      const token =
        res?.token || (res as unknown as { data?: { token?: string } })?.data?.token;
      const userProfile =
        res?.data || (res as unknown as { user?: typeof res.data })?.user;

      if (token && userProfile) {
        setSession(token, userProfile);
        setSuccessMessage("Account verified successfully! Redirecting to dashboard...");

        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      } else {
        setApiError("Authentication response missing user session.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid or expired OTP. Please check and try again.";
      setApiError(message);
    }
  };

  const isSubmitting =
    registerMutation.isPending ||
    sendOtpMutation.isPending ||
    verifyOtpMutation.isPending;

  return (
    <div className="bg-white p-6 sm:p-7 rounded-md border border-slate-200/80 shadow-xs space-y-5">
      {/* Step Header */}
      {step === "details" ? (
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            রেজিস্ট্রেশন করে আজই শুরু করো তোমার সরকারি চাকরির প্রস্তুতি
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              setStep("details");
              setApiError(null);
              setSuccessMessage(null);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors cursor-pointer -ml-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Details</span>
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Verify Mobile
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Enter the 6-digit OTP sent to{" "}
              <strong className="text-slate-800 font-bold">+91 {mobile}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {apiError && (
        <div className="flex items-start gap-2.5 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-800 rounded-md">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium leading-relaxed">
            {apiError}
            {apiError.toLowerCase().includes("already registered") && (
              <div className="mt-1.5">
                <Link
                  href={`/login?phone=${encodeURIComponent(mobile)}`}
                  className="font-bold text-sky-700 underline hover:text-sky-900"
                >
                  Click here to Log In with this number &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Alert */}
      {successMessage && (
        <div className="flex items-start gap-2.5 p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium leading-relaxed">
            {successMessage}
          </div>
        </div>
      )}

      {/* STEP 1: Name and Phone Input */}
      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Full Name
            </label>
            <Input
              type="text"
              placeholder="e.g. Abhilash Bera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 text-base font-medium"
              disabled={isSubmitting}
              required
              autoFocus
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
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
                value={mobile}
                onChange={handleMobileChange}
                disabled={isSubmitting}
                className="pl-14 h-11 text-base font-medium tracking-wide"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400">
              We will send a 6-digit verification code to this number.
            </p>
          </div>

          <Button
            type="submit"
            variant="tutopia-blue"
            disabled={isSubmitting || mobile.length !== 10 || !name.trim()}
            className="w-full h-12 text-sm font-bold shadow-sm mt-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending OTP...
              </>
            ) : (
              "Continue & Verify OTP"
            )}
          </Button>
        </form>
      )}

      {/* STEP 2: OTP Verification Form */}
      {step === "otp" && (
        <form onSubmit={handleVerifyOtpSubmit} className="space-y-5">
          <div className="space-y-3">
            {/* 6 Box OTP Inputs */}
            <div className="flex justify-between gap-1.5 sm:gap-2">
              {otpValues.map((digit, idx) => (
                <input
                  key={idx}
                  id={`reg-otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  disabled={isSubmitting}
                  className="w-10 sm:w-12 h-12 text-center text-lg sm:text-xl font-bold rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all disabled:opacity-50"
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            {/* Countdown & Resend */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Didn&apos;t receive code?</span>
              <button
                type="button"
                onClick={handleResendOtp}
                className="font-bold text-sky-600 hover:underline cursor-pointer disabled:text-slate-400 disabled:no-underline"
                disabled={timer > 0 || sendOtpMutation.isPending}
              >
                {timer > 0 ? `Resend OTP (${timer}s)` : "Resend OTP"}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="tutopia-blue"
            disabled={isSubmitting || otpValues.join("").length < 4}
            className="w-full h-12 text-sm font-bold shadow-sm cursor-pointer"
          >
            {verifyOtpMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying Account...
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Verify & Start Learning
              </span>
            )}
          </Button>
        </form>
      )}

      {/* Footer Switch to Login */}
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
