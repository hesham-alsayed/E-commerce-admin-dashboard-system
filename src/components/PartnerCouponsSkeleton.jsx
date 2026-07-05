import Skeleton from "react-loading-skeleton";

export function PartnerCouponsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton width={200} height={20} />
        <Skeleton width={300} height={14} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 border rounded-2xl space-y-4 bg-white">
            <Skeleton width={100} height={16} />
            <Skeleton width={140} height={24} />

            <div className="flex justify-between">
              <Skeleton width={80} />
              <Skeleton width={80} />
            </div>

            <Skeleton height={8} />
          </div>
        ))}
      </div>
    </div>
  );
}