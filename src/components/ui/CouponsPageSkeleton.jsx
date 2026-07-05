"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TableCouponsSkeleton from "./TableCouponsSkeleton";

export default function CouponsPageSkeleton() {
  return (
    <div className="container mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-2 w-1/2">
          <Skeleton height={25} width={200} />
          <Skeleton height={18} width={350} />
        </div>

        <Skeleton height={40} width={160} />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 border rounded-xl bg-white space-y-3">
            <Skeleton height={18} width={120} />
            <Skeleton height={30} width={80} />
            <Skeleton height={14} width={140} />
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="bg-white p-6 rounded-xl space-y-4">
        <div className="flex flex-col xl:flex-row gap-4 justify-between">
          <Skeleton height={40} width={300} />
          <Skeleton height={40} width={200} />
        </div>

        {/* TABLE HEADER */}
        <TableCouponsSkeleton />
      </div>
    </div>
  );
}
