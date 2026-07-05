"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CustomersPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      
      {/* 🔥 Page Header */}
      <div>
        <Skeleton height={30} width={200} />
        <Skeleton height={15} width={300} className="mt-2" />
      </div>

      {/* 🔥 Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4 border rounded-lg">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height={40} />
        ))}
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="p-4 border rounded-xl bg-white space-y-2"
          >
            <Skeleton height={15} width={100} />
            <Skeleton height={25} width={80} />
          </div>
        ))}
      </div>

      {/* 🔥 Table */}
      <div className="border rounded-2xl bg-white overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 p-4 border-b">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} height={15} />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: 6 }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-7 gap-4 p-4 border-b"
          >
            {Array.from({ length: 7 }).map((_, col) => (
              <Skeleton key={col} height={15} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}