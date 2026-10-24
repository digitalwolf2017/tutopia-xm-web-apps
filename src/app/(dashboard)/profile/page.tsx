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
  Loader2,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/auth-context";
import { useMeQuery } from "@/features/auth/api/hooks";

export default function MyProfilePage() {
  const { user } = useAuth();
  const { data: me, isLoading, isError, refetch } = useMeQuery();

  // Combine live API response with session user fallback
  const displayName =
    (me && [me.first_name, me.last_name].filter(Boolean).join(" ")) ||
    user?.name ||
    "Student";

  const profileImage = me?.profile_image || user?.profile_image || null;

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const phone = me?.phone || user?.mobile || user?.phone || "Not provided";
  const whatsapp = me?.whatsapp_number || user?.mobile || "Not provided";
  const city = me?.cityName || me?.cityNmae || user?.cityName || user?.city || "Kolkata";
  const pincode = me?.pincode || "700006";
  const address = me?.address || "West Bengal, India";
  const isSubscribed = Boolean(me?.isSubscribed ?? user?.isSubscribed);
  const studentId = me?.id ? `#TUT-2026-${me.id}` : `#TUT-2026-9804`;

  return (
    <div className="space-y-5 w-full max-w-4xl pb-16">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
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

        {/* Live Refresh Button */}
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          title="Refresh profile data"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-md border border-slate-200 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Sync</span>
        </button>
      </div>

      {/* Error state alert if API fails */}
      {isError && (
        <div className="flex items-start gap-2.5 p-3 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-md">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">
            Could not fetch latest profile from server. Displaying cached session details.
          </div>
          <button
            onClick={() => refetch()}
            className="font-bold underline text-amber-900 hover:text-amber-950"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2. Compact Avatar & Header Card */}
      <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14 rounded-md border border-slate-200 shadow-2xs shrink-0 ring-0">
            {profileImage && (
              <AvatarImage
                src={profileImage}
                alt={displayName}
                className="object-cover rounded-md"
              />
            )}
            <AvatarFallback className="bg-sky-50 text-sky-700 font-bold text-lg rounded-md">
              {initials || <User className="w-7 h-7 stroke-[2]" />}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {displayName}
              </h2>
              {isSubscribed ? (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  Pro Student
                </span>
              ) : (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-sm">
                  Free Explorer
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Registered Student ID: {studentId}
            </p>
          </div>
        </div>

        <Link href="/profile/edit" className="hidden sm:block">
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-semibold gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Button>
        </Link>
      </div>

      {/* 3. Profile Information Fields (2-column responsive grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs">
        {/* Mobile */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-slate-400" />
            Mobile Number
          </label>
          <p className="text-sm font-bold text-slate-900">
            {phone.startsWith("+") ? phone : `+91 ${phone}`}
          </p>
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MessageCircle className="w-3 h-3 text-emerald-500" />
            WhatsApp Number
          </label>
          <p className="text-sm font-medium text-slate-700">
            {whatsapp && whatsapp !== "Not provided"
              ? whatsapp.startsWith("+")
                ? whatsapp
                : `+91 ${whatsapp}`
              : "Not provided"}
          </p>
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-slate-400" />
            City / District
          </label>
          <p className="text-sm font-medium text-slate-700">
            {city}
          </p>
        </div>

        {/* Pincode */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Pincode
          </label>
          <p className="text-sm font-bold text-slate-900">
            {pincode}
          </p>
        </div>

        {/* Address */}
        <div className="space-y-1 md:col-span-2 pt-2 border-t border-slate-100">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Residential Address
          </label>
          <p className="text-xs text-slate-600 leading-relaxed">
            {address}
          </p>
        </div>
      </div>

      {/* 4. Action Buttons (Matching reference 7.png) */}
      <div className="space-y-2.5 pt-1">
        {/* Full-width Yellow Subscriptions Button */}
        <Link href="/profile/subscriptions" className="block">
          <Button
            variant="tutopia-yellow"
            className="w-full h-10 rounded-md text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-2xs gap-2 cursor-pointer"
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
              className="w-full h-9 rounded-md text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-2xs gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Button>
          </Link>

          <Link href="/profile/change-password" className="block">
            <Button
              variant="outline"
              className="w-full h-9 rounded-md text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5 cursor-pointer"
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
