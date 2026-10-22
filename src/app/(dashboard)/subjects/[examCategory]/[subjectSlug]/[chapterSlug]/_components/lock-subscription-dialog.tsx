"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Lock, Sparkles, Check, X, ShieldAlert } from "lucide-react";
import { VideoLesson } from "@/lib/mock-data";

interface LockSubscriptionDialogProps {
  lesson: VideoLesson | null;
  chapterName: string;
  onClose: () => void;
}

export function LockSubscriptionDialog({
  lesson,
  chapterName,
  onClose,
}: LockSubscriptionDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!lesson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-lg shadow-2xl overflow-hidden flex flex-col p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon Badge */}
        <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
          Unlock {lesson.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          This premium lecture in <span className="font-semibold text-slate-700">{chapterName}</span> is reserved for enrolled Tutopia Exam subscribers.
        </p>

        {/* Features checklist */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-md p-3.5 my-4 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Full HD video lectures & chapter revision classes</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Downloadable handwritten PDF notes & solution guides</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Chapter-wise MCQ speed drills with TCS iON CBT timer</span>
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="space-y-2 pt-1">
          <Link
            href="/live-classes"
            className="w-full block py-2.5 px-4 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-xs transition-colors"
          >
            Explore Subscription Plans (from ₹1999)
          </Link>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-md text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors cursor-pointer"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
