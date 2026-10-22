"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  PieChart,
  Landmark,
  Lightbulb,
  Sparkles,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { mockVideoClassCategories } from "@/lib/mock-data";

export default function SubjectsCategoriesPage() {
  const renderCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case "book-gear":
        return (
          <div className="w-10 h-10 rounded-md bg-sky-50 flex items-center justify-center text-sky-600 mb-2.5">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "charts":
        return (
          <div className="w-10 h-10 rounded-md bg-amber-50 flex items-center justify-center text-amber-600 mb-2.5">
            <PieChart className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "bank":
        return (
          <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2.5">
            <Landmark className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "lightbulb":
        return (
          <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2.5">
            <Lightbulb className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "single-bulb":
      default:
        return (
          <div className="w-10 h-10 rounded-md bg-sky-50 flex items-center justify-center text-sky-600 mb-2.5">
            <Sparkles className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-5 w-full pb-12">
      {/* Top Header */}
      <div className="flex items-center gap-2.5 pb-1 border-b border-slate-200/60">
        <Link
          href="/"
          className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            Video Classes
          </h1>
          <p className="text-xs text-slate-500">
            Select an exam track to access subject and chapter video lectures
          </p>
        </div>
      </div>

      {/* Quick Action Pill */}
      <Link
        href="/subjects/ssc-rail-wbcs"
        className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 text-slate-900 rounded-md border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99] group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-sky-50 flex items-center justify-center text-sky-600">
            <MessageSquare className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-bold text-sm block">Competitive Exam</span>
            <span className="text-[11px] text-slate-500 font-normal">
              Direct access to combined syllabus explorer
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
      </Link>

      {/* Categories Grid (Clean cards, NO bottom border) */}
      <div className="pt-1 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
          Available Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {mockVideoClassCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/subjects/${cat.slug}`}
              className="group block"
            >
              <Card className="h-full flex flex-col items-center justify-center text-center p-4 bg-white hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer min-h-[140px]">
                {renderCategoryIcon(cat.iconType)}
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                  {cat.title}
                </h3>
                <span className="text-[10px] text-slate-400 mt-0.5 font-medium line-clamp-1">
                  {cat.itemCountDescription}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
