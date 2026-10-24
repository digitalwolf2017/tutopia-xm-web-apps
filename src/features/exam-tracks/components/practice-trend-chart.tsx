import React, { useState } from "react";
import { GraphDataPoint } from "../api/types";

interface PracticeTrendChartProps {
  questionPoints: GraphDataPoint[];
  mockTestPoints: GraphDataPoint[];
  totalQuestions?: number;
  totalMockTests?: number;
}

export function PracticeTrendChart({
  questionPoints,
  mockTestPoints,
  totalQuestions = 0,
  totalMockTests = 0,
}: PracticeTrendChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const length = Math.max(questionPoints.length, mockTestPoints.length, 7);
  const qList = questionPoints.length > 0 ? questionPoints : Array(length).fill({ total: 0 });
  const mList = mockTestPoints.length > 0 ? mockTestPoints : Array(length).fill({ total: 0 });

  const maxVal = Math.max(
    ...qList.map((p) => p.total),
    ...mList.map((p) => p.total * 5),
    10
  );

  return (
    <div className="p-4 sm:p-5 bg-white border border-slate-200/80 rounded-lg shadow-2xs space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">
            MCQs & Mock Tests Consistency
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>MCQs ({totalQuestions})</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Mock Tests ({totalMockTests})</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative pt-6 pb-2">
        <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-3 px-1 border-b border-slate-100">
          {qList.map((qPoint, idx) => {
            const mPoint = mList[idx] || { total: 0 };
            const qHeight = Math.max((qPoint.total / maxVal) * 100, 4);
            const mHeight = Math.max(((mPoint.total * 5) / maxVal) * 100, mPoint.total > 0 ? 8 : 0);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 z-20 px-2 py-1 bg-slate-900 text-white text-[10px] sm:text-[11px] font-semibold rounded shadow-lg whitespace-nowrap animate-in fade-in duration-150">
                    <div>MCQs: {qPoint.total}</div>
                    <div>Mock Tests: {mPoint.total}</div>
                  </div>
                )}

                {/* Dual Bars side-by-side */}
                <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-full">
                  {/* MCQ Bar */}
                  <div
                    style={{ height: `${qHeight}%` }}
                    className={`w-full max-w-[12px] rounded-t-sm transition-all duration-300 ${
                      qPoint.total > 0
                        ? "bg-emerald-500"
                        : "bg-slate-100 group-hover:bg-slate-200"
                    }`}
                  />
                  {/* Mock Test Bar */}
                  <div
                    style={{ height: `${mHeight}%` }}
                    className={`w-full max-w-[12px] rounded-t-sm transition-all duration-300 ${
                      mPoint.total > 0
                        ? "bg-amber-500"
                        : "bg-slate-100 group-hover:bg-slate-200"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-Axis */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-3 px-1 pt-2">
          {qList.map((p, idx) => {
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
