"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, CreditCard, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCurrentUser } from "@/lib/mock-data";

export default function SubscriptionsPage() {
  return (
    <div className="space-y-5 w-full max-w-4xl pb-16">
      <div className="flex items-center gap-2.5 pb-1 border-b border-slate-200/60">
        <Link
          href="/profile"
          className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            Subscriptions & Passes
          </h1>
          <p className="text-xs text-slate-500">
            Manage your active study passes, renewals, and package upgrades
          </p>
        </div>
      </div>

      {/* Active Plan Card (Clean, rounded-md) */}
      <Card className="p-5 sm:p-6 bg-gradient-to-r from-sky-700 via-sky-800 to-indigo-900 text-white rounded-md shadow-sm border-0 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
              Current Active Pass
            </span>
            <h2 className="text-lg sm:text-xl font-black mt-1 text-white">
              {mockCurrentUser.subscriptionPlan}
            </h2>
          </div>
          <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
        </div>

        <div className="space-y-1.5 text-xs text-sky-100 border-t border-sky-600/60 pt-3">
          <div className="flex items-center justify-between">
            <span>Valid Until:</span>
            <strong className="text-white">
              {mockCurrentUser.subscriptionValidUntil}
            </strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Access Tier:</span>
            <strong className="text-amber-300">All Live Batches + CBT Mocks</strong>
          </div>
        </div>

        <div className="flex gap-2.5 pt-1">
          <Button
            variant="tutopia-yellow"
            className="flex-1 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 h-9 rounded-md text-xs"
          >
            Extend / Renew Pass
          </Button>
        </div>
      </Card>

      {/* Available Upgrades */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
          Available Exam Packages
        </h3>

        <Card className="p-4 bg-white border border-slate-200/80 rounded-md shadow-2xs flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                WBCS Executive 2026-27 Advanced Batch
              </h4>
              <Badge variant="yellow">Recommended</Badge>
            </div>
            <p className="text-xs text-slate-500 line-clamp-1">
              Prelims + Mains comprehensive coverage with answer writing evaluation
            </p>
          </div>
          <div className="text-right pl-3 shrink-0">
            <span className="text-sm font-black text-slate-900 block">
              ₹2499
            </span>
            <Button variant="tutopia-blue" size="sm" className="mt-1 font-bold h-8 text-xs rounded-md">
              Upgrade
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
