import React from "react";
import { CheckCircle2, BookOpen, Layers, Video, FileText, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SubscriptionPlan } from "../api/types";

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  onSelectPlan: (plan: SubscriptionPlan) => void;
  isPopular?: boolean;
}

export function SubscriptionPlanCard({
  plan,
  onSelectPlan,
  isPopular = false,
}: SubscriptionPlanCardProps) {
  const savings = Math.max(0, plan.student_price - plan.FinalAmount);
  const discountPercent =
    plan.student_price > 0
      ? Math.round((savings / plan.student_price) * 100)
      : 0;

  return (
    <Card
      className={`relative p-5 sm:p-6 bg-white rounded-lg border transition-all duration-200 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 ${
        isPopular
          ? "border-sky-500/80 shadow-xs ring-1 ring-sky-500/20"
          : "border-slate-200/80 shadow-2xs hover:border-slate-300"
      }`}
    >
      {/* Popular / Combo Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-5">
          <Badge className="bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold px-2.5 py-0.5 shadow-2xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Most Popular Pass
          </Badge>
        </div>
      )}

      <div className="space-y-4">
        {/* Header & Title */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {plan.board_name || "Competitive Pass"}
            </span>
            {plan.is_combo === 1 && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-full">
                All-in-One Combo
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug pt-1">
            {plan.display_name}
          </h3>

          {plan.display_name_in_english && (
            <p className="text-xs font-medium text-slate-500">
              {plan.display_name_in_english}
            </p>
          )}
        </div>

        {/* Pricing Block */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              ₹{plan.FinalAmount.toLocaleString("en-IN")}
            </span>
            {plan.student_price > plan.FinalAmount && (
              <span className="text-sm font-semibold text-slate-400 line-through">
                ₹{plan.student_price.toLocaleString("en-IN")}
              </span>
            )}
            {discountPercent > 0 && (
              <Badge className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5">
                {discountPercent}% OFF
              </Badge>
            )}
          </div>
          {savings > 0 && (
            <p className="text-xs font-semibold text-emerald-700">
              You save ₹{savings.toLocaleString("en-IN")} with this pass!
            </p>
          )}
        </div>

        {/* Syllabus & Course Content Counts */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
          {Boolean(plan.totalSubjects) && (
            <div className="flex items-center gap-1.5 p-2 rounded-md bg-white border border-slate-100">
              <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
              <span>
                <strong className="text-slate-900">{plan.totalSubjects}</strong> Subjects
              </span>
            </div>
          )}
          {Boolean(plan.totalChapters) && (
            <div className="flex items-center gap-1.5 p-2 rounded-md bg-white border border-slate-100">
              <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                <strong className="text-slate-900">{plan.totalChapters}</strong> Chapters
              </span>
            </div>
          )}
          {Boolean(plan.totalTutorials) && (
            <div className="flex items-center gap-1.5 p-2 rounded-md bg-white border border-slate-100">
              <Video className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong className="text-slate-900">{plan.totalTutorials}</strong> Video Lessons
              </span>
            </div>
          )}
          {Boolean(plan.totalNotes) && (
            <div className="flex items-center gap-1.5 p-2 rounded-md bg-white border border-slate-100">
              <FileText className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong className="text-slate-900">{plan.totalNotes}</strong> Class Notes
              </span>
            </div>
          )}
        </div>

        {/* Feature Checkmarks */}
        <div className="space-y-1.5 pt-1 text-xs text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Full syllabus coverage with top educators</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Interactive chapter-wise practice quizzes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Computer-Based Test (CBT) mock exam series</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-5 mt-4 border-t border-slate-100">
        <Button
          onClick={() => onSelectPlan(plan)}
          variant={isPopular ? "tutopia-yellow" : "tutopia-blue"}
          className={`w-full h-10 text-xs sm:text-sm font-bold shadow-xs cursor-pointer ${
            isPopular
              ? "bg-amber-400 hover:bg-amber-300 text-slate-950 font-black"
              : ""
          }`}
        >
          Subscribe / Request Plan
        </Button>
      </div>
    </Card>
  );
}
