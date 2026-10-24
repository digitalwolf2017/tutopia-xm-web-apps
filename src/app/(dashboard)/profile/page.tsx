"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MessageCircle,
  MapPin,
  CreditCard,
  KeyRound,
  Edit3,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/auth-context";
import { useMeQuery } from "@/features/auth/api/hooks";

export default function MyProfilePage() {
  const { user } = useAuth();
  const { data: me, isError, refetch } = useMeQuery();

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
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Student Profile
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Verified Student
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Personal contact details, active enrollments, and account settings
            </p>
          </div>
        </div>
      </div>

      {/* Error state alert if API fails */}
      {isError && (
        <div className="flex items-start gap-2.5 p-3 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-md">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">
            Could not fetch latest profile from server. Displaying cached session details.
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="font-bold underline text-amber-900 hover:text-amber-950 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2. Responsive Layout: 2-column on desktop (lg), stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Desktop lg:col-span-4) / Top & Bottom (Mobile) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Avatar & Identity Card */}
          <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 rounded-lg border border-slate-200 shadow-2xs shrink-0 ring-0">
                {profileImage && (
                  <AvatarImage
                    src={profileImage}
                    alt={displayName}
                    className="object-cover rounded-lg"
                  />
                )}
                <AvatarFallback className="bg-sky-50 text-sky-700 font-bold text-lg rounded-lg">
                  {initials || <User className="w-7 h-7 stroke-[2]" />}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {displayName}
                  </h2>
                </div>
                {isSubscribed ? (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-600" />
                    Pro Student
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full inline-flex">
                    Free Explorer
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div className="flex items-center justify-between">
                <span>Student ID:</span>
                <span className="font-semibold text-slate-800">{studentId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Portal Access:</span>
                <span className="font-semibold text-slate-800">Tutopia Exam Web</span>
              </div>
            </div>
          </div>

          {/* Desktop Actions Section (Stacked cleanly on desktop left column) */}
          <div className="hidden lg:flex flex-col space-y-2.5">
            <Link href="/profile/subscriptions" className="block">
              <Button
                variant="tutopia-yellow"
                className="w-full h-10 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-2xs gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Manage Subscriptions & Orders</span>
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-2.5">
              <Link href="/profile/edit" className="block">
                <Button
                  variant="tutopia-blue"
                  className="w-full h-9 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-2xs gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </Button>
              </Link>

              <Link href="/profile/change-password" className="block">
                <Button
                  variant="outline"
                  className="w-full h-9 rounded-lg text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Password</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (Desktop lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Profile Information Fields */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Contact & Residential Details
              </h3>
              <Link href="/profile/edit" className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1">
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <p className="text-sm font-medium text-slate-700">{city}</p>
              </div>

              {/* Pincode */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Pincode
                </label>
                <p className="text-sm font-bold text-slate-900">{pincode}</p>
              </div>

              {/* Address */}
              <div className="space-y-1 sm:col-span-2 pt-2 border-t border-slate-100">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Residential Address
                </label>
                <p className="text-xs text-slate-600 leading-relaxed">{address}</p>
              </div>
            </div>
          </div>

          {/* Active Pass Card (Desktop highlight) */}
          <div className="hidden lg:block bg-gradient-to-r from-sky-700 via-sky-800 to-indigo-900 text-white p-5 rounded-lg shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                  Current Pass Status
                </span>
                <h4 className="text-base font-bold text-white mt-1">
                  {isSubscribed ? "Combined Competitive All-Access Pass" : "Free Explorer Tier"}
                </h4>
              </div>
              <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
            </div>
            <p className="text-xs text-sky-100 leading-relaxed">
              {isSubscribed
                ? "Active access to all live batches, video classes, chapter MCQs, and full-length CBT mock tests."
                : "Free introductory access to syllabus lectures and chapter quizzes. Upgrade to unlock all courses."}
            </p>
          </div>

          {/* Action buttons (Visible on Mobile only - exactly matching Screen 7.png) */}
          <div className="lg:hidden space-y-2.5 pt-1">
            {/* Full-width Yellow Subscriptions Button */}
            <Link href="/profile/subscriptions" className="block">
              <Button
                variant="tutopia-yellow"
                className="w-full h-10 rounded-md text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-2xs gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Manage Subscriptions & Orders</span>
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
      </div>
    </div>
  );
}
