"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NotificationsListSkeleton({ rows = 6 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-start justify-between gap-4 p-4 rounded-xl border bg-white"
        >
          {/* LEFT SIDE */}
          <div className="flex gap-4 w-full">
            {/* ICON */}
            <Skeleton circle width={40} height={40} />

            <div className="flex-1 space-y-2">
              {/* TITLE */}
              <Skeleton width="40%" height={14} />

              {/* MESSAGE */}
              <Skeleton width="80%" height={12} />
              <Skeleton width="60%" height={12} />

              {/* DATE */}
              <Skeleton width="25%" height={10} />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <Skeleton width={32} height={32} borderRadius={8} />
            <Skeleton width={32} height={32} borderRadius={8} />
            <Skeleton width={32} height={32} borderRadius={8} />
          </div>
        </div>
      ))}
    </div>
  );
}