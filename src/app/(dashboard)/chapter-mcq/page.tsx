"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ListChecks, ChevronRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  useCompetitiveTypesQuery,
  useCompetitiveTypeDetailQuery,
} from "@/features/subjects/api/hooks";

export default function ChapterMcqPage() {
  const { data: competitiveTypes } = useCompetitiveTypesQuery();
  const primaryTypeId = competitiveTypes?.[0]?.id || 0;
  const { data: categoryDetail, isLoading } =
    useCompetitiveTypeDetailQuery(primaryTypeId);

  const tracks = categoryDetail?.com_exam_types || [];
  const primaryTrack = tracks[0] || null;
  const categories = primaryTrack?.com_subject_categories || [];

  return (
    <div className="space-y-5 w-full pb-16">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
              Chapter wise MCQ Practice
            </h1>
            <p className="text-xs text-slate-500">
              Topic-by-topic practice quizzes with instant step-by-step explanations
            </p>
          </div>
        </div>

      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16 gap-2 text-xs text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
          <span>Loading practice topics...</span>
        </div>
      )}

      {!isLoading && categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-md border border-slate-200/80 p-6 space-y-2">
          <p className="text-slate-700 text-sm font-semibold">No practice topics found</p>
          <p className="text-slate-400 text-xs">Topics will appear as soon as the syllabus is published.</p>
        </div>
      )}

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="space-y-2.5">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
              {category.com_subjects.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/subjects/${primaryTypeId}/${sub.id}`}
                  className="block"
                >
                  <Card className="p-3 sm:p-3.5 bg-white border border-slate-200/80 rounded-md flex items-center justify-between hover:border-sky-300 hover:shadow-xs transition-all duration-150 cursor-pointer group hover:-translate-y-0.5">
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-md bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                        <ListChecks className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                          {sub.subject_name}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {sub.total_chapters} {sub.total_chapters === 1 ? "Chapter" : "Chapters"}
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
    </div>
  );
}
