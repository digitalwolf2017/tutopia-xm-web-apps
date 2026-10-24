"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Package,
  Clock,
  Wallet,
  Sparkles,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth-context";
import {
  useCreditOrdersQuery,
  useSubscriptionPlansQuery,
  useWalletQuery,
} from "@/features/subscriptions/api/hooks";
import { SubscriptionPlan } from "@/features/subscriptions/api/types";
import { SubscriptionPlanCard } from "@/features/subscriptions/components/subscription-plan-card";
import { OrderRequestDialog } from "@/features/subscriptions/components/order-request-dialog";
import { OrderHistoryList } from "@/features/subscriptions/components/order-history-list";
import { WalletCard } from "@/features/subscriptions/components/wallet-card";

function SubscriptionsContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "plans";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Live queries
  const { data: plans = [], isLoading: isPlansLoading } = useSubscriptionPlansQuery();
  const { data: orders = [], isLoading: isOrdersLoading } = useCreditOrdersQuery();
  const { data: walletData, isLoading: isWalletLoading } = useWalletQuery();

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  // Distinct board categories for filter pills slider
  const boardCategories = useMemo(() => {
    const set = new Set<string>();
    plans.forEach((p) => {
      if (p.board_name && p.board_name.trim()) set.add(p.board_name.trim());
    });
    return ["All", ...Array.from(set)];
  }, [plans]);

  // Filter plans by search query & category
  const filteredPlans = useMemo(() => {
    return plans.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.board_name?.trim() === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      const matchesSearch =
        p.display_name.toLowerCase().includes(q) ||
        (p.display_name_in_english &&
          p.display_name_in_english.toLowerCase().includes(q)) ||
        (p.board_name && p.board_name.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [plans, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 w-full max-w-5xl pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200/70">
        <div className="flex items-center gap-2.5">
          <Link
            href="/profile"
            className="p-1.5 -ml-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                Subscriptions & Orders
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Live Hub
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Manage study passes, course packages, assisted order requests, and wallet credits
            </p>
          </div>
        </div>
      </div>

      {/* Active Pass Hero Card */}
      <Card className="p-5 sm:p-6 bg-gradient-to-r from-sky-700 via-sky-800 to-indigo-900 text-white rounded-lg shadow-sm border-0 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded">
              Current Pass
            </span>
            <h2 className="text-lg sm:text-xl font-black mt-1 text-white">
              {user?.isSubscribed
                ? "Combined Competitive All-Access Pass"
                : "Free Explorer Tier"}
            </h2>
            <p className="text-xs text-sky-100">
              {user?.isSubscribed
                ? "Full access to all Live Batches, Chapter MCQs, and Computer-Based Tests"
                : "Free access to topic demo lectures and syllabus previews. Upgrade to unlock all courses."}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-sky-100 border-t border-sky-600/60 pt-3">
          <div className="flex items-center justify-between">
            <span>Student Name:</span>
            <strong className="text-white">{user?.name || "Student"}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Status:</span>
            <span className="font-bold text-amber-300">
              {user?.isSubscribed ? "Active Subscriber" : "Free Explorer"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Access Privileges:</span>
            <span className="text-sky-200">
              {user?.isSubscribed
                ? "Unlimited Videos + Live Classes + CBT Mocks"
                : "Introductory Chapters & Topic Quizzes"}
            </span>
          </div>
        </div>

        {!user?.isSubscribed && (
          <div className="pt-1">
            <Button
              onClick={() => setActiveTab("plans")}
              variant="tutopia-yellow"
              className="font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 h-9 rounded-md text-xs cursor-pointer shadow-xs"
            >
              Explore Packages & Upgrade
            </Button>
          </div>
        )}
      </Card>

      {/* Horizontal Slider Tabs Navigation */}
      <div className="w-full space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x -mx-1 px-1">
          <button
            type="button"
            onClick={() => setActiveTab("plans")}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer snap-start ${
              activeTab === "plans"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-2xs"
            }`}
          >
            <Package className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Available Packages ({plans.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer snap-start ${
              activeTab === "orders"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-2xs"
            }`}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">My Orders & Requests ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("wallet")}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer snap-start ${
              activeTab === "wallet"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-2xs"
            }`}
          >
            <Wallet className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Wallet & Credits</span>
          </button>
        </div>

        {/* Search & Board Filter Bar (Visible when on Plans tab) */}
        {activeTab === "plans" && (
          <div className="space-y-2.5 pt-1">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search packages by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 shadow-2xs"
              />
            </div>

            {/* Board / Track Filter Pills Slider */}
            {boardCategories.length > 2 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
                {boardCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer snap-start ${
                      selectedCategory === cat
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tab 1: Available Plans */}
      {activeTab === "plans" && (
        <div className="space-y-4 pt-1">
          {isPlansLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-slate-100 rounded-lg animate-pulse border border-slate-200"
                />
              ))}
            </div>
          ) : filteredPlans.length === 0 ? (
            <Card className="p-8 text-center bg-white border border-slate-200/80 rounded-lg space-y-2">
              <Package className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No Packages Found</h4>
              <p className="text-xs text-slate-500">
                Try refining your search keyword or selecting &quot;All&quot; categories.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPlans.map((plan, idx) => (
                <SubscriptionPlanCard
                  key={plan.plan_id || idx}
                  plan={plan}
                  isPopular={idx === 0 || plan.is_combo === 1}
                  onSelectPlan={handleSelectPlan}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Orders History */}
      {activeTab === "orders" && (
        <div className="space-y-4 pt-1">
          <OrderHistoryList orders={orders} isLoading={isOrdersLoading} />
        </div>
      )}

      {/* Tab 3: Wallet */}
      {activeTab === "wallet" && (
        <div className="space-y-4 pt-1">
          <WalletCard
            total={walletData?.total ?? 0}
            transactions={walletData?.data ?? []}
            isLoading={isWalletLoading}
          />
        </div>
      )}

      {/* Interactive Order Request Callback Dialog */}
      <OrderRequestDialog
        plan={selectedPlan}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 space-y-4 max-w-5xl">
          <div className="h-8 w-48 bg-slate-100 rounded animate-pulse" />
          <div className="h-44 bg-slate-100 rounded-lg animate-pulse" />
        </div>
      }
    >
      <SubscriptionsContent />
    </Suspense>
  );
}
