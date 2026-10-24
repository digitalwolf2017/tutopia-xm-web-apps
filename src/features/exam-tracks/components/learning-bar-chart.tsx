import React, { useState } from "react";
import { GraphDataPoint } from "../api/types";
import { Clock } from "lucide-react";

interface LearningBarChartProps {
  dataPoints: GraphDataPoint[];
  title?: string;
  totalMinutes?: number;
}

export function LearningBarChart({
  dataPoints,
  title = "Daily Study & Watch Time",
  totalMinutes = 0,
}: LearningBarChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Normalize data points
  const points = dataPoints && dataPoints.length > 0
    ? dataPoints
    : [
        { date: "Day 1", dateFormat: "Mon", total: 0 },
        { date: "Day 2", dateFormat: "Tue", total: 0 },
        { date: "Day 3", dateFormat: "Wed", total: 0 },
        { date: "Day 4", dateFormat: "Thu", total: 0 },
        { date: "Day 5", dateFormat: "Fri", total: 0 },
        { date: "Day 6", dateFormat: "Sat", total: 0 },
        { date: "Day 7", dateFormat: "Sun", total: 0 },
      ];

  const maxVal = Math.max(...points.map((p) => p.total), 30);

  const formatMins = (mins: number) => {
    if (mins >= 60) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }
    return `${mins}m`;
  };

  return (
    <div className="p-4 sm:p-5 bg-white border border-slate-200/80 rounded-lg shadow-2xs space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-600" />
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-sky-600" />
          <span>Total: {formatMins(totalMinutes)}</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative pt-6 pb-2">
        {/* Bars Container */}
        <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-3 px-1 border-b border-slate-100">
          {points.map((p, idx) => {
            const heightPercent = Math.max((p.total / maxVal) * 100, 4);
            const isHovered = hoveredIdx === idx;
            const label = p.dateFormat || (p.date ? p.date.slice(5, 10) : `D${idx + 1}`);

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-10 z-20 px-2 py-1 bg-slate-900 text-white text-[11px] font-bold rounded shadow-lg whitespace-nowrap animate-in fade-in duration-150">
                    <span>{formatMins(p.total)}</span>
                  </div>
                )}

                {/* Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[28px] rounded-t-sm transition-all duration-300 ${
                    p.total > 0
                      ? isHovered
                        ? "bg-sky-500"
                        : "bg-gradient-to-t from-sky-600 to-sky-400 shadow-2xs"
                      : "bg-slate-100 group-hover:bg-slate-200"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* X-Axis Labels */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-3 px-1 pt-2">
          {points.map((p, idx) => {
            const label = p.dateFormat || (p.date ? p.date.slice(8, 10) : `${idx + 1}`);
            return (
              <span
                key={idx}
                className="flex-1 text-center text-[10px] sm:text-xs font-medium text-slate-400 truncate"
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
