import React from "react";
import { cn } from "@/lib/utils";

export interface TutopiaLoaderProps {
  size?: "sm" | "md" | "lg" | "fullscreen";
  label?: string;
  className?: string;
}

export function TutopiaLoader({
  size = "md",
  label = "লোড হচ্ছে...",
  className,
}: TutopiaLoaderProps) {
  const getDimensions = () => {
    switch (size) {
      case "sm":
        return { box: "w-4 h-4", stroke: 3 };
      case "lg":
      case "fullscreen":
        return { box: "w-12 h-12", stroke: 2.5 };
      case "md":
      default:
        return { box: "w-7 h-7", stroke: 2.8 };
    }
  };

  const { box, stroke } = getDimensions();

  const svgContent = (
    <div className={cn("relative inline-flex items-center justify-center", box, className)}>
      <svg
        className="w-full h-full animate-spin"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tutopia-loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Outer Background Track */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-slate-100"
        />

        {/* Active Animated Gradient Arc */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="url(#tutopia-loader-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset="45"
          className="transition-all"
        />
      </svg>

      {/* Central Inner Pulsing Emblem */}
      {size !== "sm" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-80" />
        </div>
      )}
    </div>
  );

  if (size === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/95 border border-slate-200/80 shadow-lg">
          {svgContent}
          <div className="text-center">
            <p className="text-xs font-bold text-slate-800 tracking-wide uppercase">
              Tutopia Exam
            </p>
            {label && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return svgContent;
}
