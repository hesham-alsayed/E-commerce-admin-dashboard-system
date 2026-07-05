import Skeleton from "react-loading-skeleton";

export function TableRoleSkeleton() {
  return (
    <div className="mt-6 border rounded-xl overflow-hidden">
      {/* HEADER */}
      <div className="grid grid-cols-6 p-4 bg-gray-100">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height={14} />
        ))}
      </div>

      {/* ROWS */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-6 items-center gap-4 p-4 border-t"
        >
          {/* user */}
          <div className="flex items-center gap-3">
            <Skeleton circle width={32} height={32} />
            <Skeleton width={100} />
          </div>

          <Skeleton width={180} />
          <Skeleton width={80} />
          <Skeleton width={80} />
          <Skeleton width={90} />
          <Skeleton width={30} />
        </div>
      ))}
    </div>
  );
}
