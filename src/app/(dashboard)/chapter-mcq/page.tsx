"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ListChecks, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  useCompetitiveTypesQuery,
  useCompetitiveTypeDetailQuery,
} from "@/features/subjects/api/hooks";
import { TutopiaLoader } from "@/components/common/tutopia-loader";

export default function ChapterMcqPage() {
  const { data: competitiveTypes = [], isLoading: isLoadingTypes } = useCompetitiveTypesQuery();
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);

  const activeTypeId = selectedTypeId || competitiveTypes[0]?.id || 0;
  const { data: categoryDetail, isLoading: isLoadingDetail } =
    useCompetitiveTypeDetailQuery(activeTypeId);

  const tracks = categoryDetail?.com_exam_types || [];
  const primaryTrack = tracks[0] || null;
  const categories = primaryTrack?.com_subject_categories || [];

  const isLoading = isLoadingTypes || isLoadingDetail;

  return (
    <div className="space-y-5 w-full pb-16">
      {/* 1. Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1 border-b border-slate-200/60">
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
                Chapter wise MCQ Practice
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Live MCQs
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Topic-by-topic practice quizzes with instant step-by-step explanations
            </p>
          </div>
        </div>
      </div>

      {/* 2. Exam Category Tabs */}
      {competitiveTypes.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {competitiveTypes.map((cat) => {
            const isActive = cat.id === activeTypeId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTypeId(cat.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-sky-600 text-white shadow-2xs"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 shadow-2xs"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <TutopiaLoader size="md" label="Loading practice topics..." />
        </div>
      )}

      {/* 4. Empty State */}
      {!isLoading && categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-md border border-slate-200/80 p-6 space-y-2">
          <p className="text-slate-700 text-sm font-semibold">No practice topics found</p>
          <p className="text-slate-400 text-xs">Topics will appear as soon as the syllabus is published.</p>
        </div>
      )}

      {/* 5. Subject Grid Grouped by Category */}
      {!isLoading && (
        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2.5">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
                {category.com_subjects.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/chapter-mcq/${activeTypeId}/${sub.id}`}
                    className="block"
                  >
                    <Card className="p-3 sm:p-3.5 bg-white border border-slate-200/80 rounded-md flex items-center justify-between hover:border-sky-300 hover:shadow-xs transition-all duration-150 cursor-pointer group hover:-translate-y-0.5">
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600 shrink-0">
                          <ListChecks className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                            {sub.subject_name}
                          </h3>
                          <p className="text-[11px] text-slate-400">
                            {sub.total_chapters} {sub.total_chapters === 1 ? "Chapter" : "Chapters"} • Practice MCQs
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

