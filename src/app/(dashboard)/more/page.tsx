"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  AlertTriangle,
  FileText,
  Bell,
  Search,
  ChevronRight,
  LogOut,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MoreSettingsPage() {
  const menuItems = [
    {
      label: "My profile",
      description: "Manage personal contact and registration information",
      href: "/profile",
      icon: User,
    },
    {
      label: "Report an issue",
      description: "Submit a support ticket for questions or video playback",
      href: "/more/report-issue",
      icon: AlertTriangle,
    },
    {
      label: "Terms & condition",
      description: "Platform usage policies, privacy and subscription guidelines",
      href: "/more/terms",
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-6 w-full max-w-2xl pb-16">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">More & Settings</h1>
          <p className="text-xs text-slate-500">Student account settings and support center</p>
        </div>
      </div>

      {/* 2. Menu Items List */}
      <div className="divide-y divide-slate-100 bg-white rounded-md border border-slate-200/80 shadow-2xs overflow-hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-slate-50 flex items-center justify-center text-slate-600 group-hover:text-sky-600 group-hover:bg-sky-50 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-sky-600 transition-colors block">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {item.description}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-sky-600 transition-transform" />
            </Link>
          );
        })}
      </div>

      {/* 3. Center Logout & App Version */}
      <div className="pt-8 text-center space-y-2">
        <Link href="/login" className="inline-block">
          <Button
            variant="outline"
            className="rounded-md px-6 h-8 border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 transition-all font-semibold text-xs"
          >
            Logout
          </Button>
        </Link>
        <p className="text-[11px] text-slate-400 font-medium">Tutopia Exam Web • Version 1.0</p>
      </div>
    </div>
  );
}
