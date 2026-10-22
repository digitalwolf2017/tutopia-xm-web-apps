import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Award, CheckCircle } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Hero Panel (Desktop branding) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-sky-700 via-sky-800 to-indigo-950 p-12 text-white relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>

        {/* Top Brand Logo */}
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src="/images/logo-new.svg"
            alt="Tutopia Exam"
            width={180}
            height={50}
            className="h-11 w-auto object-contain bg-white/95 px-3 py-1.5 rounded-lg shadow-sm"
            priority
          />
        </Link>

        {/* Center Feature Highlights */}
        <div className="relative z-10 space-y-6 max-w-md">
          <div className="inline-block bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-md uppercase tracking-wider">
            সরকারি চাকরির সেরা প্রস্তুতি
          </div>
          <h2 className="text-3xl font-extrabold leading-snug">
            SSC, WBCS, রেল ও ব্যাংকিং পরীক্ষার বিশ্বস্ত প্ল্যাটফর্ম
          </h2>

          <div className="space-y-4 pt-2">
            {[
              "লাইভ ইন্টারঅ্যাক্টিভ ক্লাস ও রেকর্ড ভিডিও লেকচার",
              "১০০+ ফুল লেংথ CBT মক টেস্ট ও স্কোর অ্যানালিটিক্স",
              "অভিজ্ঞ শিক্ষক ও বিষয়ভিত্তিক শর্টকাট নোটস",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-sm font-medium text-sky-100">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="relative z-10 pt-8 border-t border-sky-600/50 flex items-center justify-between text-xs text-sky-200">
          <span>হেল্পলাইন: 9804490328</span>
          <span>© 2026 Tutopia Exam Web. All rights reserved.</span>
        </div>
      </div>

      {/* Right Form Container */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Brand Header */}
          <div className="lg:hidden text-center mb-8 flex flex-col items-center">
            <Link href="/" className="inline-block mb-2">
              <Image
                src="/images/logo-new.svg"
                alt="Tutopia Exam"
                width={160}
                height={46}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-xs font-semibold text-sky-600">
              চাকরির সেরা প্রস্তুতি প্ল্যাটফর্ম
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
