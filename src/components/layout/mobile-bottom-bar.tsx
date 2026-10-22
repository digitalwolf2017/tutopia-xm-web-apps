"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomBar() {
  const pathname = usePathname();

  // Determine active tab index (0: Home, 1: Live Classes, 2: More)
  let activeIndex = 0;
  if (pathname.startsWith("/live-classes")) {
    activeIndex = 1;
  } else if (
    pathname.startsWith("/more") ||
    pathname.startsWith("/profile")
  ) {
    activeIndex = 2;
  } else {
    activeIndex = 0;
  }

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      index: 0,
    },
    {
      label: "Live Classes",
      href: "/live-classes",
      icon: BookOpen,
      index: 1,
      badge: "LIVE",
    },
    {
      label: "More",
      href: "/more",
      icon: LayoutGrid,
      index: 2,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-6 max-w-sm sm:max-w-md mx-auto z-50">
      <div className="relative bg-white/92 backdrop-blur-xl border border-slate-200/90 rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.05)] p-1.5 ring-1 ring-black/[0.03]">
        {/* Top Sliding Accent Glow Line */}
        <div className="absolute -top-[1.5px] left-1.5 right-1.5 pointer-events-none">
          <div
            className="w-1/3 flex justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          >
            <div className="w-8 h-[2.5px] bg-sky-600 rounded-full shadow-[0_1px_6px_rgba(2,132,199,0.5)]" />
          </div>
        </div>

        {/* Sliding Active Pill Spotlight Background */}
        <div className="absolute inset-y-1.5 left-1.5 right-1.5 pointer-events-none">
          <div
            className="w-1/3 h-full p-0.5 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          >
            <div className="w-full h-full bg-sky-50 border border-sky-100/90 rounded-lg shadow-2xs" />
          </div>
        </div>

        {/* Navigation Items Grid */}
        <div className="relative grid grid-cols-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeIndex === item.index;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative z-10 flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-transform duration-150 active:scale-95 select-none",
                  isActive
                    ? "text-sky-600"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <div
                  className={cn(
                    "relative transition-transform duration-300 ease-out",
                    isActive ? "-translate-y-0.5 scale-110" : "scale-100"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive
                        ? "stroke-[2.4] text-sky-600 drop-shadow-2xs"
                        : "stroke-[1.8] text-slate-500"
                    )}
                  />

                  {/* Pulsing indicator if item has badge and is not active */}
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                    </span>
                  )}
                </div>

                <span
                  className={cn(
                    "text-[10px] leading-tight mt-0.5 tracking-tight transition-all duration-200",
                    isActive
                      ? "font-bold text-sky-700 scale-105"
                      : "font-medium text-slate-500"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
