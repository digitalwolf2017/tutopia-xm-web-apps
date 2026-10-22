"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  CreditCard,
  KeyRound,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockCurrentUser } from "@/lib/mock-data";

export default function MyProfilePage() {
  return (
    <div className="space-y-5 w-full max-w-4xl pb-16">
      {/* 1. Header */}
      <div className="flex items-center gap-2.5 pb-1 border-b border-slate-200/60">
        <Link
          href="/"
          className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            Student Profile
          </h1>
          <p className="text-xs text-slate-500">
            Personal contact details and active exam enrollments
          </p>
        </div>
      </div>

      {/* 2. Compact Avatar & Header Card */}
      <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs flex items-center gap-4">
        <div className="w-14 h-14 rounded-md border border-slate-200 bg-sky-50 flex items-center justify-center text-sky-700 shadow-2xs shrink-0">
          <User className="w-7 h-7 stroke-[2]" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {mockCurrentUser.name}
            </h2>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-sm">
              {mockCurrentUser.targetExam}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Registered Student ID: #TUT-2026-9804
          </p>
        </div>
      </div>

      {/* 3. Profile Information Fields (2-column responsive grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs">
        {/* Mobile */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Mobile Number
          </label>
          <p className="text-sm font-bold text-slate-900">
            +91 {mockCurrentUser.mobile}
          </p>
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            WhatsApp Number
          </label>
          <p className="text-sm font-medium text-slate-700">
            +91 {mockCurrentUser.whatsapp || "Not provided"}
          </p>
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            City / District
          </label>
          <p className="text-sm font-medium text-slate-700">
            {mockCurrentUser.city || "Not provided"}
          </p>
        </div>

        {/* Pincode */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Pincode
          </label>
          <p className="text-sm font-bold text-slate-900">
            {mockCurrentUser.pincode}
          </p>
        </div>

        {/* Address */}
        <div className="space-y-1 md:col-span-2 pt-2 border-t border-slate-100">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Residential Address
          </label>
          <p className="text-xs text-slate-600 leading-relaxed">
            {mockCurrentUser.address || "Not provided"}
          </p>
        </div>
      </div>

      {/* 4. Action Buttons (Compact, rounded-md) */}
      <div className="space-y-2.5 pt-1">
        {/* Full-width Yellow Subscriptions Button */}
        <Link href="/profile/subscriptions" className="block">
          <Button
            variant="tutopia-yellow"
            className="w-full h-10 rounded-md text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-2xs gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Manage Subscriptions & Plans</span>
          </Button>
        </Link>

        {/* Dual Grid Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <Link href="/profile/edit" className="block">
            <Button
              variant="tutopia-blue"
              className="w-full h-9 rounded-md text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-2xs gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Button>
          </Link>

          <Link href="/profile/change-password" className="block">
            <Button
              variant="outline"
              className="w-full h-9 rounded-md text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
