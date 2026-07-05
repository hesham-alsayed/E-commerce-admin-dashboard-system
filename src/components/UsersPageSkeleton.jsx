"use client";

import Skeleton from "react-loading-skeleton";

export default function UsersPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* 🔥 PAGE INFO */}
      <div className="space-y-2">
        <Skeleton height={24} width={200} />
        <Skeleton height={14} width={350} />
      </div>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border rounded-2xl p-5 space-y-4 bg-white">
            <div className="flex justify-between items-center">
              <Skeleton height={14} width={100} />
              <Skeleton height={40} width={40} borderRadius={12} />
            </div>

            <Skeleton height={28} width={80} />

            <Skeleton height={14} width={120} />
          </div>
        ))}
      </div>

      {/* 🔥 FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton height={12} width={80} />
            <Skeleton height={36} />
          </div>
        ))}
      </div>

      {/* 🔥 TABLE */}
      <div className="border rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-6 gap-4 p-4 border-b bg-gray-50">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={14} />
          ))}
        </div>

        {/* ROWS */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 p-4 border-b items-center"
          >
            {/* USER */}
            <div className="flex items-center gap-3">
              <Skeleton circle height={36} width={36} />
              <div className="space-y-1">
                <Skeleton height={12} width={80} />
                <Skeleton height={10} width={60} />
              </div>
            </div>

            {/* EMAIL */}
            <Skeleton height={12} width={120} />

            {/* ROLE */}
            <Skeleton height={20} width={60} />

            {/* ACTIVE */}
            <Skeleton height={20} width={70} />

            {/* VERIFIED */}
            <Skeleton height={20} width={90} />

            {/* DATE */}
            <Skeleton height={12} width={80} />
          </div>
        ))}
      </div>
    </div>
  );
}
