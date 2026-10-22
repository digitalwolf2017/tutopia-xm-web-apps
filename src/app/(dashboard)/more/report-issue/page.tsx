"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReportIssuePage() {
  const router = useRouter();
  const [category, setCategory] = useState("Video playback issue");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/more");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link
          href="/more"
          className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Report an issue
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Issue Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option>Video playback issue</option>
            <option>Mock test question error</option>
            <option>Subscription or payment issue</option>
            <option>Live class stream buffer</option>
            <option>App bug / Other</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Describe the Problem
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please detail the issue you experienced and steps to reproduce..."
            className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <Button
          type="submit"
          variant="tutopia-blue"
          className="w-full h-12 text-sm font-bold gap-2 mt-4"
        >
          {submitted ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Issue Ticket Submitted!
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Report</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
