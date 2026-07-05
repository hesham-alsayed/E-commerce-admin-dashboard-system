"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CustomersTableSkeleton() {
  return (
    <div className="border rounded-2xl bg-white overflow-hidden p-4">
      {/* header */}
      <div className="grid grid-cols-7 gap-4 pb-3 border-b">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} height={14} />
        ))}
      </div>

      {/* rows */}
      {Array.from({ length: 6 }).map((_, row) => (
        <div
          key={row}
          className="grid grid-cols-7 gap-4 py-3 border-b last:border-0"
        >
          {Array.from({ length: 7 }).map((_, col) => (
            <Skeleton key={col} height={12} />
          ))}
        </div>
      ))}
    </div>
  );
}
