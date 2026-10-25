"use client";

import React, { useEffect } from "react";
import {
  X,
  Play,
  ShieldCheck,
  Clock,
  BookOpen,
  Loader2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { VideoLessonItem } from "@/features/subjects/api/types";
import {
  useVideoPlayQuery,
  useChapterNotesQuery,
} from "@/features/subjects/api/hooks";
import { TutopiaLoader } from "@/components/common/tutopia-loader";

interface VideoPlayerDialogProps {
  lesson: VideoLessonItem | null;
  chapterName: string;
  topicName: string;
  chapterId?: string | number | null;
  onClose: () => void;
}

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

export function VideoPlayerDialog({
  lesson,
  chapterName,
  topicName,
  chapterId,
  onClose,
}: VideoPlayerDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const { data: videoData, isLoading: isLoadingVideo } = useVideoPlayQuery(
    lesson?.id ?? null,
    1
  );

  const { data: chapterNotes = [], isLoading: isLoadingNotes } =
    useChapterNotesQuery(chapterId ?? null);

  if (!lesson) return null;

  const videoStreamUrl = videoData?.video_url || lesson.videoUrl || null;
  const lectureDuration = videoData?.duration
    ? formatDuration(videoData.duration)
    : lesson.durationFormatted || "0 mins";

  const handleDownloadNotes = () => {
    if (chapterNotes.length > 0 && chapterNotes[0].file) {
      window.open(chapterNotes[0].file, "_blank");
    } else {
      alert(`Class notes for "${chapterName}" are being compiled by faculty and will be available soon.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <h3 className="text-sm font-bold text-white truncate">
              {lesson.title}
            </h3>
            <span className="text-xs text-slate-400 hidden sm:inline truncate">
              — {chapterName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {isLoadingVideo ? (
            <div className="flex flex-col items-center justify-center p-6">
              <TutopiaLoader size="md" label="Connecting to Tutopia video stream..." />
            </div>
          ) : videoStreamUrl ? (
            <video
              controls
              autoPlay
              playsInline
              src={videoStreamUrl}
              poster={videoData?.thumb_url || lesson.thumbUrl || undefined}
              className="w-full h-full object-contain bg-black"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            /* High-fidelity Fallback Stage */
            <div className="w-full h-full bg-radial from-slate-900 via-slate-950 to-black flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-sky-600/90 text-white flex items-center justify-center mb-3 shadow-lg group-hover:scale-105 transition-transform">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-100">
                {lesson.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Interactive video lecture player for {topicName} ({chapterName}). Tutopia Exam High Definition (1080p).
              </p>
              <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  {lectureDuration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Free Preview Session
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Details Bar */}
        <div className="p-4 bg-slate-900 text-slate-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
          <div>
            <span className="font-semibold text-white block">
              Faculty: {lesson.facultyName || "Tutopia Senior Faculty"}
            </span>
            <span className="text-slate-400 text-[11px]">
              Duration: {lectureDuration} • Quality: 1080p Full HD
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownloadNotes}
              disabled={isLoadingNotes}
              className="px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title={chapterNotes.length > 0 ? "Download chapter PDF notes" : "Check for chapter notes"}
            >
              {isLoadingNotes ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : chapterNotes.length > 0 ? (
                <ExternalLink className="w-3.5 h-3.5" />
              ) : (
                <BookOpen className="w-3.5 h-3.5" />
              )}
              <span>
                {chapterNotes.length > 0
                  ? `Notes (${chapterNotes.length} PDF)`
                  : "Chapter Notes"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
