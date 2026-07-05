import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TrackOrderSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 -mt-8 pb-10 space-y-4">

      {/* HERO CARD */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <Skeleton height={20} width={200} />
        <Skeleton height={14} width={300} className="mt-2" />
      </div>

      {/* TRACKING CARD */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        <Skeleton height={20} width={180} />

        {/* steps */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton circle width={35} height={35} />
              <div className="flex-1">
                <Skeleton height={12} width={`60%`} />
                <Skeleton height={10} width={`40%`} className="mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUMMARY CARD */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <Skeleton height={18} width={150} className="mb-3" />

        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton width={120} />
              <Skeleton width={80} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}