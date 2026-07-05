"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ReviewPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* TOP */}
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton height={20} width={120} />
          <Skeleton height={28} width={250} />
        </div>

        <div className="flex-1">
          <Skeleton height={120} />
        </div>
      </div>

      {/* CARDS */}
      <Skeleton height={100} />

      {/* TABLE */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <Skeleton height={40} />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} height={50} />
        ))}
      </div>
    </div>
  );
}
