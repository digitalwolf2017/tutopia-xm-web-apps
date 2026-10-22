"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Video,
  Lock,
  Play,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  mockSubjectHierarchy,
  mockChaptersByTopic,
  mockVideosByChapter,
  mockVideoClassCategories,
  VideoLesson,
  ChapterItem,
} from "@/lib/mock-data";
import { VideoPlayerDialog } from "./_components/video-player-dialog";
import { LockSubscriptionDialog } from "./_components/lock-subscription-dialog";

export default function ChapterVideosPlaylistPage() {
  const params = useParams();
  const router = useRouter();

  const examCategory = (params?.examCategory as string) || "ssc-rail-wbcs";
  const subjectSlug = (params?.subjectSlug as string) || "arithmetic";
  const chapterSlug = (params?.chapterSlug as string) || "number-system";

  const [activeVideoModal, setActiveVideoModal] = useState<VideoLesson | null>(null);
  const [activeLockModal, setActiveLockModal] = useState<VideoLesson | null>(null);
  const [chapterDropdownOpen, setChapterDropdownOpen] = useState(false);

  // Category details
  const categoryInfo = useMemo(() => {
    return (
      mockVideoClassCategories.find((cat) => cat.slug === examCategory) || {
        title: "SSC, RAIL, WBCS",
        slug: "ssc-rail-wbcs",
      }
    );
  }, [examCategory]);

  // Topic & Group details
  const hierarchyGroups =
    mockSubjectHierarchy[examCategory] || mockSubjectHierarchy["ssc-rail-wbcs"];

  const { currentGroup, currentTopic } = useMemo(() => {
    for (const group of hierarchyGroups) {
      const match = group.topics.find((t) => t.id === subjectSlug);
      if (match) {
        return {
          currentGroup: group,
          currentTopic: match,
        };
      }
    }
    const defaultGroup = hierarchyGroups[0];
    return {
      currentGroup: defaultGroup,
      currentTopic: defaultGroup?.topics[0] || {
        id: subjectSlug,
        name: subjectSlug.toUpperCase(),
        chapterCount: 0,
      },
    };
  }, [hierarchyGroups, subjectSlug]);

  // Chapters list for this topic
  const chaptersList = useMemo(() => {
    const list = mockChaptersByTopic[subjectSlug];
    if (list && list.length > 0) return list;

    return [
      {
        id: "chap-default",
        name: chapterSlug.replace(/-/g, " ").toUpperCase(),
        slug: chapterSlug,
        videoCount: 2,
      },
    ];
  }, [subjectSlug, chapterSlug]);

  // Current active chapter
  const currentChapter = useMemo(() => {
    return (
      chaptersList.find((c) => c.slug === chapterSlug) || {
        id: "chap-fallback",
        name: chapterSlug.replace(/-/g, " ").toUpperCase(),
        slug: chapterSlug,
        videoCount: 2,
      }
    );
  }, [chaptersList, chapterSlug]);

  // Videos playlist
  const videoLessons = useMemo(() => {
    const vids = mockVideosByChapter[chapterSlug];
    if (vids && vids.length > 0) return vids;

    // Standard high fidelity items matching 10.png format
    return [
      {
        id: `${chapterSlug}-vid-1`,
        chapterSlug,
        title: `${currentChapter.name} 1`,
        durationFormatted: "0 mins",
        durationMinutes: 0,
        thumbnailPattern: "teal-geometric" as const,
        isLocked: true,
        order: 1,
        facultyName: "Tutopia Math Faculty",
      },
      {
        id: `${chapterSlug}-vid-2`,
        chapterSlug,
        title: `${currentChapter.name} 2`,
        durationFormatted: "0 mins",
        durationMinutes: 0,
        thumbnailPattern: "teal-geometric" as const,
        isLocked: true,
        order: 2,
        facultyName: "Tutopia Math Faculty",
      },
    ];
  }, [chapterSlug, currentChapter]);

  const handleVideoCardClick = (lesson: VideoLesson) => {
    if (lesson.isLocked) {
      setActiveLockModal(lesson);
    } else {
      setActiveVideoModal(lesson);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 w-full pb-20">
      {/* 1. Header with Back Arrow, Category, Breadcrumb, and Chapter Dropdown Switcher (Screen 10) */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-3">
          <Link
            href={`/subjects/${examCategory}/${subjectSlug}`}
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            title="Go back to chapters"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2.5">
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

        {/* Top-Right Chapter Dropdown Pill Selector (matching 10.png) */}
        <div className="relative">
          <button
            onClick={() => setChapterDropdownOpen(!chapterDropdownOpen)}
            className="flex items-center gap-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/90 px-3 py-1.5 rounded-md font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer shadow-2xs"
          >
            <span className="truncate max-w-[150px] sm:max-w-[200px]">
              {currentChapter.name}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-sky-600 transition-transform ${
                chapterDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {chapterDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-md shadow-lg py-1.5 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Switch Chapter
              </div>
              <div className="max-h-60 overflow-y-auto no-scrollbar py-1">
                {chaptersList.map((chap) => {
                  const isCurrent = chap.slug === chapterSlug;
                  return (
                    <button
                      key={chap.id}
                      onClick={() => {
                        setChapterDropdownOpen(false);
                        router.push(
                          `/subjects/${examCategory}/${subjectSlug}/${chap.slug}`
                        );
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-sky-50 text-sky-700 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate pr-2">{chap.name}</span>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Topic & Chapter Subtitle Heading (matching 10.png "Arithmetic NUMBER SYSTEM") */}
      <div>
        <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wide">
          {currentTopic.name} {currentChapter.name}
        </h2>
      </div>

      {/* Video Lessons Playlist (3 by 3 Grid on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {videoLessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => handleVideoCardClick(lesson)}
            className="bg-white rounded-md border border-slate-200/80 hover:border-slate-300 shadow-2xs overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer group flex flex-col justify-between"
          >
            {/* 16:9 Geometric Dark Teal Video Banner Thumbnail */}
            <div className="relative w-full aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
              {/* Teal Geometric Pattern Layers (matching 10.png) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c3947] via-[#082d38] to-[#041a22]" />

              {/* Geometric grid and circuit accents */}
              <div className="absolute inset-0 opacity-25">
                <div className="absolute top-4 left-1/4 w-32 h-1 bg-teal-400/40 rounded-full" />
                <div className="absolute bottom-6 left-1/3 w-48 h-1 bg-amber-400/40 rounded-full" />
                <div className="absolute top-8 right-1/4 w-12 h-12 border-2 border-teal-300/30 rotate-45" />
                <div className="absolute bottom-4 right-1/3 w-20 h-20 border border-teal-200/20 rounded-full" />
              </div>

              {/* Top-Left Status Badge (Lock badge matching 10.png or Free Demo) */}
              <div className="absolute top-3 left-3 z-10">
                {lesson.isLocked ? (
                  <div className="w-8 h-8 rounded-full bg-white/95 text-slate-800 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Lock className="w-4 h-4 stroke-[2.4]" />
                  </div>
                ) : (
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-md flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Free Demo</span>
                  </div>
                )}
              </div>

              {/* Center Play Button with Tutopia N / Play Overlay */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xs border-2 border-white/60 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white/20 transition-all duration-200">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
              </div>
            </div>

            {/* Bottom Card Information */}
            <div className="p-3.5 sm:p-4 bg-white flex flex-col justify-between flex-1 gap-2.5 border-t border-slate-100">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors uppercase tracking-wide line-clamp-1">
                  {lesson.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.durationFormatted}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-slate-500 font-medium truncate">
                    {lesson.facultyName || "Tutopia Faculty"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {lesson.isLocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                    <Lock className="w-3 h-3" />
                    <span>Subscription Required</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-sky-700 font-semibold bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded">
                    <Play className="w-3 h-3 fill-sky-700" />
                    <span>Watch Now</span>
                  </span>
                )}

                <span className="text-xs font-semibold text-sky-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>{lesson.isLocked ? "Unlock" : "Play"}</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideoModal && (
        <VideoPlayerDialog
          lesson={activeVideoModal}
          chapterName={currentChapter.name}
          topicName={currentTopic.name}
          onClose={() => setActiveVideoModal(null)}
        />
      )}

      {/* Subscription Lock Modal */}
      {activeLockModal && (
        <LockSubscriptionDialog
          lesson={activeLockModal}
          chapterName={currentChapter.name}
          onClose={() => setActiveLockModal(null)}
        />
      )}
    </div>
  );
}
