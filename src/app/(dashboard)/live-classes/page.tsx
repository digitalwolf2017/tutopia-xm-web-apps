"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Radio,
  Share2,
  Calendar,
  Tag,
  Tv,
  ArrowRight,
  Sparkles,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockLiveBatches } from "@/lib/mock-data";

export default function LiveClassesPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="space-y-5 w-full pb-16">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            Live Interactive Batches
          </h1>
          <p className="text-xs text-slate-500">
            Attend live interactive lectures with top faculty and real-time doubt clearing
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
          <span>Live Now</span>
        </span>
      </div>

      {/* 2. Compact Live Stream Preview Container */}
      <div className="space-y-2">
        <div className="relative rounded-lg bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-slate-200/80 overflow-hidden shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 text-white gap-3">
          <div className="space-y-1 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              FEATURED CLASSROOM
            </span>
            <h2 className="text-base sm:text-lg font-black text-white leading-tight">
              Combined General Studies Live Masterclass
            </h2>
            <p className="text-xs text-sky-200 line-clamp-1">
              West Bengal Geography & History revision with shortcut mnemonic tricks
            </p>
          </div>

          <Link
            href="/live-classes"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-2 rounded-md text-xs shadow-xs transition-transform active:scale-95 shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Join Live</span>
          </Link>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-1.5">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-200 ${
                activeSlide === idx
                  ? "w-5 h-1.5 rounded-full bg-sky-600"
                  : "w-1.5 h-1.5 rounded-full bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Live Batch Cards (3 Columns with consistent #CCCCCC placeholder style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockLiveBatches.map((batch) => {
          const isPlaceholder = batch.bannerTheme === "placeholder" || true;

          return (
            <Card
              key={batch.id}
              className="overflow-hidden bg-white border border-slate-200/80 rounded-lg shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Batch Thumbnail Banner */}
              <div
                className={`relative aspect-[16/7] w-full flex items-center justify-between p-4 sm:p-5 transition-colors ${
                  isPlaceholder
                    ? "bg-[#CCCCCC] text-slate-800"
                    : "bg-gradient-to-r from-sky-600 to-sky-700 text-white"
                }`}
              >
                <div className="space-y-1">
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                      isPlaceholder
                        ? "text-slate-700 bg-white/80 border border-slate-300/80 shadow-2xs"
                        : "text-sky-200 bg-sky-800/40"
                    }`}
                  >
                    Combined Exam Course
                  </span>
                  <h3
                    className={`text-sm sm:text-base font-black leading-tight ${
                      isPlaceholder ? "text-slate-800" : "text-white"
                    }`}
                  >
                    {batch.badge}
                  </h3>
                </div>

                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                    isPlaceholder
                      ? "bg-white/70 text-slate-700 border border-slate-300/70"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <Radio className="w-5 h-5" />
                </div>
              </div>

            {/* Batch Details */}
            <div className="p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  {batch.title}
                </h4>

                <button
                  aria-label="Share Batch"
                  className="p-1.5 rounded-md text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Meta Dates & Subscription Model */}
              <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {batch.startDate} - {batch.endDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{batch.subscriptionType}</span>
                </div>
              </div>

              {/* Divider & Action Buttons */}
              <div className="border-t border-slate-100 pt-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="tutopia-yellow-outline"
                    className="w-full text-slate-900 font-bold rounded-md h-9 text-xs"
                  >
                    Explore Syllabus
                  </Button>

                  <Button
                    variant="tutopia-blue"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-md h-9 text-xs shadow-2xs"
                  >
                    Buy now • ₹{batch.discountedPrice}
                  </Button>
                </div>
              </div>
            </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
