import Skeleton from "react-loading-skeleton";

export function PartnerInfoSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl border flex items-center gap-4 mb-6">
      <Skeleton circle width={56} height={56} />

      <div className="flex-1 space-y-2">
        <Skeleton width={180} height={18} />
        <Skeleton width={120} height={18} />
        <Skeleton width={300} height={14} />
      </div>
    </div>
  );
}