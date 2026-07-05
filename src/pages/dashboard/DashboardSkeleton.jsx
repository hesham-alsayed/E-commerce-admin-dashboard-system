"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen container mx-auto">
      
      {/* STATS */}
      <div className="w-full bg-white rounded-2xl border p-4 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[70%]">
          <Skeleton height={250} />
        </div>

        <div className="w-full lg:w-[30%]">
          <Skeleton height={250} />
        </div>
      </div>

      {/* CHART */}
      <div className="w-full bg-white rounded-2xl border p-4 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[60%]">
          <Skeleton height={300} />
        </div>

        <div className="w-full lg:w-[40%]">
          <Skeleton height={300} />
        </div>
      </div>

      {/* PAYMENT */}
      <div>
        <Skeleton height={350} />
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-10 w-full bg-white rounded-2xl border p-4 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[40%]">
          <Skeleton height={300} />
        </div>

        <div className="w-full lg:w-[60%]">
          <Skeleton height={300} />
        </div>
      </div>

    </div>
  );
} 

