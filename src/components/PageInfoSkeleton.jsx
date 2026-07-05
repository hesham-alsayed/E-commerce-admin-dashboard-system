import Skeleton from "react-loading-skeleton";

export function PageInfoSkeleton() {
  return (
    <div className="flex items-center justify-between">
      {/* LEFT (PageInfo) */}
      <div className="space-y-2">
        <Skeleton height={14} width={140} />
        <Skeleton height={20} width={260} />
      </div>

      {/* RIGHT (Button) */}
      <Skeleton height={44} width={160} borderRadius={12} />
    </div>
  );
}
