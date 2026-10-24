import React from "react";
import { Wallet, Coins, ArrowUpRight, ArrowDownLeft, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WalletTransaction } from "../api/types";

interface WalletCardProps {
  total: number;
  transactions: WalletTransaction[];
  isLoading: boolean;
}

export function WalletCard({ total, transactions, isLoading }: WalletCardProps) {
  if (isLoading) {
    return (
      <div className="h-48 bg-slate-100 rounded-lg animate-pulse border border-slate-200" />
    );
  }

  const getTransactionTypeBadge = (txType: number) => {
    switch (txType) {
      case 2:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-full">
            <ArrowDownLeft className="w-3 h-3" />
            Deducted
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
            <RotateCcw className="w-3 h-3" />
            Refunded
          </span>
        );
      case 1:
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
            <ArrowUpRight className="w-3 h-3" />
            Purchased / Added
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Wallet Balance Hero Banner */}
      <Card className="p-5 sm:p-6 bg-gradient-to-r from-sky-700 via-sky-800 to-indigo-900 text-white rounded-lg shadow-sm border-0 flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>Study Credit Balance</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white">
              {total.toLocaleString("en-IN")}
            </span>
            <span className="text-xs font-semibold text-sky-200">Credits Available</span>
          </div>
          <p className="text-xs text-sky-100/90 max-w-sm pt-1">
            Study credits can be used to unlock premium CBT mock tests, test series re-attempts, and specialized doubt sessions.
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-amber-300 shrink-0 border border-white/20">
          <Wallet className="w-6 h-6" />
        </div>
      </Card>

      {/* Transaction History */}
      <div className="space-y-2.5 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Credit Ledger & Transactions
        </h4>

        {transactions.length === 0 ? (
          <Card className="p-6 text-center bg-white border border-slate-200/80 rounded-lg">
            <p className="text-xs text-slate-500">No credit transactions recorded yet.</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => (
              <Card
                key={tx.id}
                className="p-3.5 bg-white border border-slate-200/80 rounded-lg shadow-2xs flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getTransactionTypeBadge(tx.transaction_type ?? 1)}
                    {tx.date && (
                      <span className="text-slate-400 text-[11px]">{tx.date}</span>
                    )}
                  </div>
                  {tx.note && (
                    <p className="text-slate-700 font-medium">{tx.note}</p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`font-black text-sm ${
                      tx.transaction_type === 2
                        ? "text-rose-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {tx.transaction_type === 2 ? "-" : "+"}
                    {tx.credit} Credits
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
