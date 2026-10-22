"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  FileCheck2,
  ListOrdered,
  User,
  Settings,
  Sparkles,
  History,
  CreditCard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  const navGroups = [
    {
      heading: "LEARNING",
      links: [
        { label: "Dashboard", href: "/", icon: Home, exact: true },
        { label: "Video Classes", href: "/subjects", icon: BookOpen },
        { label: "Live Batches", href: "/live-classes", icon: Sparkles, badge: "Live" },
      ],
    },
    {
      heading: "PRACTICE & TESTS",
      links: [
        { label: "Mock Tests", href: "/mock-tests", icon: FileCheck2 },
        { label: "Chapter MCQ", href: "/chapter-mcq", icon: ListOrdered },
        { label: "Test History", href: "/mock-tests/history", icon: History },
      ],
    },
    {
      heading: "ACCOUNT",
      links: [
        { label: "My Profile", href: "/profile", icon: User, exact: true },
        { label: "Subscriptions", href: "/profile/subscriptions", icon: CreditCard },
        { label: "Settings & Help", href: "/more", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between w-56 lg:w-60 bg-white border-r border-slate-200/80 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-3 shrink-0 z-30">
      {/* Navigation Sections */}
      <div className="space-y-4 flex-1">
        {navGroups.map((group) => (
          <div key={group.heading} className="space-y-1">
            <span className="px-2.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {group.heading}
            </span>
            <div className="space-y-0.5">
              {group.links.map((link) => {
                const Icon = link.icon;
                const isActive = link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 group",
                      isActive
                        ? "bg-sky-50 text-sky-700 font-bold border-l-2 border-sky-600 shadow-2xs"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isActive
                            ? "text-sky-600 stroke-[2.2]"
                            : "text-slate-400 group-hover:text-slate-600"
                        )}
                      />
                      <span>{link.label}</span>
                    </div>

                    {link.badge && (
                      <span className="text-[9px] uppercase font-bold tracking-wider bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Compact Mini Subscription Card */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-md p-3 my-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
            All-Access Pass
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
        <p className="text-xs font-bold text-slate-800 leading-tight">
          SSC + WBCS Combined
        </p>
        <p className="text-[10px] text-slate-500 font-medium">Valid until Sep 2027</p>
        <Link
          href="/profile/subscriptions"
          className="inline-flex items-center justify-center gap-1 w-full text-center text-[11px] font-bold text-slate-800 bg-amber-400 hover:bg-amber-500 py-1 rounded transition-colors"
        >
          <span>Manage Plan</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Logout Link */}
      <div className="pt-2 border-t border-slate-100">
        <Link
          href="/login"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Switch Account</span>
        </Link>
      </div>
    </aside>
  );
}
