"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  Clock,
  Award,
  AlertCircle,
  History,
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMockTests } from "@/lib/mock-data";

export default function MockTestsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "SSC", "WBCS", "RAIL", "PSC"];

  const filteredTests =
    activeCategory === "ALL"
      ? mockMockTests
      : mockMockTests.filter((test) => test.category === activeCategory);

  return (
    <div className="space-y-5 w-full pb-16">
      {/* Top Header */}
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
              Mock Test Series
            </h1>
            <p className="text-xs text-slate-500">
              Full-length tests modeled after TCS iON CBT exam patterns
            </p>
          </div>
        </div>

        <Link
          href="/mock-tests/history"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 px-2.5 py-1 rounded-md hover:bg-sky-100 transition-colors"
        >
          <History className="w-3.5 h-3.5 text-sky-600" />
          <span>Test History</span>
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 ${
              activeCategory === cat
                ? "bg-sky-600 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat === "ALL" ? "All Mock Tests" : cat}
          </button>
        ))}
      </div>

      {/* Mock Test Cards Grid (Clean cards, NO bottom border) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
        {filteredTests.map((test) => (
          <Card
            key={test.id}
            className="p-4 sm:p-5 bg-white border border-slate-200/80 rounded-lg shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5 flex-1">
              {/* Notebook Icon */}
              <div className="w-10 h-10 rounded-md bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <BookOpenCheck className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {test.title}
                  </h3>
                  <Badge variant="blue">{test.category}</Badge>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {test.durationFormatted}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    {test.totalMarks} Marks
                  </span>
                </div>

                <p className="text-[11px] text-slate-400">
                  Last attempted:{" "}
                  <span className="font-medium text-slate-600">
                    {test.lastAttemptedDate}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <Link
                href={`/mock-tests/${test.id}/take`}
                className="inline-flex items-center justify-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-md shadow-2xs transition-all active:scale-95 shrink-0"
              >
                {test.status === "completed" ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-attempt</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Start Test</span>
                  </>
                )}
              </Link>

              <Link
                href="/mock-tests/history"
                className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:underline"
              >
                <span>View History</span>
                <AlertCircle className="w-3 h-3" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Compact Sticky Bottom Action */}
      <div className="fixed bottom-14 md:bottom-4 left-0 right-0 max-w-sm mx-auto px-4 z-30 pointer-events-none">
        <Link
          href="/mock-tests/history"
          className="pointer-events-auto w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold text-xs py-2.5 px-4 rounded-md shadow-lg transition-transform active:scale-95"
        >
          <History className="w-4 h-4 text-sky-400" />
          <span>View Mock Test History & Scorecards</span>
        </Link>
      </div>
    </div>
  );
}
