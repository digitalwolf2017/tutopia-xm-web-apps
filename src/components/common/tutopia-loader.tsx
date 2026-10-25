import React from "react";
import { cn } from "@/lib/utils";

export interface TutopiaLoaderProps {
  /**
   * sm: 36px logo bulb
   * md: 60px logo bulb
   * lg: 84px logo bulb
   * fullscreen: centered minimal viewport loader
   */
  size?: "sm" | "md" | "lg" | "fullscreen";
  className?: string;
  label?: string;
  subLabel?: string;
}

/**
 * Tutopia Logo-Style Animated SVG Bulb.
 * - Completely clean vector (no fuzzy circular glow or blurry halos)
 * - Animated SVG borderline tracing smoothly around the bulb contour
 * - Official vibrant golden-yellow bulb body (#FFC107)
 * - 5 radiating pill/capsule rays
 * - Upper-left white specular shine crescent arc and highlight dot
 * - Gentle floating bob
 */
export function TutopiaLogoBulbSvg({
  className,
  size = 76,
}: {
  className?: string;
  size?: number;
}) {
  // Symmetrical contour starting at the bottom center and tracing clockwise
  const bulbContourPath =
    "M 60 103 C 52 103, 48 99.5, 48 95 L 48 82 C 40 76, 31 66, 31 54 C 31 38, 44 25, 60 25 C 76 25, 89 38, 89 54 C 89 66, 80 76, 72 82 L 72 95 C 72 99.5, 68 103, 60 103 Z";

  return (
    <div
      className={cn("relative inline-flex items-center justify-center select-none", className)}
      style={{ width: size, height: size * 1.05 }}
    >
      <svg
        viewBox="0 0 120 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-bulb-float overflow-visible"
      >
        <defs>
          {/* Vibrant Brand Yellow Gradient matching logo */}
          <linearGradient id="tutopia-logo-yellow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="65%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>

          {/* Dynamic Animated Borderline Stroke Gradient */}
          <linearGradient id="tutopia-borderline-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* 1. Exactly 5 Radiating Rays (Staggered Wave Animation) */}
        <g stroke="#FFC107" strokeWidth="4.75" strokeLinecap="round">
          {/* Ray 1: Far Left (~20° from horizontal) */}
          <line x1="33" y1="41" x2="22" y2="35" className="animate-ray-1" />

          {/* Ray 2: Mid Left (~50°) */}
          <line x1="45" y1="26" x2="38" y2="15" className="animate-ray-2" />

          {/* Ray 3: Top Center (90° vertical) */}
          <line x1="60" y1="18" x2="60" y2="6" className="animate-ray-3" />

          {/* Ray 4: Mid Right (~130°) */}
          <line x1="75" y1="26" x2="82" y2="15" className="animate-ray-4" />

          {/* Ray 5: Far Right (~160°) */}
          <line x1="87" y1="41" x2="98" y2="35" className="animate-ray-5" />
        </g>

        {/* 2. Solid Vibrant Brand Yellow Bulb Body */}
        <path
          d={bulbContourPath}
          fill="url(#tutopia-logo-yellow)"
        />

        {/* 3. Logo Signature Specular Shine: Upper-Left White Crescent Arc + Highlight Dot */}
        <g className="animate-shimmer">
          {/* Crescent Arc */}
          <path
            d="M 43 53 C 43 43, 49 36, 58 36"
            stroke="#FFFFFF"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          {/* Specular Highlight Dot */}
          <circle cx="42" cy="61" r="2.2" fill="#FFFFFF" />
        </g>

        {/* 4. Static Base Track Borderline (Clean outline) */}
        <path
          d={bulbContourPath}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* 5. Active Animated Running Borderline (Smooth path tracing) */}
        <path
          d={bulbContourPath}
          pathLength={100}
          fill="none"
          stroke="url(#tutopia-borderline-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bulb-border"
        />
      </svg>
    </div>
  );
}

/**
 * Tutopia Loader Component - Pure Minimal Animated Bulb with Running Borderline.
 */
export function TutopiaLoader({
  size = "md",
  className,
  label,
}: TutopiaLoaderProps) {
  const getPixelSize = () => {
    switch (size) {
      case "sm":
        return 32;
      case "lg":
        return 80;
      case "fullscreen":
        return 88;
      case "md":
      default:
        return 52;
    }
  };

  const pixelSize = getPixelSize();

  if (size === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white select-none">
        <TutopiaLogoBulbSvg size={pixelSize} />
        {label && (
          <span className="text-xs font-semibold text-slate-600 tracking-tight">{label}</span>
        )}
      </div>
    );
  }

  // Inline / Section Loader
  return (
    <div className={cn("inline-flex flex-col items-center justify-center gap-2", className)}>
      <TutopiaLogoBulbSvg size={pixelSize} />
      {label && (
        <span className="text-xs font-semibold text-slate-600 tracking-tight">{label}</span>
      )}
    </div>
  );
}

/** Backward compatibility exports & aliases */
export const TutopiaBulbSvg = TutopiaLogoBulbSvg;
export const BulbLoader = TutopiaLoader;
