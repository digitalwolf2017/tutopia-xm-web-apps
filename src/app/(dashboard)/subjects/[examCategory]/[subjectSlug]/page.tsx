"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Lightbulb,
  Video,
  FileQuestion,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  useChaptersQuery,
  useCompetitiveTypeDetailQuery,
} from "@/features/subjects/api/hooks";

export default function SubjectChapterListPage() {
  const params = useParams();
  const router = useRouter();

  const examCategory = (params?.examCategory as string) || "";
  const subjectSlug = (params?.subjectSlug as string) || "";
  const typeId = Number(examCategory) || 0;
  const directSubjectId = Number(subjectSlug) || 0;

  const { data: categoryDetail } = useCompetitiveTypeDetailQuery(typeId);

  // Find all subjects in category detail for fallback lookup
  const allCategorySubjects = useMemo(() => {
    if (!categoryDetail?.com_exam_types) return [];
    return categoryDetail.com_exam_types.flatMap((track) =>
      track.com_subject_categories.flatMap((cat) => cat.com_subjects)
    );
  }, [categoryDetail]);

  // Resolve numeric subjectId
  const subjectId = useMemo(() => {
    if (!isNaN(Number(subjectSlug)) && Number(subjectSlug) > 0) {
      return Number(subjectSlug);
    }
    // Match by slug or name
    const match = allCategorySubjects.find(
      (s) =>
        s.subject_name.toLowerCase() === subjectSlug.toLowerCase() ||
        s.subject_name.toLowerCase().replace(/\s+/g, "-") === subjectSlug.toLowerCase()
    );
    if (match) return match.id;
    return allCategorySubjects[0]?.id || 0;
  }, [subjectSlug, allCategorySubjects]);

  const { data: chaptersData, isLoading } = useChaptersQuery(subjectId);

  const currentSubject = chaptersData?.subject || allCategorySubjects.find((s) => s.id === subjectId);
  const siblingTopics = chaptersData?.subjects && chaptersData.subjects.length > 0
    ? chaptersData.subjects
    : allCategorySubjects;

  const chapters = chaptersData?.chapters || [];

  return (
    <div className="space-y-4 sm:space-y-5 w-full pb-20">
      {/* 1. Header with Back Arrow & Breadcrumb (Screen 9 top bar) */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-3">
          <Link
            href={`/subjects/${examCategory}`}
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            title="Go back to subjects"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2.5">
            {/* Category Icon Badge */}
            <div className="w-9 h-9 rounded-md bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shadow-2xs">
              <BookOpen className="w-4 h-4 stroke-[2.2]" />
            </div>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {categoryDetail?.title || "Video Classes"}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {(currentSubject && "subject_category" in currentSubject ? currentSubject.subject_category : null) || "Subject"} &gt;{" "}
                <span className="text-sky-600 font-semibold">
                  {currentSubject?.subject_name || "Chapter List"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Topic Pills Selector */}
      {siblingTopics.length > 0 && (
        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {siblingTopics.map((topic) => {
              const isActive = topic.id === subjectId;
              return (
                <button
                  key={topic.id}
                  onClick={() =>
                    router.push(`/subjects/${examCategory}/${topic.id}`)
                  }
                  className={`shrink-0 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-sky-600 text-white shadow-xs border border-sky-600"
                      : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-2xs"
                  }`}
                >
                  {topic.subject_name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && chapters.length === 0 && (
        <div className="flex items-center justify-center py-16 gap-2 text-xs text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
          <span>Loading chapters and syllabus...</span>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && chapters.length === 0 && (
        <div className="text-center py-12 bg-white rounded-md border border-slate-200/80 p-6 space-y-2">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-slate-700 text-sm font-semibold">
            No chapters found for this subject
          </p>
          <p className="text-slate-400 text-xs">
            Chapters will appear here once published by the faculty.
          </p>
        </div>
      )}

      {/* Chapter List Items */}
      {chapters.length > 0 && (
        <div className="space-y-2.5">
          {chapters.map((chapter) => {
            const hasVideos = chapter.total_tutorials > 0;
            return (
              <Link
                key={chapter.id}
                href={`/subjects/${examCategory}/${subjectId}/${chapter.id}`}
                className="group block"
              >
                <div className="bg-white rounded-md border border-slate-200/80 hover:border-sky-300 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-between gap-3">
                  {/* Left: Lightbulb / Gear branded icon */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-md bg-amber-50/80 border border-amber-200/70 flex items-center justify-center text-amber-600 shrink-0 group-hover:bg-amber-100/80 transition-colors">
                      <Lightbulb className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors uppercase tracking-wide truncate">
                        {chapter.chapter_name}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-400 font-medium">
                          {chapter.total_tutorials}{" "}
                          {chapter.total_tutorials === 1 ? "video" : "videos"}
                        </span>
                        {chapter.practice_q_count > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                            <FileQuestion className="w-3 h-3" />
                            <span>{chapter.practice_q_count} Practice MCQs</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Chevron Arrow */}
                  <div className="flex items-center gap-2 shrink-0">
                    {hasVideos && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-sky-600 font-semibold bg-sky-50 px-2 py-0.5 rounded">
                        <Video className="w-3 h-3" />
                        <span>Watch</span>
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
