import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface GraphMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  accentColor?: "sky" | "amber" | "emerald" | "purple";
}

export function GraphMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  accentColor = "sky",
}: GraphMetricCardProps) {
  const colorStyles = {
    sky: {
      bg: "bg-sky-50 border-sky-200/80 text-sky-600",
      accent: "text-sky-600",
    },
    amber: {
      bg: "bg-amber-50 border-amber-200/80 text-amber-600",
      accent: "text-amber-600",
    },
    emerald: {
      bg: "bg-emerald-50 border-emerald-200/80 text-emerald-600",
      accent: "text-emerald-600",
    },
    purple: {
      bg: "bg-purple-50 border-purple-200/80 text-purple-600",
      accent: "text-purple-600",
    },
  }[accentColor];

  return (
    <Card className="p-4 bg-white border border-slate-200/80 rounded-lg shadow-2xs hover:shadow-xs transition-shadow space-y-2.5">
      <div className="flex items-center justify-between">
        <div
          className={`w-9 h-9 rounded-md border flex items-center justify-center shrink-0 ${colorStyles.bg}`}
        >
          <Icon className="w-4 h-4 stroke-[2.2]" />
        </div>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {badge}
          </span>
        )}
      </div>

      <div>
        <span className="text-xl sm:text-2xl font-black text-slate-900 block tracking-tight">
          {value}
        </span>
        <h4 className="text-xs font-semibold text-slate-700">{title}</h4>
        {subtitle && (
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
}
