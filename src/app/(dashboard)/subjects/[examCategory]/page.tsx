"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Search,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useCompetitiveTypeDetailQuery } from "@/features/subjects/api/hooks";
import { TutopiaLoader } from "@/components/common/tutopia-loader";

export default function SubjectChapterGridPage() {
  const params = useParams();
  const examCategory = (params?.examCategory as string) || "";
  const typeId = Number(examCategory) || 0;

  const {
    data: categoryDetail,
    isLoading,
  } = useCompetitiveTypeDetailQuery(typeId);

  const tracks = categoryDetail?.com_exam_types || [];
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackDropdownOpen, setTrackDropdownOpen] = useState(false);

  // Active track defaults to first track if not explicitly selected
  const activeTrack = useMemo(() => {
    if (selectedTrackId) {
      const match = tracks.find((t) => t.id === selectedTrackId);
      if (match) return match;
    }
    return tracks[0] || null;
  }, [tracks, selectedTrackId]);

  const categories = activeTrack?.com_subject_categories || [];

  // Filter subjects based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        com_subjects: cat.com_subjects.filter((s) =>
          s.subject_name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((cat) => cat.com_subjects.length > 0);
  }, [categories, searchQuery]);

  return (
    <div className="space-y-5 w-full pb-16">
      {/* 1. Header with Badge & Exam Dropdown Selector */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <Link
            href="/subjects"
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-700">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {categoryDetail?.title || "Syllabus Breakdown"}
              </h1>
              <p className="text-[11px] text-slate-500">
                Chapter-wise syllabus and topic breakdown
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">

          {/* Track Dropdown Selector */}
          {tracks.length > 1 && (
            <div className="relative">
              <button
                onClick={() => setTrackDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 bg-sky-50 text-sky-700 border border-sky-200/80 px-2.5 py-1 rounded-md font-bold text-xs hover:bg-sky-100 transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                <span>{activeTrack?.title || "Tracks"}</span>
                <ChevronDown className="w-3 h-3 text-sky-600" />
              </button>

              {trackDropdownOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-30">
                  {tracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        setSelectedTrackId(track.id);
                        setTrackDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-sky-50 transition-colors cursor-pointer ${
                        activeTrack?.id === track.id
                          ? "text-sky-700 bg-sky-50/60 font-bold"
                          : "text-slate-700"
                      }`}
                    >
                      {track.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Search Subject Bar */}
      <div className="relative flex items-center bg-white border border-slate-200 rounded-md shadow-2xs px-3 h-10 focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
        <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search subject or topic name (e.g. Arithmetic, Reasoning)..."
          className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-[11px] text-slate-400 hover:text-slate-600 font-medium px-1.5 py-0.5 rounded bg-slate-100 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Loading state */}
      {isLoading && !categoryDetail && (
        <div className="flex items-center justify-center py-12">
          <TutopiaLoader size="md" label="Loading subjects and topics..." />
        </div>
      )}

      {/* 3. Categorized Subject Sections */}
      <div className="space-y-4">
        {!isLoading && filteredCategories.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-md border border-slate-200/80 p-6 space-y-2">
            <p className="text-slate-600 text-sm font-semibold">
              No subjects found
            </p>
            <p className="text-slate-400 text-xs">
              {searchQuery
                ? `No topics match "${searchQuery}"`
                : "No subjects are currently listed under this track."}
            </p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-md border border-slate-200/80 p-4 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {cat.title}
                </h2>
                <span className="text-[11px] text-slate-400 font-medium">
                  {cat.com_subjects.length} Topics
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                {cat.com_subjects.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/subjects/${examCategory}/${sub.id}`}
                    className="p-3 rounded-md bg-slate-50 hover:bg-sky-50/60 border border-slate-200/70 hover:border-sky-200 transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[76px] group hover:-translate-y-0.5"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700 transition-colors line-clamp-1">
                      {sub.subject_name}
                    </span>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400 group-hover:text-sky-600 transition-colors">
                        {sub.total_chapters}{" "}
                        {sub.total_chapters === 1 ? "chapter" : "chapters"}
                      </span>
                      {sub.total_tutorials > 0 && (
                        <span className="text-[9px] font-bold text-sky-600 bg-sky-100/70 px-1.5 py-0.2 rounded">
                          {sub.total_tutorials} vids
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
