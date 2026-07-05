import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TableCouponsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={20} />
          ))}
      </div>

      {/* ROWS */}
      {[1, 2, 3, 4, 5].map((row) => (
        <div key={row} className="grid grid-cols-6 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={18} />
            ))}
        </div>
      ))}
    </div>
  );
}
