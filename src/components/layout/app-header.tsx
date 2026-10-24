"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Search,
  Command,
  ChevronDown,
  User as UserIcon,
  LogOut,
  CreditCard,
  KeyRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/auth-context";

export function AppHeader() {
  const { user, logout } = useAuth();
  const displayName = user?.name || "Student";
  const profileImage = user?.profile_image || null;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left Section: Brand Logo & Search Bar */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center shrink-0 group py-1">
            <Image
              src="/images/logo-new.svg"
              alt="Tutopia Exam"
              width={140}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Left-Aligned Search Bar */}
          <div className="hidden md:flex items-center w-64 lg:w-80">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search subjects, chapters, tests..."
                className="w-full h-8 pl-8 pr-12 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all placeholder:text-slate-400"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1 py-0.5 rounded shadow-2xs">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section: Live Badge, Notifications & Profile Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Indicator Pill */}
          <Link
            href="/live-classes"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80 hover:bg-rose-100 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
            <span>2 Live</span>
          </Link>

          {/* Search Trigger for Mobile */}
          <button
            aria-label="Search"
            className="md:hidden p-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <button
            aria-label="Notifications"
            className="relative p-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
          </button>

          <div className="h-4 w-px bg-slate-200" />

          {/* User Account Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-100/80 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-sky-500/20 group data-[state=open]:bg-slate-100"
              >
                <Avatar className="h-7 w-7 rounded-md border border-slate-200">
                  {profileImage && (
                    <AvatarImage
                      src={profileImage}
                      alt={displayName}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-sky-50 text-sky-700 font-bold text-xs rounded-md">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-800 group-hover:text-sky-600 transition-colors max-w-[120px] truncate">
                  {displayName}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 mt-1 p-1.5 shadow-xl border-slate-200">
              {/* User Bio Header */}
              <DropdownMenuLabel className="p-2 font-normal">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-9 w-9 rounded-md border border-slate-200 shrink-0">
                    {profileImage && (
                      <AvatarImage
                        src={profileImage}
                        alt={displayName}
                        className="object-cover"
                      />
                    )}
                    <AvatarFallback className="bg-sky-50 text-sky-700 font-bold text-xs rounded-md">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5 overflow-hidden">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {displayName}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {user?.mobile || user?.phone || "+91 98765 43210"}
                    </p>
                    {user?.isSubscribed ? (
                      <span className="inline-flex items-center w-fit px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80 mt-0.5">
                        Pro Student
                      </span>
                    ) : (
                      <span className="inline-flex items-center w-fit px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-50 text-sky-700 border border-sky-200/80 mt-0.5">
                        Free Explorer
                      </span>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* Menu Actions */}
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-sky-600" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/profile/subscriptions"
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>My Subscriptions</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/profile/change-password"
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-slate-500" />
                  <span>Change Password</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout Action */}
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-md cursor-pointer focus:bg-rose-50 focus:text-rose-700"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
