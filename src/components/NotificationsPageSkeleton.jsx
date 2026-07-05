"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NotificationsPageSkeleton() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton width={200} height={20} />
          <Skeleton width={320} height={14} />
        </div>

        <Skeleton width={150} height={35} />
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl border shadow-sm p-5 space-y-5">

        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <Skeleton width={180} height={18} />
          <Skeleton width={80} height={25} />
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={40} />
          ))}
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 p-4 border rounded-xl"
            >
              <div className="flex gap-4">
                <Skeleton circle width={40} height={40} />

                <div className="space-y-2">
                  <Skeleton width={180} height={14} />
                  <Skeleton width={260} height={12} />
                  <Skeleton width={100} height={10} />
                </div>
              </div>

              <div className="flex gap-3">
                <Skeleton width={20} height={20} />
                <Skeleton width={20} height={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}