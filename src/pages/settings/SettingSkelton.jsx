import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SettingSkeleton() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">

      {/* HEADER */}
      <div className="border rounded-xl p-4 space-y-3">
        <Skeleton height={30} width={220} />
        <Skeleton height={18} width={400} />
        <div className="flex justify-between items-center">
          <Skeleton height={35} width={120} />
          <Skeleton height={35} width={140} />
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="border rounded-xl p-4 space-y-4">
        <Skeleton height={25} width={200} />

        {/* ROWS */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 items-center">
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} />
          </div>
        ))}
      </div>

    </div>
  );
}