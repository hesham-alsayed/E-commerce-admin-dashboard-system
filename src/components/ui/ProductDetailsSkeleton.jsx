import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen p-1">
      {/* HEADER */}
      <Skeleton height={56} borderRadius={12} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* LEFT */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* IMAGE + STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IMAGE */}
            <div>
              <Skeleton height={280} borderRadius={12} />
            </div>

            {/* STATS */}
            <div className="p-4 border rounded-xl space-y-3">
              <Skeleton width={140} height={20} />

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Skeleton height={45} />
                <Skeleton height={45} />
                <Skeleton height={45} />
                <Skeleton height={45} />
              </div>
            </div>
          </div>

          {/* VARIANTS */}
          <div className="p-4 border rounded-xl space-y-3">
            <Skeleton width={160} height={20} />

            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
          </div>

          {/* ANALYTICS */}
          <div className="p-4 border rounded-xl space-y-3">
            <Skeleton width={160} height={20} />

            <div className="grid grid-cols-3 gap-3">
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </div>

            <Skeleton height={100} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          {/* QUICK STATS */}
          <div className="p-4 border rounded-xl space-y-3">
            <Skeleton width={140} height={20} />

            <div className="grid grid-cols-2 gap-3">
              <Skeleton height={45} />
              <Skeleton height={45} />
              <Skeleton height={45} />
              <Skeleton height={45} />
            </div>
          </div>

          {/* LATEST ORDERS */}
          <div className="p-4 border rounded-xl space-y-3">
            <Skeleton width={160} height={20} />

            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
          </div>
        </div>
      </div>
    </div>
  );
}