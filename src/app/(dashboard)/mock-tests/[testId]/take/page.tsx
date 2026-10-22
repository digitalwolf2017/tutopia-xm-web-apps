"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleQuestions = [
  {
    id: 1,
    subject: "General Awareness",
    question: "পশ্চিমবঙ্গের সবচেয়ে উঁচু পর্বতশৃঙ্গ কোনটি?",
    options: [
      { id: "A", text: "সান্দাকফু (Sandakphu)" },
      { id: "B", text: "ফালুট (Phalut)" },
      { id: "C", text: "টংলু (Tonglu)" },
      { id: "D", text: "সবরগ্রাম (Sabargram)" },
    ],
    correctAnswer: "A",
  },
  {
    id: 2,
    subject: "Mathematics",
    question: "যদি একটি ট্রেনের গতিবেগ 72 কিমি/ঘন্টা হয়, তবে সেকেন্ডে এর গতিবেগ কত মিটার?",
    options: [
      { id: "A", text: "15 m/s" },
      { id: "B", text: "20 m/s" },
      { id: "C", text: "25 m/s" },
      { id: "D", text: "18 m/s" },
    ],
    correctAnswer: "B",
  },
  {
    id: 3,
    subject: "English",
    question: "Select the most appropriate synonym of the word: 'METICULOUS'",
    options: [
      { id: "A", text: "Careful and precise" },
      { id: "B", text: "Careless" },
      { id: "C", text: "Hasty" },
      { id: "D", text: "Lazy" },
    ],
    correctAnswer: "A",
  },
  {
    id: 4,
    subject: "Reasoning",
    question: "সিরিজটি সম্পূর্ণ করুন: 2, 6, 12, 20, 30, ?",
    options: [
      { id: "A", text: "40" },
      { id: "B", text: "42" },
      { id: "C", text: "44" },
      { id: "D", text: "48" },
    ],
    correctAnswer: "B",
  },
];

export default function MockTestTakePage() {
  const router = useRouter();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(10800); // 3 hours = 10800s
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentQ = sampleQuestions[currentQuestionIdx];

  const handleSelectOption = (optId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optId,
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQuestionIdx)
        ? prev.filter((i) => i !== currentQuestionIdx)
        : [...prev, currentQuestionIdx]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col">
      {/* Top Bar with Timer & Test Title */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/mock-tests"
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-slate-900">
              SSC CGL Full Length Mock Test 01
            </h1>
            <span className="text-xs text-sky-600 font-semibold">
              Section: {currentQ.subject}
            </span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-sky-50 text-sky-800 font-bold text-xs sm:text-sm px-3 py-1.5 rounded-md border border-sky-200">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <Button
            onClick={() => setIsSubmitted(true)}
            variant="tutopia-blue"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-8 sm:h-9 px-4 rounded-md shadow-2xs"
          >
            Submit Test
          </Button>
        </div>
      </header>

      {/* Main CBT Split View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Question Pane */}
        <main className="flex-1 p-6 overflow-y-auto flex flex-col justify-between bg-slate-50">
          <div className="max-w-3xl mx-auto w-full space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-700">
                Question {currentQuestionIdx + 1} of {sampleQuestions.length}
              </span>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                +2.0 Marks / -0.50 Negative
              </span>
            </div>

            {/* Question Text */}
            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs">
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQuestionIdx] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-3 rounded-md border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? "bg-sky-50 border-sky-600 text-sky-900 ring-1 ring-sky-500 font-bold"
                        : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isSelected
                          ? "bg-sky-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-xs sm:text-sm">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="max-w-3xl mx-auto w-full pt-4 flex items-center justify-between border-t border-slate-200 mt-4">
            <button
              onClick={toggleMarkForReview}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md border transition-colors ${
                markedForReview.includes(currentQuestionIdx)
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>
                {markedForReview.includes(currentQuestionIdx)
                  ? "Marked for Review"
                  : "Mark for Review"}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx((prev) => prev - 1)}
                className="rounded-md h-9 px-3 gap-1 font-semibold text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Button>

              <Button
                variant="tutopia-blue"
                disabled={currentQuestionIdx === sampleQuestions.length - 1}
                onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                className="bg-sky-600 hover:bg-sky-700 text-white rounded-md h-9 px-3.5 gap-1 font-semibold text-xs"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </main>

        {/* Right Palette Sidebar */}
        <aside className="w-full md:w-72 bg-white border-l border-slate-200 p-4 sm:p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              Question Palette
            </h3>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sky-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-400" />
                <span>Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-200" />
                <span>Not Visited</span>
              </div>
            </div>

            {/* Numbers Grid */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {sampleQuestions.map((q, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isReview = markedForReview.includes(idx);
                const isCurrent = currentQuestionIdx === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIdx(idx)}
                    className={`h-9 rounded-md text-xs font-bold transition-all flex items-center justify-center ${
                      isCurrent
                        ? "ring-2 ring-slate-900 ring-offset-1"
                        : ""
                    } ${
                      isReview
                        ? "bg-amber-400 text-slate-950 font-black"
                        : isAnswered
                        ? "bg-sky-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              Tutopia CBT Engine v1.0 • TCS iON Pattern
            </p>
          </div>
        </aside>
      </div>

      {/* Submission Success Dialog */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center space-y-3.5 shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Test Submitted Successfully!
            </h2>
            <p className="text-xs text-slate-500">
              You answered {Object.keys(answers).length} out of{" "}
              {sampleQuestions.length} questions.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/mock-tests/history">
                <Button variant="tutopia-blue" className="w-full h-9 font-bold text-xs rounded-md">
                  View Detailed Scorecard
                </Button>
              </Link>
              <Link href="/mock-tests">
                <Button variant="outline" className="w-full h-9 font-semibold text-xs rounded-md">
                  Back to Mock Tests
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
