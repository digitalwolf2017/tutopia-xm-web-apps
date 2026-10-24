"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ChevronLeft,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHomeFeedQuery } from "@/features/home/api/hooks";
import { HomeCategoryType } from "@/features/home/api/types";

// Helper for routing category cards to matching subject streams
const getCategoryHref = (cat: { id: number; title: string }) => {
  const normalized = cat.title.toLowerCase();
  if (
    normalized.includes("ssc") ||
    normalized.includes("rail") ||
    normalized.includes("wbcs")
  ) {
    return "/subjects/ssc-rail-wbcs";
  }
  if (normalized.includes("bank")) {
    return "/subjects/all-bank-exams";
  }
  if (normalized.includes("portal")) {
    return "/subjects/exams-portal";
  }
  if (normalized.includes("9 to 12") || normalized.includes("class 9")) {
    return "/subjects/gk-class-9-12";
  }
  if (normalized.includes("one line")) {
    return "/subjects/one-line-gk";
  }
  return `/subjects?type_id=${cat.id}`;
};

export default function HomePage() {
  const { data: homeFeed, isLoading, refetch, isRefetching } = useHomeFeedQuery();

  // Extract sliders & video class categories from feed
  const sliderItem = homeFeed?.find(
    (item) => (item.sliders && item.sliders.length > 0) || item.type === 1
  );
  const liveSliders = sliderItem?.sliders || [];

  const categoryItem = homeFeed?.find(
    (item) => (item.types && item.types.length > 0) || item.type === 5
  );
  const liveCategories: HomeCategoryType[] = categoryItem?.types || [];

  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  // Auto-advance banner every 5 seconds if live sliders exist
  useEffect(() => {
    if (liveSliders.length <= 1) return;
    const timer = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % liveSliders.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [liveSliders.length]);

  return (
    <div className="space-y-5 w-full pb-10">
      {/* 1. Promotional Carousel Banner */}
      {isLoading && liveSliders.length === 0 ? (
        <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] max-h-64 rounded-lg bg-slate-200/80 animate-pulse flex items-center justify-center border border-slate-200">
          <Loader2 className="w-6 h-6 animate-spin text-sky-600" />
        </div>
      ) : liveSliders.length > 0 ? (
        <div className="relative group overflow-hidden rounded-lg shadow-2xs border border-slate-200/80 bg-white">
          <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] md:aspect-[21/7] max-h-72 bg-slate-100 overflow-hidden">
            <Image
              src={liveSliders[activeBannerIdx]?.image_url}
              alt="Promotion Banner"
              fill
              priority
              unoptimized
              className="object-cover transition-all duration-500"
            />

            {/* Left / Right Arrow Navigation */}
            {liveSliders.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveBannerIdx((prev) =>
                      prev === 0 ? liveSliders.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveBannerIdx((prev) => (prev + 1) % liveSliders.length)
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {liveSliders.length > 1 && (
            <div className="py-2.5 bg-white flex justify-center items-center gap-1.5 border-t border-slate-100">
              {liveSliders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBannerIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-200 cursor-pointer ${
                    activeBannerIdx === idx
                      ? "w-6 h-1.5 rounded-full bg-sky-600"
                      : "w-1.5 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* 2. Quick Action Cards */}
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

      {/* 3. Video Classes Category Grid */}
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              disabled={isLoading || isRefetching}
              className="p-1 rounded-md text-slate-400 hover:text-sky-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Refresh home feed"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isLoading || isRefetching ? "animate-spin text-sky-600" : ""
                }`}
              />
            </button>
            <Link
              href="/subjects"
              className="text-xs font-semibold text-sky-600 hover:underline"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        {isLoading && liveCategories.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-36 rounded-md bg-slate-100 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {liveCategories.map((cat) => (
              <Link
                key={cat.id}
                href={getCategoryHref(cat)}
                className="group block"
              >
                <Card className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-5 bg-white hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer min-h-[145px]">
                  {cat.image ? (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-2.5 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-sky-50 flex items-center justify-center text-sky-600 mb-2.5 transition-transform group-hover:scale-105">
                      <BookOpen className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  )}

                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {cat.title}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
