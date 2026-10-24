"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  AlertTriangle,
  FileText,
  ChevronRight,
  CreditCard,
  KeyRound,
  Shield,
  HelpCircle,
} from "lucide-react";

export default function MoreSettingsPage() {
  const menuItems = [
    {
      label: "My profile",
      description: "Manage personal contact and registration information",
      href: "/profile",
      icon: User,
      badge: "Account",
    },
    {
      label: "Subscriptions & Orders",
      description: "Manage active study passes, packages, and credit wallet",
      href: "/profile/subscriptions",
      icon: CreditCard,
      badge: "Billing",
    },
    {
      label: "Change Password",
      description: "Update your account login security and credentials",
      href: "/profile/change-password",
      icon: KeyRound,
      badge: "Security",
    },
    {
      label: "Report an issue",
      description: "Submit a support ticket for questions or video playback",
      href: "/more/report-issue",
      icon: AlertTriangle,
      badge: "Support",
    },
    {
      label: "Terms & condition",
      description: "Platform usage policies, privacy and subscription guidelines",
      href: "/more/terms",
      icon: FileText,
      badge: "Legal",
    },
  ];

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">More & Settings</h1>
          <p className="text-xs text-slate-500">Student account settings, support center, and policies</p>
        </div>
      </div>

      {/* 2. Menu Items - Responsive Full-Width Grid on Desktop, Clean Cards on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="p-5 bg-white rounded-lg border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-sky-300 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {item.badge}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 group-hover:text-sky-600 transition-all" />
                </div>
              </div>

              <div className="pt-4 space-y-1">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
