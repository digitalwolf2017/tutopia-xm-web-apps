"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  Video,
} from "lucide-react";
import {
  mockSubjectHierarchy,
  mockChaptersByTopic,
  mockVideoClassCategories,
} from "@/lib/mock-data";

export default function SubjectChapterListPage() {
  const params = useParams();
  const router = useRouter();

  const examCategory = (params?.examCategory as string) || "ssc-rail-wbcs";
  const subjectSlug = (params?.subjectSlug as string) || "arithmetic";

  // Find category title
  const categoryInfo = useMemo(() => {
    return (
      mockVideoClassCategories.find((cat) => cat.slug === examCategory) || {
        title: "SSC, RAIL, WBCS",
        slug: "ssc-rail-wbcs",
      }
    );
  }, [examCategory]);

  // Find hierarchy group and parent subject for breadcrumb & sibling topics
  const hierarchyGroups =
    mockSubjectHierarchy[examCategory] || mockSubjectHierarchy["ssc-rail-wbcs"];

  const { currentGroup, currentTopic, siblingTopics } = useMemo(() => {
    for (const group of hierarchyGroups) {
      const match = group.topics.find((t) => t.id === subjectSlug);
      if (match) {
        return {
          currentGroup: group,
          currentTopic: match,
          siblingTopics: group.topics,
        };
      }
    }
    // Fallback if not directly matched
    const defaultGroup = hierarchyGroups[0];
    const defaultTopic = defaultGroup?.topics[0] || {
      id: subjectSlug,
      name: subjectSlug.toUpperCase(),
      chapterCount: 0,
    };
    return {
      currentGroup: defaultGroup,
      currentTopic: defaultTopic,
      siblingTopics: defaultGroup?.topics || [],
    };
  }, [hierarchyGroups, subjectSlug]);

  // Get chapters for current topic
  const chapters = useMemo(() => {
    const list = mockChaptersByTopic[subjectSlug];
    if (list && list.length > 0) return list;

    // Generate smart placeholders if specific topic not populated in mock
    return [
      {
        id: `${subjectSlug}-chap-1`,
        name: `${currentTopic.name} - CHAPTER 1: BASICS & CONCEPTS`,
        slug: `${subjectSlug}-basics`,
        videoCount: 1,
        completedVideos: 0,
        description: "Introduction, theoretical core concepts and exam breakdown",
      },
      {
        id: `${subjectSlug}-chap-2`,
        name: `${currentTopic.name} - CHAPTER 2: ADVANCED PROBLEM SOLVING`,
        slug: `${subjectSlug}-advanced`,
        videoCount: 0,
        completedVideos: 0,
        description: "Previous year questions (PYQs) and high-yield shortcuts",
      },
      {
        id: `${subjectSlug}-chap-3`,
        name: `${currentTopic.name} - CHAPTER 3: PRACTICE SET & TEST STRATEGY`,
        slug: `${subjectSlug}-practice`,
        videoCount: 0,
        completedVideos: 0,
        description: "Full speed practice drill with time management techniques",
      },
    ];
  }, [subjectSlug, currentTopic]);

  return (
    <div className="space-y-4 sm:space-y-5 w-full pb-20">
      {/* 1. Header with Back Arrow & Breadcrumb (Screen 9 top bar) */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
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
                {categoryInfo.title}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {currentGroup ? currentGroup.title : "Subject"} &gt;{" "}
                <span className="text-sky-600 font-semibold">
                  {currentTopic.name}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Topic Pills Selector (Arithmetic, Algebra, Geometry, Trigo, D.I) */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {siblingTopics.map((topic) => {
            const isActive = topic.id === subjectSlug;
            return (
              <button
                key={topic.id}
                onClick={() => router.push(`/subjects/${examCategory}/${topic.id}`)}
                className={`shrink-0 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-sky-600 text-white shadow-xs border border-sky-600"
                    : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-2xs"
                }`}
              >
                {topic.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter List Items */}
      <div className="space-y-2.5">
        {chapters.map((chapter) => {
          const isAvailable = chapter.videoCount > 0;
          return (
            <Link
              key={chapter.id}
              href={`/subjects/${examCategory}/${subjectSlug}/${chapter.slug}`}
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
                      {chapter.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {chapter.videoCount}{" "}
                        {chapter.videoCount === 1 ? "video" : "videos"}
                      </span>
                      {chapter.completedVideos && chapter.completedVideos > 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>
                            {chapter.completedVideos} completed
                          </span>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Right: Chevron Arrow */}
                <div className="flex items-center gap-2 shrink-0">
                  {isAvailable && (
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
    </div>
  );
}
