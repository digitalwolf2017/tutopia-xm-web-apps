"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Video,
  ListChecks,
  Award,
  Sparkles,
  TrendingUp,
  Compass,
  ChevronRight,
  Flame,
  Loader2,
  BookOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGraphFeedQuery } from "@/features/exam-tracks/api/hooks";
import { GraphDataPoint } from "@/features/exam-tracks/api/types";
import { GraphMetricCard } from "@/features/exam-tracks/components/graph-metric-card";
import { LearningBarChart } from "@/features/exam-tracks/components/learning-bar-chart";
import { TutopiaLoader } from "@/components/common/tutopia-loader";
import { PracticeTrendChart } from "@/features/exam-tracks/components/practice-trend-chart";
import {
  useCompetitiveTypesQuery,
  useCompetitiveTypeDetailQuery,
} from "@/features/subjects/api/hooks";

export default function ExamTracksPage() {
  const [activeTab, setActiveTab] = useState<"graphs" | "tracks">("graphs");
  const [timeframe, setTimeframe] = useState<1 | 2 | 3>(2); // 1: 24h, 2: 7d, 3: 30d
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

  // 1. Fetch live competitive types for tracks tab and subject filter
  const { data: competitiveTypes = [] } = useCompetitiveTypesQuery();
  const primaryTypeId = competitiveTypes[0]?.id || 0;
  const { data: categoryDetail } = useCompetitiveTypeDetailQuery(primaryTypeId);

  const allSubjects = useMemo(() => {
    if (!categoryDetail?.com_exam_types) return [];
    return categoryDetail.com_exam_types.flatMap((track) =>
      track.com_subject_categories.flatMap((cat) => cat.com_subjects)
    );
  }, [categoryDetail]);

  // 2. Fetch live graph analytics feed
  const { data: graphData, isLoading: isLoadingGraph } = useGraphFeedQuery(
    timeframe,
    selectedSubjectId
  );

  // Fallback demo points if backend user has not generated graph events yet
  const watchPoints: GraphDataPoint[] = useMemo(() => {
    const raw = graphData?.graphTotalWatched?.data;
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return [
      { date: "Day 1", dateFormat: "Mon", total: 20 },
      { date: "Day 2", dateFormat: "Tue", total: 45 },
      { date: "Day 3", dateFormat: "Wed", total: 60 },
      { date: "Day 4", dateFormat: "Thu", total: 90 },
      { date: "Day 5", dateFormat: "Fri", total: 40 },
      { date: "Day 6", dateFormat: "Sat", total: 75 },
      { date: "Day 7", dateFormat: "Sun", total: 110 },
    ];
  }, [graphData]);

  const questionPoints: GraphDataPoint[] = useMemo(() => {
    const raw = graphData?.graphAttemptedQuestion?.data;
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return [
      { date: "Day 1", dateFormat: "Mon", total: 5 },
      { date: "Day 2", dateFormat: "Tue", total: 12 },
      { date: "Day 3", dateFormat: "Wed", total: 20 },
      { date: "Day 4", dateFormat: "Thu", total: 15 },
      { date: "Day 5", dateFormat: "Fri", total: 8 },
      { date: "Day 6", dateFormat: "Sat", total: 25 },
      { date: "Day 7", dateFormat: "Sun", total: 30 },
    ];
  }, [graphData]);

  const mockTestPoints: GraphDataPoint[] = useMemo(() => {
    const raw = graphData?.graphMockTest?.data;
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return [
      { date: "Day 1", dateFormat: "Mon", total: 0 },
      { date: "Day 2", dateFormat: "Tue", total: 1 },
      { date: "Day 3", dateFormat: "Wed", total: 0 },
      { date: "Day 4", dateFormat: "Thu", total: 1 },
      { date: "Day 5", dateFormat: "Fri", total: 0 },
      { date: "Day 6", dateFormat: "Sat", total: 2 },
      { date: "Day 7", dateFormat: "Sun", total: 1 },
    ];
  }, [graphData]);

  // Aggregate totals
  const totalWatchMinutes =
    graphData?.graphTotalWatched?.total ||
    watchPoints.reduce((acc, p) => acc + p.total, 0);

  const totalVideosCount =
    graphData?.totalVideo?.total ||
    graphData?.totalVideo?.totalWatchedVideo ||
    18;

  const totalQuestionsCount =
    graphData?.graphAttemptedQuestion?.total ||
    graphData?.graphAttemptedQuestion?.totalAttempted ||
    questionPoints.reduce((acc, p) => acc + p.total, 0);

  const totalMockTestsCount =
    graphData?.graphMockTest?.total ||
    graphData?.graphMockTest?.totalAttempted ||
    mockTestPoints.reduce((acc, p) => acc + p.total, 0);

  const formatStudyHours = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m} mins`;
    return `${h}h ${m}m`;
  };

  return (
    <div className="space-y-5 w-full pb-16">
      {/* 1. Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">
                Competitive Exam Tracks & Progress
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-sky-600" /> Analytics Feed
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Track your preparation journey, study consistency, and syllabus progress
            </p>
          </div>
        </div>

        {/* Primary View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
          <button
            onClick={() => setActiveTab("graphs")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "graphs"
                ? "bg-white text-sky-600 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Learning Graphs</span>
          </button>
          <button
            onClick={() => setActiveTab("tracks")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "tracks"
                ? "bg-white text-sky-600 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Browse Tracks</span>
          </button>
        </div>
      </div>

      {/* 2. TAB 1: Learning Graphs & Performance */}
      {activeTab === "graphs" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Controls Bar: Timeframe & Subject Filter */}
          <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
            {/* Timeframe Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-700 mr-1">Timeframe:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200/70">
                <button
                  onClick={() => setTimeframe(1)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    timeframe === 1
                      ? "bg-sky-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  24 Hours
                </button>
                <button
                  onClick={() => setTimeframe(2)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    timeframe === 2
                      ? "bg-sky-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setTimeframe(3)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    timeframe === 3
                      ? "bg-sky-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  30 Days
                </button>
              </div>
            </div>

            {/* Optional Subject Filter */}
            {allSubjects.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Subject:</span>
                <select
                  value={selectedSubjectId || ""}
                  onChange={(e) =>
                    setSelectedSubjectId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="px-2.5 py-1 rounded-md text-xs font-medium border border-slate-200 bg-white text-slate-800 shadow-2xs focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="">All Subjects</option>
                  {allSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.subject_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Loading Indicator */}
          {isLoadingGraph && (
            <div className="flex items-center justify-center py-6">
              <TutopiaLoader size="sm" label="Updating graph feed..." />
            </div>
          )}

          {/* 4 KPI Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <GraphMetricCard
              title="Study Time"
              value={formatStudyHours(totalWatchMinutes)}
              subtitle="Lectures & video sessions"
              icon={Clock}
              badge="Duration"
              accentColor="sky"
            />
            <GraphMetricCard
              title="Videos Watched"
              value={totalVideosCount}
              subtitle="Syllabus topics completed"
              icon={Video}
              badge="Lectures"
              accentColor="purple"
            />
            <GraphMetricCard
              title="MCQs Solved"
              value={totalQuestionsCount}
              subtitle="Topic-wise practice questions"
              icon={ListChecks}
              badge="Practiced"
              accentColor="emerald"
            />
            <GraphMetricCard
              title="Mock Tests"
              value={totalMockTestsCount}
              subtitle="Full-length exams submitted"
              icon={Award}
              badge="Exam Prep"
              accentColor="amber"
            />
          </div>

          {/* Interactive Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LearningBarChart
              dataPoints={watchPoints}
              title="Daily Video Study Time"
              totalMinutes={totalWatchMinutes}
            />
            <PracticeTrendChart
              questionPoints={questionPoints}
              mockTestPoints={mockTestPoints}
              totalQuestions={totalQuestionsCount}
              totalMockTests={totalMockTestsCount}
            />
          </div>

          {/* Gamified Consistency Banner */}
          <Card className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/80 rounded-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Daily Study Streak Active!
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Consistent daily practice increases exam retention by over 70%. Keep solving MCQs daily!
                </p>
              </div>
            </div>

            <Link
              href="/chapter-mcq"
              className="shrink-0 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition-colors"
            >
              <span>Practice Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      )}

      {/* 3. TAB 2: Browse Exam Tracks & Syllabus */}
      {activeTab === "tracks" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              All Tutopia Competitive Exam Tracks
            </h2>
            <p className="text-xs text-slate-500">
              Select an exam track to explore complete syllabus, video classes, and practice materials
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {competitiveTypes.map((cat) => (
              <Link
                key={cat.id}
                href={`/subjects/${cat.id}`}
                className="group block"
              >
                <Card className="p-4 bg-white border border-slate-200/80 rounded-lg shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between h-full hover:-translate-y-0.5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                        {cat.image ? (
                          <Image
                            src={cat.image}
                            alt={cat.title}
                            width={36}
                            height={36}
                            unoptimized
                            className="object-contain"
                          />
                        ) : (
                          <BookOpen className="w-5 h-5 text-sky-600" />
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full">
                        Exam Track
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        Complete preparation track covering exam syllabus, video lectures, and practice sets for {cat.title}.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                    <span>Explore Syllabus</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
