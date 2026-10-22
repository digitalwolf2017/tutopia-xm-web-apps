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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { mockSubjectHierarchy } from "@/lib/mock-data";

export default function SubjectChapterGridPage() {
  const params = useParams();
  const examCategory = (params?.examCategory as string) || "ssc-rail-wbcs";

  const [selectedTrack, setSelectedTrack] = useState("SSC");
  const [searchQuery, setSearchQuery] = useState("");

  const groups =
    mockSubjectHierarchy[examCategory] || mockSubjectHierarchy["ssc-rail-wbcs"];

  // Filter topics based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;

    return groups
      .map((group) => {
        const matchingTopics = group.topics.filter((topic) =>
          topic.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return {
          ...group,
          topics: matchingTopics,
        };
      })
      .filter((group) => group.topics.length > 0);
  }, [groups, searchQuery]);

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
                SSC, RAIL, WBCS
              </h1>
              <p className="text-[11px] text-slate-500">
                Chapter-wise syllabus breakdown
              </p>
            </div>
          </div>
        </div>

        {/* Dropdown Selector */}
        <div className="relative">
          <button className="flex items-center gap-1.5 bg-sky-50 text-sky-700 border border-sky-200/80 px-2.5 py-1 rounded-md font-bold text-xs hover:bg-sky-100 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>{selectedTrack}</span>
            <ChevronDown className="w-3 h-3 text-sky-600" />
          </button>
        </div>
      </div>

      {/* 2. Compact Search Subject Bar */}
      <div className="relative flex items-center bg-white border border-slate-200 rounded-md shadow-2xs px-3 h-10 focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
        <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search subject or topic name (e.g. Arithmetic, Grammer)..."
          className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-[11px] text-slate-400 hover:text-slate-600 font-medium px-1.5 py-0.5 rounded bg-slate-100"
          >
            Clear
          </button>
        )}
      </div>

      {/* 3. Categorized Subject Sections */}
      <div className="space-y-4">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-md border border-slate-200/80 p-6">
            <p className="text-slate-500 text-xs font-medium">
              No subjects found matching &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-md border border-slate-200/80 p-4 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {group.title}
                </h2>
                <span className="text-[11px] text-slate-400 font-medium">
                  {group.topics.length} Topics
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                {group.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-3 rounded-md bg-slate-50 hover:bg-sky-50/60 border border-slate-200/70 hover:border-sky-200 transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[76px] group hover:-translate-y-0.5"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700 transition-colors line-clamp-1">
                      {topic.name}
                    </span>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400 group-hover:text-sky-600 transition-colors">
                        {topic.chapterCount}{" "}
                        {topic.chapterCount === 1 ? "chapter" : "chapters"}
                      </span>
                      {topic.completedChapters && topic.completedChapters > 0 ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
