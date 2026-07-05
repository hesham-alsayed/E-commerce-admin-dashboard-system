"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserDetailsSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* Page Title */}
      <div>
        <Skeleton height={25} width={180} />
        <Skeleton height={18} width={260} className="mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="space-y-6">
          
          {/* User Card */}
          <div className="bg-white rounded-2xl shadow p-5 space-y-5">
            <div className="flex items-center gap-4">
              <Skeleton circle height={60} width={60} />
              <div className="space-y-2">
                <Skeleton height={16} width={120} />
                <Skeleton height={12} width={180} />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton height={14} />
              <Skeleton height={14} />
              <Skeleton height={14} />
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">
            <Skeleton height={14} width={140} />

            <div className="flex justify-between items-center">
              <Skeleton height={14} width={120} />
              <Skeleton height={20} width={40} />
            </div>

            <div className="flex justify-between items-center">
              <Skeleton height={14} width={120} />
              <Skeleton height={20} width={40} />
            </div>

            <div className="pt-3 border-t space-y-2">
              <Skeleton height={12} width={180} />
              <Skeleton height={12} width={140} />
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Info */}
          <div className="bg-white rounded-2xl shadow p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton circle height={30} width={30} />
                <div className="space-y-2">
                  <Skeleton height={12} width={100} />
                  <Skeleton height={14} width={120} />
                </div>
              </div>
            ))}
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">
            <Skeleton height={16} width={180} />

            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="border rounded-xl p-4 space-y-2">
                  <Skeleton height={14} width={140} />
                  <Skeleton height={12} width={180} />
                  <Skeleton height={12} width={120} />
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist */}
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">
            <Skeleton height={16} width={160} />

            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} height={28} width={80} borderRadius={20} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}