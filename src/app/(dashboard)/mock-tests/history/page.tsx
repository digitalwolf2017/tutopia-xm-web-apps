"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Clock,
  RotateCcw,
  Loader2,
  FileQuestion,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompletedExamsQuery } from "@/features/mock-tests/api/hooks";

export default function MockTestHistoryPage() {
  const { data: completedExams, isLoading } =
    useCompletedExamsQuery();

  const displayList =
    completedExams && Array.isArray(completedExams)
      ? completedExams.map((att) => {
          const durationMinutes = Number(att.duration) || 60;
          const timeTaken =
            durationMinutes >= 60
              ? `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60 ? `${durationMinutes % 60}m` : ""}`.trim()
              : `${durationMinutes} Mins`;

          return {
            id: String(att.id),
            testId: String(att.com_exam_id || att.id),
            testTitle: att.title,
            attemptedDate: att.attemptedDate || "Recently",
            score: att.aggregate_marks ?? 0,
            totalMarks: att.marks || 100,
            passingMarks: att.passing_marks || 40,
            timeTaken,
            category: att.com_exam_type?.title || "Exam",
          };
        })
      : [];

  return (
    <div className="space-y-5 w-full pb-16">
      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <Link
            href="/mock-tests"
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
              Mock Test History & Analytics
            </h1>
            <p className="text-xs text-slate-500">
              Review past scores, solution analysis, and performance accuracy
            </p>
          </div>
        </div>

      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12 gap-2 text-xs text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
          <span>Loading your past exam attempts...</span>
        </div>
      )}

      {displayList.length === 0 && !isLoading && (
        <div className="bg-white p-12 text-center rounded-lg border border-slate-200 space-y-3">
          <FileQuestion className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800">No attempts found</h3>
          <p className="text-xs text-slate-500">
            You haven&apos;t completed any mock tests yet. Take your first test today!
          </p>
          <Link href="/mock-tests">
            <Button variant="tutopia-blue" size="sm" className="mt-2 font-bold text-xs">
              Explore Mock Tests
            </Button>
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {displayList.map((att) => {
          const isPassed = att.score >= att.passingMarks;

          return (
            <Card
              key={att.id}
              className="p-4 sm:p-5 bg-white border border-slate-200/80 rounded-md shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {att.testTitle}
                  </h3>
                  <Badge variant="blue">{att.category}</Badge>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isPassed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {isPassed ? "PASSED" : "FAILED"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
                  <span>
                    Attempted on: <strong>{att.attemptedDate}</strong>
                  </span>
                  <span>
                    Duration: <strong>{att.timeTaken}</strong>
                  </span>
                  <span>
                    Passing Marks: <strong>{att.passingMarks}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Score
                  </span>
                  <span
                    className={`text-lg font-black ${
                      isPassed ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {att.score}
                    <span className="text-xs font-semibold text-slate-400">
                      /{att.totalMarks}
                    </span>
                  </span>
                </div>

                <Link href={`/mock-tests/${att.testId}/take`}>
                  <Button
                    variant="outline"
                    className="h-8 px-3 text-xs font-bold rounded-md hover:bg-slate-50 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Re-test
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
