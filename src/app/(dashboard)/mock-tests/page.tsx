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
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useExamsQuery,
  useExamCategoriesQuery,
} from "@/features/mock-tests/api/hooks";

export default function MockTestsPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | number>("ALL");

  // Live queries
  const { data: serverCategories, isLoading: isLoadingCategories } =
    useExamCategoriesQuery();

  const selectedTypeId = activeCategoryId === "ALL" ? undefined : activeCategoryId;
  const {
    data: serverExams,
    isLoading: isLoadingExams,
  } = useExamsQuery(selectedTypeId);

  // Dynamic categories from server
  const categories: Array<{ id: string | number; title: string }> = [
    { id: "ALL", title: "All Mock Tests" },
    ...(serverCategories && Array.isArray(serverCategories)
      ? serverCategories.map((c) => ({ id: c.id, title: c.title }))
      : []),
  ];

  // Active tests purely from live server data
  const displayTests =
    serverExams && Array.isArray(serverExams)
      ? serverExams.map((exam) => {
          const lastAttempt =
            exam.user_com_exams && exam.user_com_exams.length > 0
              ? exam.user_com_exams[0].lastAttemptedDate
              : null;

          const durationMinutes = Number(exam.duration) || 60;
          const durationFormatted =
            durationMinutes >= 60
              ? `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60 ? `${durationMinutes % 60}m` : ""}`.trim()
              : `${durationMinutes} Mins`;

          return {
            id: String(exam.id),
            title: exam.title,
            category: exam.com_exam_type?.title || "COMPETITIVE",
            durationFormatted,
            totalMarks: exam.marks || 100,
            totalQuestions: exam.questions || 50,
            lastAttemptedDate: lastAttempt || "Not attempted yet",
            status: lastAttempt ? "completed" : "pending",
          };
        })
      : [];

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

        <div className="flex items-center gap-2">

          <Link
            href="/mock-tests/history"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 px-2.5 py-1 rounded-md hover:bg-sky-100 transition-colors"
          >
            <History className="w-3.5 h-3.5 text-sky-600" />
            <span>Test History</span>
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={String(cat.id)}
            onClick={() => setActiveCategoryId(cat.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
              String(activeCategoryId) === String(cat.id)
                ? "bg-sky-600 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Loading state indicator */}
      {isLoadingExams && (
        <div className="flex items-center justify-center py-10 gap-2 text-xs text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
          <span>Loading available test series...</span>
        </div>
      )}

      {/* Empty State */}
      {displayTests.length === 0 && !isLoadingExams && (
        <div className="bg-white p-12 text-center rounded-lg border border-slate-200 space-y-3">
          <BookOpenCheck className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800">No mock tests available</h3>
          <p className="text-xs text-slate-500">
            There are currently no mock tests listed in this category. Please check back soon or select another category.
          </p>
        </div>
      )}

      {/* Mock Test Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
        {displayTests.map((test) => (
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
