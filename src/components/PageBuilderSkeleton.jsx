import Skeleton from "react-loading-skeleton";

export function PageBuilderSkeleton({ open }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div
        className={`fixed left-0 top-[120px] h-screen bg-white border-r flex flex-col
        ${open ? "w-64" : "w-16"}`}
      >
        <div className="flex items-center justify-between p-3 border-b">
          <Skeleton width={80} height={14} />
          <Skeleton width={16} height={16} />
        </div>

        <div className="p-2 space-y-2 border-b">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={32} />
          ))}
        </div>

        <div className="flex-1 p-2 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={40} />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`flex-1 h-screen overflow-y-auto
        ${open ? "ml-64" : "ml-16"}`}
      >
        <div className="flex justify-end mb-4 p-4">
          <Skeleton width={120} height={36} />
        </div>

        <div className="space-y-4 p-4">
          <Skeleton height={40} width="30%" />
          <Skeleton height={150} />
          <Skeleton height={40} width="50%" />
          <Skeleton height={150} />
        </div>
      </div>
    </div>
  );
}