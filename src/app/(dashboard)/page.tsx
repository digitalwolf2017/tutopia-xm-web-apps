"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ListChecks,
  MessageSquare,
  ChevronRight,
  BookOpen,
  PieChart,
  Landmark,
  Lightbulb,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  mockPromoBanners,
  mockVideoClassCategories,
  mockLiveBatches,
} from "@/lib/mock-data";

export default function HomePage() {
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  // Auto-advance banner every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % mockPromoBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeBanner = mockPromoBanners[activeBannerIdx];

  // Map category icons with compact styling
  const renderCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case "book-gear":
        return (
          <div className="w-10 h-10 rounded-md bg-sky-50 flex items-center justify-center text-sky-600 mb-2.5 transition-transform group-hover:scale-105">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "charts":
        return (
          <div className="w-10 h-10 rounded-md bg-amber-50 flex items-center justify-center text-amber-600 mb-2.5 transition-transform group-hover:scale-105">
            <PieChart className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "bank":
        return (
          <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2.5 transition-transform group-hover:scale-105">
            <Landmark className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "lightbulb":
        return (
          <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2.5 transition-transform group-hover:scale-105">
            <Lightbulb className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "single-bulb":
      default:
        return (
          <div className="w-10 h-10 rounded-md bg-sky-50 flex items-center justify-center text-sky-600 mb-2.5 transition-transform group-hover:scale-105">
            <Sparkles className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-5 w-full">
      {/* 1. Compact Promotional Carousel Banner */}
      <div className="relative overflow-hidden rounded-lg shadow-2xs border border-slate-200/80 bg-white">
        <div
          className={`relative p-5 sm:p-6 bg-gradient-to-r ${activeBanner.bgGradient} text-white transition-all duration-500`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="inline-block bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded shadow-2xs">
                {activeBanner.highlightText}
              </span>
              <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white leading-snug">
                {activeBanner.title}
              </h2>
              <p className="text-xs text-sky-100 font-medium flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                {activeBanner.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={activeBanner.ctaLink}
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-md shadow-xs text-xs transition-transform active:scale-95"
              >
                <span>{activeBanner.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Compact Banner Dots */}
        <div className="py-2 bg-white flex justify-center items-center gap-1.5">
          {mockPromoBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBannerIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-200 ${
                activeBannerIdx === idx
                  ? "w-6 h-1.5 rounded-full bg-sky-600"
                  : "w-1.5 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Quick Action Cards (Compact, rounded-md, no clunky borders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Card 1: Chapter wise MCQ */}
        <Link
          href="/chapter-mcq"
          className="flex items-center justify-between p-3.5 sm:p-4 bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-white/15 flex items-center justify-center text-white">
              <ListChecks className="w-4 h-4 stroke-[2.4]" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide block">
                Chapter wise MCQ
              </span>
              <span className="text-[11px] text-sky-100 font-normal">
                Subject-by-subject practice quizzes & answers
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-sky-200 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Card 2: Competitive Exam Explorer */}
        <Link
          href="/subjects/ssc-rail-wbcs"
          className="flex items-center justify-between p-3.5 sm:p-4 bg-white hover:bg-slate-50 text-slate-800 rounded-md border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-sky-50 flex items-center justify-center text-sky-600">
              <MessageSquare className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-bold text-sm block text-slate-900">
                Competitive Exam Tracks
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                Explore SSC, WBCS, Railways & Banking syllabus
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* 3. Live Batch Quick Notification */}
      {mockLiveBatches[0] && (
        <div className="bg-white border border-amber-200/80 rounded-md p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200/60 uppercase">
                  Upcoming Live
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {mockLiveBatches[0].title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Starts {mockLiveBatches[0].upcomingLiveTime}</span>
              </p>
            </div>
          </div>

          <Link
            href="/live-classes"
            className="text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-1.5 rounded-md transition-colors text-center shrink-0"
          >
            Enter Classroom
          </Link>
        </div>
      )}

      {/* 4. Video Classes Category Grid (Clean cards, NO bottom border) */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Video Classes
            </h2>
            <p className="text-xs text-slate-500">
              Curated syllabus-focused video courses by top faculty
            </p>
          </div>
          <Link
            href="/subjects"
            className="text-xs font-semibold text-sky-600 hover:underline"
          >
            View all categories
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {mockVideoClassCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/subjects/${cat.slug}`}
              className="group block"
            >
              <Card className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-5 bg-white hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer min-h-[140px]">
                {renderCategoryIcon(cat.iconType)}
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                  {cat.title}
                </h3>
                <span className="text-[10px] text-slate-400 mt-0.5 font-medium line-clamp-1">
                  {cat.itemCountDescription}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
