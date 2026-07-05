import Skeleton from "react-loading-skeleton";

export function PartnerHeaderSkeleton() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-2">
        <Skeleton width={200} height={24} />
        <Skeleton width={350} height={16} />
      </div>

      <div className="flex gap-3">
        <Skeleton width={120} height={40} borderRadius={12} />
        <Skeleton width={140} height={40} borderRadius={12} />
      </div>
    </div>
  );
}