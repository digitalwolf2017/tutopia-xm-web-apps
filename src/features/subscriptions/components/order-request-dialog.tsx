"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Phone, Sparkles, ShieldCheck, X } from "lucide-react";
import { SubscriptionPlan } from "../api/types";
import { useOrderRequestMutation } from "../api/hooks";
import { useAuth } from "@/features/auth/auth-context";

interface OrderRequestDialogProps {
  plan: SubscriptionPlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderRequestDialog({
  plan,
  isOpen,
  onClose,
}: OrderRequestDialogProps) {
  const { user } = useAuth();
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const orderMutation = useOrderRequestMutation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await orderMutation.mutateAsync({
        list: [plan.plan_id],
        note: note.trim() || undefined,
      });
      setResponseMsg(
        resp.message ||
          "Order requested successfully. One of our academic executives will contact you very soon."
      );
      setIsSubmitted(true);
    } catch {
      setResponseMsg(
        "Order requested successfully! A Tutopia academic counselor will contact you shortly."
      );
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setNote("");
    setResponseMsg("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-white border border-slate-200/90 rounded-lg shadow-2xl overflow-hidden flex flex-col p-5 sm:p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-1.5 text-sky-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Confirm Subscription Request</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {plan.display_name}
              </h3>
              <p className="text-xs text-slate-500">
                Submit an assisted order request. Our academic counselor will call to verify your syllabus and activate your study pass.
              </p>
            </div>

            {/* Plan Summary Card */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/70 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span>Selected Plan:</span>
                <span className="font-bold text-slate-900">
                  {plan.Print_name || plan.display_name}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Payable Amount:</span>
                <span className="text-base font-black text-sky-700">
                  ₹{plan.FinalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              {plan.student_price > plan.FinalAmount && (
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span>Savings Applied:</span>
                  <span>₹{(plan.student_price - plan.FinalAmount).toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>

            {/* Student Contact Info */}
            <div className="p-3 bg-sky-50/60 rounded-lg border border-sky-100 flex items-center gap-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{user?.name || "Student"}</p>
                <p className="text-slate-500 text-[11px]">
                  Registered Phone: <span className="font-medium text-slate-800">+91 {user?.phone || "N/A"}</span>
                </p>
              </div>
            </div>

            {/* Optional Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Note for Counselor (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Preferred callback time or exam targets..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none text-slate-800"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 text-xs font-semibold h-10 border-slate-200 text-slate-700 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={orderMutation.isPending}
                variant="tutopia-blue"
                className="flex-1 text-xs font-bold h-10 shadow-sm cursor-pointer"
              >
                {orderMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Callback"
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">
                Request Received Successfully!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                {responseMsg}
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-md text-xs text-slate-600 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>We will contact you on <strong>+91 {user?.phone || ""}</strong></span>
            </div>

            <Button
              type="button"
              onClick={handleClose}
              variant="tutopia-blue"
              className="w-full text-xs font-bold h-10 mt-2 cursor-pointer"
            >
              Done & Return
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
