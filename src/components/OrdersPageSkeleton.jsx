"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrdersPageSkeleton() {
  return (
    <div>
      {/* PAGE TITLE */}
      <div className="mb-6">
        <Skeleton height={25} width={120} />
        <Skeleton height={18} width={300} className="mt-2" />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border rounded-2xl">
            <Skeleton height={12} width={100} />
            <Skeleton height={30} width={60} className="mt-3" />
          </div>
        ))}
      </div>

      {/* FILTER + PAGINATION */}
      <div className="bg-white p-4 rounded-2xl mt-10 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          {/* FILTERS */}
          <div className="flex-1 flex flex-wrap gap-3">
            <Skeleton height={38} width={160} />
            <Skeleton height={38} width={120} />
            <Skeleton height={38} width={120} />
            <Skeleton height={38} width={140} />
            <Skeleton height={38} width={100} />
          </div>

          {/* PAGINATION */}
          <div className="flex items-center gap-3">
            <Skeleton height={38} width={80} />
            <Skeleton height={20} width={100} />
            <Skeleton height={38} width={80} />
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-10">
          {/* HEADER */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} height={15} />
            ))}
          </div>

          {/* ROWS */}
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="grid grid-cols-6 gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6].map((col) => (
                <Skeleton key={col} height={20} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
