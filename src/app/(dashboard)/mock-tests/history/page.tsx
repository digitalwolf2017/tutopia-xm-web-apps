"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Award, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MockTestHistoryPage() {
  const attempts = [
    {
      id: "attempt-1",
      testTitle: "SSC CGL Full Length Mock Test 01",
      attemptedDate: "27-09-2026",
      score: 78.5,
      totalMarks: 100,
      accuracy: "86%",
      timeTaken: "02:42 Hrs",
      status: "Passed",
    },
    {
      id: "attempt-2",
      testTitle: "WBCS Prelims GS Paper Mock 02",
      attemptedDate: "20-09-2026",
      score: 64.0,
      totalMarks: 100,
      accuracy: "74%",
      timeTaken: "02:55 Hrs",
      status: "Passed",
    },
  ];

  return (
    <div className="space-y-5 w-full pb-16">
      <div className="flex items-center gap-2.5 pb-1 border-b border-slate-200/60">
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

      <div className="space-y-3">
        {attempts.map((att) => (
          <Card
            key={att.id}
            className="p-4 sm:p-5 bg-white border border-slate-200/80 rounded-md shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {att.testTitle}
                </h3>
                <Badge variant="blue">Completed</Badge>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
                <span>Attempted on: <strong>{att.attemptedDate}</strong></span>
                <span>Time taken: <strong>{att.timeTaken}</strong></span>
                <span>Accuracy: <strong className="text-emerald-600">{att.accuracy}</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Score
                </span>
                <span className="text-lg font-black text-sky-600">
                  {att.score}
                  <span className="text-xs font-semibold text-slate-400">
                    /{att.totalMarks}
                  </span>
                </span>
              </div>

              <Link href="/mock-tests/mock-1/take">
                <Button
                  variant="outline"
                  className="h-8 px-3 text-xs font-bold rounded-md"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Re-test
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
