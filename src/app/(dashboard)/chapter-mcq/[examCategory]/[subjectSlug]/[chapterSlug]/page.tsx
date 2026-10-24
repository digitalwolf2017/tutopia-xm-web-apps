"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  Loader2,
  BookOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useChapterPracticesQuery,
  useSetPracticeAnswerMutation,
  useClearPracticeAnswersMutation,
  useChaptersQuery,
  useCompetitiveTypeDetailQuery,
} from "@/features/subjects/api/hooks";
import { PracticeOption } from "@/features/subjects/api/types";

export default function ChapterMcqQuizRunnerPage() {
  const params = useParams();
  const router = useRouter();

  const examCategory = (params?.examCategory as string) || "";
  const subjectSlug = (params?.subjectSlug as string) || "";
  const chapterSlug = (params?.chapterSlug as string) || "";
  const typeId = Number(examCategory) || 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // 1. Fetch category & subject info for breadcrumbs
  const { data: categoryDetail } = useCompetitiveTypeDetailQuery(typeId);

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

  const { data: chaptersData } = useChaptersQuery(subjectId);
  const chaptersList = chaptersData?.chapters || [];

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

  // 2. Fetch live practice questions
  const {
    data: practiceData,
    isLoading,
  } = useChapterPracticesQuery(activeChapterId);

  const questions = practiceData?.questions || [];
  const setAnswerMutation = useSetPracticeAnswerMutation();
  const clearAnswersMutation = useClearPracticeAnswersMutation();

  const currentQuestion = questions[currentIndex] || null;
  const currentSelectedOptionId = currentQuestion
    ? selectedAnswers[currentQuestion.id]
    : undefined;

  const subjectName = chaptersData?.subject?.subject_name || "Subject";
  const chapterName = currentChapter?.chapter_name || "Chapter";

  // Score statistics
  const scoreStats = useMemo(() => {
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach((q) => {
      const chosenOptionId = selectedAnswers[q.id];
      if (chosenOptionId) {
        const chosenOption = q.com_practice_options.find((o) => o.id === chosenOptionId);
        if (chosenOption && chosenOption.correct === 1) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    return { correctCount, incorrectCount, attemptedCount, accuracy };
  }, [questions, selectedAnswers]);

  const handleSelectOption = (option: PracticeOption) => {
    if (!currentQuestion) return;
    if (currentSelectedOptionId !== undefined) return; // already answered

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option.id,
    }));

    // Send answer to live backend
    setAnswerMutation.mutate({
      questionId: currentQuestion.id,
      optionId: option.id,
    });
  };

  const handleRetake = async () => {
    if (activeChapterId) {
      await clearAnswersMutation.mutateAsync(activeChapterId);
    }
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Loading View
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="text-sm font-medium">Loading chapter practice questions...</p>
      </div>
    );
  }

  // Empty View
  if (!isLoading && questions.length === 0) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto py-10 px-4">
        <div className="text-center py-12 bg-white rounded-md border border-slate-200/80 p-6 space-y-3 shadow-2xs">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">
            No Practice MCQs Available Yet
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Practice questions for {chapterName} will be published shortly by Tutopia faculty.
          </p>
          <div className="pt-2">
            <Link
              href={`/chapter-mcq/${examCategory}/${subjectId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Chapters</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4 space-y-5 animate-in fade-in duration-300">
        <Card className="p-6 bg-white border border-slate-200/80 rounded-lg shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 mx-auto flex items-center justify-center text-amber-500 shadow-2xs">
            <Trophy className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1.5">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Chapter MCQ Completed
            </span>
            <h1 className="text-xl font-black text-slate-900">
              {chapterName}
            </h1>
            <p className="text-xs text-slate-500">{subjectName}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 py-2">
            <div className="p-3 rounded-md bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium block">Total</span>
              <span className="text-lg font-bold text-slate-900">{questions.length}</span>
            </div>
            <div className="p-3 rounded-md bg-emerald-50 border border-emerald-100">
              <span className="text-[11px] text-emerald-700 font-medium block">Correct</span>
              <span className="text-lg font-bold text-emerald-700">{scoreStats.correctCount}</span>
            </div>
            <div className="p-3 rounded-md bg-rose-50 border border-rose-100">
              <span className="text-[11px] text-rose-700 font-medium block">Incorrect</span>
              <span className="text-lg font-bold text-rose-700">{scoreStats.incorrectCount}</span>
            </div>
          </div>

          {/* Accuracy Score */}
          <div className="p-3.5 rounded-md bg-emerald-50/80 border border-emerald-100 flex items-center justify-between">
            <div className="text-left">
              <span className="text-xs font-bold text-slate-900 block">Overall Accuracy</span>
              <span className="text-[11px] text-slate-500">
                {scoreStats.correctCount} out of {scoreStats.attemptedCount} attempted correctly
              </span>
            </div>
            <span className="text-2xl font-black text-emerald-600">
              {scoreStats.accuracy}%
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 pt-2">
            <Button
              onClick={handleRetake}
              disabled={clearAnswersMutation.isPending}
              variant="outline"
              className="flex-1 text-xs font-semibold gap-1.5 cursor-pointer h-10 border-slate-200 hover:bg-slate-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{clearAnswersMutation.isPending ? "Resetting..." : "Retake Practice"}</span>
            </Button>
            <Button
              onClick={() => router.push(`/chapter-mcq/${examCategory}/${subjectId}`)}
              className="flex-1 text-xs font-semibold gap-1.5 cursor-pointer h-10 bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>All Chapters</span>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Active Quiz Runner View
  return (
    <div className="max-w-2xl mx-auto pb-16 space-y-4">
      {/* 1. Header with Breadcrumb & Close */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href={`/chapter-mcq/${examCategory}/${subjectId}`}
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            title="Exit practice"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {chapterName} — Practice Quiz
            </h1>
            <p className="text-[11px] text-slate-500 truncate">
              {subjectName} • Instant Explanations
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* 2. Question Card */}
      {currentQuestion && (
        <Card className="p-4 sm:p-5 bg-white border border-slate-200/80 rounded-lg shadow-2xs space-y-4">
          <div className="flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              Q{currentIndex + 1}
            </span>
            <div className="space-y-3 flex-1 min-w-0">
              <h2 className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {currentQuestion.question}
              </h2>

              {/* Optional Question Image */}
              {currentQuestion.question_image && (
                <div className="relative w-full max-h-64 aspect-video rounded-md overflow-hidden bg-slate-50 border border-slate-100">
                  <Image
                    src={currentQuestion.question_image}
                    alt={`Question ${currentIndex + 1}`}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-2 pt-2">
            {currentQuestion.com_practice_options.map((option, optIdx) => {
              const optLabel = String.fromCharCode(65 + optIdx); // A, B, C, D
              const isSelected = currentSelectedOptionId === option.id;
              const hasAnswered = currentSelectedOptionId !== undefined;
              const isCorrectOption = option.correct === 1;

              let optionClasses =
                "border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 text-slate-800";
              let badgeClasses = "bg-slate-100 text-slate-600";

              if (hasAnswered) {
                if (isCorrectOption) {
                  optionClasses = "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium";
                  badgeClasses = "bg-emerald-600 text-white";
                } else if (isSelected && !isCorrectOption) {
                  optionClasses = "border-rose-500 bg-rose-50/70 text-rose-950 font-medium";
                  badgeClasses = "bg-rose-600 text-white";
                } else {
                  optionClasses = "border-slate-200 opacity-60 text-slate-500";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-3 rounded-md border transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${optionClasses}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-md text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${badgeClasses}`}
                    >
                      {optLabel}
                    </span>
                    <span className="text-xs sm:text-sm">{option.option}</span>
                  </div>

                  {hasAnswered && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 3. Explanation Card (Revealed after answering) */}
          {currentSelectedOptionId !== undefined && (
            <div className="p-3.5 rounded-md bg-amber-50/80 border border-amber-200/80 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Explanation & Correct Concept</span>
              </div>

              {currentQuestion.explanation_details ? (
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentQuestion.explanation_details}
                </p>
              ) : (
                <p className="text-xs text-slate-600">
                  The correct option is{" "}
                  <strong>
                    {currentQuestion.com_practice_options.find((o) => o.correct === 1)?.option || "highlighted in green"}
                  </strong>
                  .
                </p>
              )}

              {/* Optional Explanation Diagram / Image */}
              {currentQuestion.explanation_image && (
                <div className="relative w-full max-h-56 aspect-video rounded-md overflow-hidden bg-white border border-amber-100 mt-2">
                  <Image
                    src={currentQuestion.explanation_image}
                    alt="Explanation Diagram"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {/* 4. Bottom Controls */}
      <div className="flex items-center justify-between pt-2">
        <Button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          variant="outline"
          className="text-xs font-medium gap-1 cursor-pointer h-9 px-3 border-slate-200 hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button
            onClick={() => setIsCompleted(true)}
            className="text-xs font-bold gap-1 cursor-pointer h-9 px-4 bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs"
          >
            <span>Finish Quiz</span>
            <CheckCircle2 className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            className="text-xs font-bold gap-1 cursor-pointer h-9 px-4 bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* 5. Question Palette Dots */}
      <div className="pt-2 flex flex-wrap gap-1.5 justify-center">
        {questions.map((q, idx) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isCurrent = currentIndex === idx;

          let dotStyle = "bg-slate-100 text-slate-600 border-slate-200";
          if (isAnswered) {
            const chosen = q.com_practice_options.find((o) => o.id === selectedAnswers[q.id]);
            if (chosen && chosen.correct === 1) {
              dotStyle = "bg-emerald-50 text-emerald-700 border-emerald-300";
            } else {
              dotStyle = "bg-rose-50 text-rose-700 border-rose-300";
            }
          }
          if (isCurrent) {
            dotStyle += " ring-2 ring-emerald-500 ring-offset-1 font-bold";
          }

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-7 h-7 rounded-md text-[11px] font-semibold border flex items-center justify-center transition-all cursor-pointer ${dotStyle}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
