import React from "react";
import { Package, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditOrder } from "../api/types";

interface OrderHistoryListProps {
  orders: CreditOrder[];
  isLoading: boolean;
}

export function OrderHistoryList({ orders, isLoading }: OrderHistoryListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-20 bg-slate-100 rounded-lg animate-pulse border border-slate-200"
          />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card className="p-8 text-center bg-white border border-slate-200/80 rounded-lg space-y-2">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Package className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-800">No Orders Placed Yet</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore available course packages and request a callback to activate your study pass.
        </p>
      </Card>
    );
  }

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 2:
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200/80 text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Confirmed
          </Badge>
        );
      case 1:
        return (
          <Badge className="bg-sky-50 text-sky-700 border-sky-200/80 text-[10px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-600" />
            Placed
          </Badge>
        );
      case 3:
        return (
          <Badge className="bg-rose-50 text-rose-700 border-rose-200/80 text-[10px] font-bold flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" />
            Rejected
          </Badge>
        );
      case 0:
      default:
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200/80 text-[10px] font-bold flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            Pending Callback
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Card
          key={order.id}
          className="p-4 bg-white border border-slate-200/80 rounded-lg shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between gap-3 flex-wrap"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Order #{order.id}
              </span>
              {getStatusBadge(order.status ?? 0)}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Type: {order.from === 1 ? "CRM Assigned" : "Student Request"}</span>
              {order.created_at && (
                <>
                  <span>•</span>
                  <span>{new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}</span>
                </>
              )}
            </div>

            {order.note && (
              <p className="text-xs text-slate-600 italic">
                &ldquo;{order.note}&rdquo;
              </p>
            )}
          </div>

          <div className="text-right shrink-0">
            {Boolean(order.amount) && (
              <span className="text-sm font-black text-slate-900 block">
                ₹{order.amount?.toLocaleString("en-IN")}
              </span>
            )}
            {Boolean(order.credit) && (
              <span className="text-xs font-semibold text-sky-600">
                {order.credit} Credits
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
