"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Home,
  ArrowLeft,
  FileQuestion,
  BookOpen,
  Video,
  Radio,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutopiaLogoBulbSvg } from "@/components/common/tutopia-loader";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo-new.svg"
            alt="Tutopia Exam"
            width={130}
            height={36}
            className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>
        <Link
          href="/more/report-issue"
          className="text-xs font-semibold text-slate-500 hover:text-sky-600 flex items-center gap-1.5 transition-colors"
        >
          <LifeBuoy className="w-3.5 h-3.5 text-slate-400" />
          <span>Need Help?</span>
        </Link>
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-2xl mx-auto w-full text-center">
        {/* Animated Brand Bulb with 404 Accent */}
        <div className="relative mb-6 flex flex-col items-center">
          {/* Subtle Ambient Background Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-amber-100/60 blur-2xl pointer-events-none" />

          {/* Logo Bulb */}
          <div className="relative">
            <TutopiaLogoBulbSvg size={96} />
          </div>

          {/* 404 Pill Badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 font-extrabold text-xs tracking-wider uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            Error 404 • Not Found
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Page Not Found / পৃষ্ঠাটি পাওয়া যায়নি
        </h1>

        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
          The page or exam syllabus you are looking for might have been moved, renamed,
          or is temporarily unavailable. Let&apos;s get you back on track!
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mb-10">
          <Button
            asChild
            className="w-full sm:w-auto bg-[#0074C8] hover:bg-[#0062a8] text-white font-semibold shadow-sm h-10 px-5 gap-2"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              <span>Go to Home / হোম পেজ</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold h-10 px-5 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back / পূর্ববর্তী পৃষ্ঠা</span>
          </Button>
        </div>

        {/* Helpful Shortcut Destinations */}
        <div className="w-full bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs text-left">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            Popular Learning Sections
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <Link
              href="/mock-tests"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FileQuestion className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 group-hover:text-sky-700 truncate">
                  Mock Tests
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Practice CBT series
                </div>
              </div>
            </Link>

            <Link
              href="/subjects"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 group-hover:text-sky-700 truncate">
                  Video Courses
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Chapter playlists
                </div>
              </div>
            </Link>

            <Link
              href="/live-classes"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Radio className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 group-hover:text-sky-700 truncate">
                  Live Classes
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Interactive batches
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-slate-200/80 bg-white text-[11px] text-slate-500">
        Tutopia Exam &copy; {new Date().getFullYear()} • চাকরির সেরা প্রস্তুতি
      </footer>
    </div>
  );
}
