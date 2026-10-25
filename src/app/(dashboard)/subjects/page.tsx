"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCompetitiveTypesQuery } from "@/features/subjects/api/hooks";

export default function SubjectsCategoriesPage() {
  const { data: competitiveTypes, isLoading } =
    useCompetitiveTypesQuery();

  const categories = competitiveTypes || [];

  return (
    <div className="space-y-5 w-full pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
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

      </div>

      {/* Quick Action Pill */}
      <Link
        href={categories[0] ? `/subjects/${categories[0].id}` : "/subjects"}
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

      {/* Categories Grid */}
      <div className="pt-1 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
          Available Categories
        </h2>

        {isLoading && categories.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-36 rounded-md bg-slate-100 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/subjects/${cat.id}`}
                className="group block"
              >
                <Card className="h-full flex flex-col items-center justify-center text-center p-4 bg-white hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer min-h-[145px]">
                  {cat.image ? (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-2.5 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-sky-50 flex items-center justify-center text-sky-600 mb-2.5 transition-transform group-hover:scale-105">
                      <BookOpen className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  )}

                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {cat.title}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
