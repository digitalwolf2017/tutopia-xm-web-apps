"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ListChecks, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { mockSubjectHierarchy } from "@/lib/mock-data";

export default function ChapterMcqPage() {
  const allGroups = mockSubjectHierarchy["ssc-rail-wbcs"] || [];

  return (
    <div className="space-y-5 w-full pb-16">
      <div className="flex items-center gap-2.5 pb-1 border-b border-slate-200/60">
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

      <div className="space-y-4">
        {allGroups.map((group) => (
          <div key={group.id} className="space-y-2.5">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
              {group.topics.map((topic) => (
                <Card
                  key={topic.id}
                  className="p-3 sm:p-3.5 bg-white border border-slate-200/80 rounded-md flex items-center justify-between hover:border-sky-300 hover:shadow-xs transition-all duration-150 cursor-pointer group hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                      <ListChecks className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                        {topic.name}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {topic.chapterCount} Chapters
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
