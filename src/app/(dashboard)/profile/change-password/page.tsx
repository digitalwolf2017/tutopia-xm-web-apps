"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePasswordMutation } from "@/features/auth/api/hooks";

export default function ChangePasswordPage() {
  const router = useRouter();
  const changePasswordMutation = useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaved(false);

    if (password.length < 6) {
      setErrorMessage("New password must be at least 6 characters.");
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        old_password: oldPassword,
        password,
        password_confirmation: passwordConfirmation,
      });

      setSaved(true);
      setTimeout(() => {
        router.push("/profile");
      }, 1200);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update password. Please check your current password.";
      setErrorMessage(message);
    }
  };

  const isSubmitting = changePasswordMutation.isPending;

  return (
    <div className="space-y-6 max-w-lg mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Change Password
          </h1>
          <p className="text-xs text-slate-500">
            Ensure your account uses a secure password
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-start gap-2.5 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-800 rounded-md">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      {saved && (
        <div className="flex items-start gap-2.5 p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md">
          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">Password updated successfully! Redirecting...</div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4"
      >
        {/* Current Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-slate-400" />
            New Password
          </label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Confirm New Password
          </label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Re-enter new password"
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="tutopia-blue"
          disabled={isSubmitting}
          className="w-full h-11 text-sm font-bold mt-4 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating Password...
            </>
          ) : saved ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Password Changed!
            </span>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
}
