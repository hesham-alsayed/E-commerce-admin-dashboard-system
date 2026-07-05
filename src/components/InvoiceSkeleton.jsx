"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function InvoiceSkeleton() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-2">
        <Skeleton height={24} width={160} />
        <Skeleton height={16} width={280} />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-4 space-y-3">
            <Skeleton height={40} width={40} borderRadius={8} />
            <Skeleton height={12} width={`70%`} />
            <Skeleton height={16} width={`50%`} />
          </div>
        ))}
      </div>

      {/* TABLE AREA */}
      <div className="border rounded-xl p-4 space-y-4 bg-white">
        {/* FILTERS */}
        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={38} width={140} />
          ))}
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} height={18} />
          ))}
        </div>

        {/* TABLE ROWS */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-7 gap-4">
              {Array.from({ length: 7 }).map((_, j) => (
                <Skeleton key={j} height={16} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
