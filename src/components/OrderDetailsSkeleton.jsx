"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6">
        <Skeleton height={30} width={200} />
        <div className="mt-4 flex flex-wrap gap-4">
          <Skeleton height={20} width={120} />
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={100} />
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* LEFT - Items */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center"
            >
              <Skeleton height={80} width={80} borderRadius={12} />
              <div className="flex-1 space-y-2">
                <Skeleton height={20} width="60%" />
                <Skeleton height={15} width="40%" />
                <Skeleton height={15} width="30%" />
              </div>
              <Skeleton height={20} width={50} />
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <Skeleton height={25} width={150} />
            <Skeleton height={15} width="100%" />
            <Skeleton height={15} width="90%" />
            <Skeleton height={15} width="80%" />
            <Skeleton height={30} width="100%" />
          </div>

          {/* Coupon INFO SKELETON 👇 */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <Skeleton height={22} width={120} />
            <Skeleton height={15} width="70%" />
            <Skeleton height={15} width="60%" />
            <div className="flex gap-2">
              <Skeleton height={30} width={80} />
              <Skeleton height={30} width={100} />
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <Skeleton height={25} width={150} />
            <Skeleton height={15} width="70%" />
            <Skeleton height={15} width="60%" />
            <Skeleton height={15} width="80%" />
          </div>
        </div>
      </div>
    </div>
  );
}