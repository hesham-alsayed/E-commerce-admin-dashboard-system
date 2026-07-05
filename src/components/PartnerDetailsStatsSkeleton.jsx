import Skeleton from "react-loading-skeleton";

export function PartnerDetailsStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-5 border rounded-2xl bg-white space-y-3">
          <Skeleton width={120} height={14} />
          <Skeleton width={80} height={28} />
          <Skeleton width={150} height={12} />
        </div>
      ))}
    </div>
  );
}