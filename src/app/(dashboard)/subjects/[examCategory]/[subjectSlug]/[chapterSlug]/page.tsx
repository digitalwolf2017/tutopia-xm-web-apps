"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Video,
  Lock,
  Play,
  Sparkles,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  useChaptersQuery,
  useTutorialsQuery,
  useCompetitiveTypeDetailQuery,
} from "@/features/subjects/api/hooks";
import { VideoLessonItem, TutorialItem } from "@/features/subjects/api/types";
import { VideoPlayerDialog } from "./_components/video-player-dialog";
import { LockSubscriptionDialog } from "./_components/lock-subscription-dialog";

function formatDuration(duration: string | number | undefined): string {
  if (!duration) return "0 mins";
  const num = Number(duration);
  if (isNaN(num) || num <= 0) return "0 mins";
  if (num > 60) {
    const mins = Math.floor(num / 60);
    return `${mins} mins`;
  }
  return `${num} mins`;
}

export default function ChapterVideosPlaylistPage() {
  const params = useParams();

  const examCategory = (params?.examCategory as string) || "";
  const subjectSlug = (params?.subjectSlug as string) || "";
  const chapterSlug = (params?.chapterSlug as string) || "";
  const typeId = Number(examCategory) || 0;

  const [activeVideoModal, setActiveVideoModal] = useState<VideoLessonItem | null>(null);
  const [activeLockModal, setActiveLockModal] = useState<VideoLessonItem | null>(null);

  // 1. Fetch category metadata
  const { data: categoryDetail } = useCompetitiveTypeDetailQuery(typeId);

  // Resolve numeric subjectId
  const allCategorySubjects = useMemo(() => {
    if (!categoryDetail?.com_exam_types) return [];
    return categoryDetail.com_exam_types.flatMap((track) =>
      track.com_subject_categories.flatMap((cat) => cat.com_subjects)
    );
  }, [categoryDetail]);

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

  // 2. Fetch subject chapters
  const { data: chaptersData } = useChaptersQuery(subjectId);
  const chaptersList = chaptersData?.chapters || [];

  // Resolve current active chapter
  const currentChapter = useMemo(() => {
    if (!isNaN(Number(chapterSlug)) && Number(chapterSlug) > 0) {
      const match = chaptersList.find((c) => c.id === Number(chapterSlug));
      if (match) return match;
    }
    const matchByName = chaptersList.find(
      (c) =>
        c.chapter_name.toLowerCase() === chapterSlug.toLowerCase() ||
        c.chapter_name.toLowerCase().replace(/\s+/g, "-") === chapterSlug.toLowerCase()
    );
    if (matchByName) return matchByName;
    return chaptersList[0] || null;
  }, [chaptersList, chapterSlug]);

  const activeChapterId = currentChapter?.id || (isNaN(Number(chapterSlug)) ? 0 : Number(chapterSlug));

  // 3. Fetch tutorials for this chapter
  const { data: tutorials = [], isLoading } = useTutorialsQuery(activeChapterId, 1);

  const subjectName = chaptersData?.subject?.subject_name || "Subject";
  const chapterName = currentChapter?.chapter_name || "Chapter";

  const handleVideoCardClick = (item: TutorialItem) => {
    const isLocked = item.is_free !== 1;
    const lessonItem: VideoLessonItem = {
      id: item.id,
      title: item.tutorial_name,
      durationFormatted: formatDuration(item.duration),
      facultyName: "Tutopia Exam Faculty",
      isLocked,
      thumbUrl: item.thumb_url || undefined,
    };

    if (isLocked) {
      setActiveLockModal(lessonItem);
    } else {
      setActiveVideoModal(lessonItem);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 w-full pb-20">
      {/* 1. Header with Back Arrow, Category, Breadcrumb, and Chapter Dropdown Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-3">
          <Link
            href={`/subjects/${examCategory}/${subjectId}`}
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
                {categoryDetail?.title || "Video Lectures"}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {subjectName} &gt;{" "}
                <span className="text-sky-600 font-semibold">{chapterName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Topic & Chapter Subtitle Heading */}
      <div>
        <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wide uppercase">
          {subjectName} — {chapterName}
        </h2>
      </div>

      {/* Loading state */}
      {isLoading && tutorials.length === 0 && (
        <div className="flex items-center justify-center py-16 gap-2 text-xs text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
          <span>Loading video playlist...</span>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && tutorials.length === 0 && (
        <div className="text-center py-14 bg-white rounded-md border border-slate-200/80 p-6 space-y-2">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-slate-700 text-sm font-semibold">
            No video lectures available
          </p>
          <p className="text-slate-400 text-xs">
            Lectures for {chapterName} will be uploaded soon by the exam team.
          </p>
        </div>
      )}

      {/* Video Lessons Playlist (3-column Grid on Desktop) */}
      {tutorials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {tutorials.map((lesson) => {
            const isLocked = lesson.is_free !== 1;
            const durationStr = formatDuration(lesson.duration);

            return (
              <div
                key={lesson.id}
                onClick={() => handleVideoCardClick(lesson)}
                className="bg-white rounded-md border border-slate-200/80 hover:border-slate-300 shadow-2xs overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer group flex flex-col justify-between"
              >
                {/* 16:9 Thumbnail Banner */}
                <div className="relative w-full aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
                  {lesson.thumb_url ? (
                    <Image
                      src={lesson.thumb_url}
                      alt={lesson.tutorial_name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    /* Geometric Teal Fallback Background */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0c3947] via-[#082d38] to-[#041a22]">
                      <div className="absolute inset-0 opacity-25">
                        <div className="absolute top-4 left-1/4 w-32 h-1 bg-teal-400/40 rounded-full" />
                        <div className="absolute bottom-6 left-1/3 w-48 h-1 bg-amber-400/40 rounded-full" />
                        <div className="absolute top-8 right-1/4 w-12 h-12 border-2 border-teal-300/30 rotate-45" />
                      </div>
                    </div>
                  )}

                  {/* Top-Left Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    {isLocked ? (
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

                  {/* Center Play Button Overlay */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs border-2 border-white/70 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white/30 transition-all duration-200">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Bottom Card Information */}
                <div className="p-3.5 sm:p-4 bg-white flex flex-col justify-between flex-1 gap-2.5 border-t border-slate-100">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors uppercase tracking-wide line-clamp-1">
                      {lesson.tutorial_name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {durationStr}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500 font-medium truncate">
                        Tutopia Faculty
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    {isLocked ? (
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
                      <span>{isLocked ? "Unlock" : "Play"}</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideoModal && (
        <VideoPlayerDialog
          lesson={activeVideoModal}
          chapterName={chapterName}
          topicName={subjectName}
          onClose={() => setActiveVideoModal(null)}
        />
      )}

      {/* Subscription Lock Modal */}
      {activeLockModal && (
        <LockSubscriptionDialog
          lesson={activeLockModal}
          chapterName={chapterName}
          onClose={() => setActiveLockModal(null)}
        />
      )}
    </div>
  );
}
