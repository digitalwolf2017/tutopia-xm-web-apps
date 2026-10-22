import React from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AppHeader />
      <div className="flex-1 flex w-full">
        <AppSidebar />
        <main className="flex-1 min-w-0 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 py-5 flex flex-col justify-between">
          <div className="w-full">{children}</div>

          {/* Clean Desktop App Footer */}
          <footer className="hidden md:flex items-center justify-between pt-8 mt-12 border-t border-slate-200/70 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600">Tutopia Exam</span>
              <span>•</span>
              <span>Web Portal v1.0</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/more/terms"
                className="hover:text-slate-600 transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/more/report-issue"
                className="hover:text-slate-600 transition-colors"
              >
                Help & Support
              </Link>
              <Link
                href="/profile"
                className="hover:text-slate-600 transition-colors"
              >
                My Account
              </Link>
            </div>
          </footer>
        </main>
      </div>
      <MobileBottomBar />
    </div>
  );
}
