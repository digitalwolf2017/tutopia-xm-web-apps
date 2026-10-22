"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link
          href="/more"
          className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Terms & Conditions
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-sm text-slate-600 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900">
          1. Student Account & Usage
        </h2>
        <p>
          Your Tutopia Exam subscription is personal to your registered mobile
          number and may not be shared or resold. Simultaneous active logins
          across unauthorized devices may lead to automated session restrictions.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">
          2. Intellectual Property & Study Material
        </h2>
        <p>
          All mock test questions, video lectures, and Bengali GK study notes
          are proprietary to Tutopia Exam. Any reproduction, distribution, or
          screen recording without authorization is strictly prohibited.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">
          3. Subscriptions & Refund Policy
        </h2>
        <p>
          Yearly subscriptions provide full access to selected batches and mock
          test portals for the specified duration. For billing inquiries, contact
          helpline: 9804490328.
        </p>
      </div>
    </div>
  );
}
