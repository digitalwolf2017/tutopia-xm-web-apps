"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ListChecks,
  ChevronRight,
  Loader2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import {
  useChaptersQuery,
  useCompetitiveTypeDetailQuery,
} from "@/features/subjects/api/hooks";
import { TutopiaLoader } from "@/components/common/tutopia-loader";
import { SubjectItem } from "@/features/subjects/api/types";

export default function ChapterMcqSubjectChaptersPage() {
  const params = useParams();
  const router = useRouter();

  const examCategory = (params?.examCategory as string) || "";
  const subjectSlug = (params?.subjectSlug as string) || "";
  const typeId = Number(examCategory) || 0;

  // 1. Fetch category metadata to find current subject and sibling topics
  const { data: categoryDetail } = useCompetitiveTypeDetailQuery(typeId);

  // Flatten all subjects for this competitive track
  const allCategorySubjects = useMemo(() => {
    if (!categoryDetail?.com_exam_types) return [];
    return categoryDetail.com_exam_types.flatMap((track) =>
      track.com_subject_categories.flatMap((cat) => cat.com_subjects)
    );
  }, [categoryDetail]);

  // Resolve numeric subjectId from route param
  const subjectId = useMemo(() => {
    if (!isNaN(Number(subjectSlug)) && Number(subjectSlug) > 0) {
      return Number(subjectSlug);
    }
    const match = allCategorySubjects.find(
      (s) =>
        s.subject_name.toLowerCase() === subjectSlug.toLowerCase() ||
        s.subject_name.toLowerCase().replace(/\s+/g, "-") === subjectSlug.toLowerCase()
    );
    if (match) return match.id;
    return allCategorySubjects[0]?.id || 0;
  }, [subjectSlug, allCategorySubjects]);

  // 2. Fetch chapters for this subject
  const { data: chaptersData, isLoading } = useChaptersQuery(subjectId);
  const chapters = chaptersData?.chapters || [];

  // Current subject entity
  const currentSubject = useMemo(() => {
    if (chaptersData?.subject) return chaptersData.subject;
    return allCategorySubjects.find((s) => s.id === subjectId) || null;
  }, [chaptersData, allCategorySubjects, subjectId]);

  // Sibling topics (same subject category or same track)
  const siblingTopics = useMemo(() => {
    if (chaptersData?.subjects && chaptersData.subjects.length > 0) {
      return chaptersData.subjects;
    }
    return allCategorySubjects;
  }, [chaptersData, allCategorySubjects]);

  const subjectTitle = currentSubject?.subject_name || "Subject";
  const categoryTitle =
    (currentSubject && "subject_category" in currentSubject ? currentSubject.subject_category : null) ||
    categoryDetail?.title ||
    "Competitive Track";

  return (
    <div className="space-y-4 sm:space-y-5 w-full pb-16">
      {/* 1. Header with Back Arrow and Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-2.5">
          <Link
            href="/chapter-mcq"
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            title="Back to all subjects"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {subjectTitle} — Chapter MCQs
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Practice
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {categoryTitle} &gt; <span className="text-sky-600 font-semibold">{subjectTitle}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Sibling Topic Switcher Pills */}
      {siblingTopics.length > 1 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {siblingTopics.map((topic: SubjectItem) => {
              const isActive = topic.id === subjectId;
              return (
                <button
                  key={topic.id}
                  onClick={() => router.push(`/chapter-mcq/${examCategory}/${topic.id}`)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
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

      {/* 3. Loading state */}
      {isLoading && chapters.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <TutopiaLoader size="md" label="Loading practice chapters..." />
        </div>
      )}

      {/* 4. Empty State */}
      {!isLoading && chapters.length === 0 && (
        <div className="text-center py-12 bg-white rounded-md border border-slate-200/80 p-6 space-y-2">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-slate-700 text-sm font-semibold">
            No practice chapters found
          </p>
          <p className="text-slate-400 text-xs">
            Practice questions for {subjectTitle} will appear once syllabus is published.
          </p>
        </div>
      )}

      {/* 5. Chapters List for MCQ Practice */}
      {chapters.length > 0 && (
        <div className="space-y-2.5">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/chapter-mcq/${examCategory}/${subjectId}/${chapter.id}`}
              className="group block"
            >
              <div className="bg-white rounded-md border border-slate-200/80 hover:border-emerald-300 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-between gap-3">
                {/* Left: Icon & Chapter Information */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-md bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-100/80 transition-colors">
                    <ListChecks className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors uppercase tracking-wide truncate">
                      {chapter.chapter_name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1 flex-wrap sm:flex-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                        <HelpCircle className="w-3 h-3 shrink-0" />
                        <span className="whitespace-nowrap">
                          {chapter.practice_q_count > 0
                            ? `${chapter.practice_q_count} Practice MCQs`
                            : "Practice Quiz Available"}
                        </span>
                      </span>
                      {Number(chapter.test_duration) > 0 && (
                        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">
                          • {chapter.test_duration} mins
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Start Practice CTA */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white px-3 py-1.5 rounded-md transition-colors">
                    <span>Start Practice</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
