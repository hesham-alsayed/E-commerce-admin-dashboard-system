import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderInvoiceSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-4 mt-10 space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-md border p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex-1 space-y-2">
            <Skeleton height={20} width={140} />
            <Skeleton height={14} width={180} />
          </div>

          {/* LOGO */}
          <div className="flex-1 flex justify-center">
            <Skeleton height={40} width={100} />
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col items-end space-y-2">
            <Skeleton height={16} width={120} />
            <Skeleton height={12} width={90} />
            <Skeleton height={22} width={70} borderRadius={20} />
          </div>
        </div>
      </div>

      {/* CUSTOMER */}
      <div className="bg-white rounded-md border p-4 grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton width={120} height={16} />
          <Skeleton width={200} height={12} />
          <Skeleton width={160} height={12} />
        </div>

        <div className="space-y-2">
          <Skeleton width={120} height={16} />
          <Skeleton width={200} height={12} />
        </div>
      </div>

      {/* ITEMS TABLE */}
      <div className="bg-white rounded-md border p-4 space-y-3">
        {/* HEADER ROW */}
        <div className="grid grid-cols-4 gap-4">
          <Skeleton height={14} />
          <Skeleton height={14} />
          <Skeleton height={14} />
          <Skeleton height={14} />
        </div>

        {/* ROWS */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <Skeleton height={12} />
            <Skeleton height={12} />
            <Skeleton height={12} />
            <Skeleton height={12} />
          </div>
        ))}
      </div>

      {/* PAYMENT + SUMMARY */}
      <div className="bg-white rounded-md border p-4 grid sm:grid-cols-2 gap-6">
        {/* PAYMENT */}
        <div className="space-y-3">
          <Skeleton width={120} height={16} />
          <Skeleton width={180} height={12} />
          <Skeleton width={100} height={22} borderRadius={20} />
        </div>

        {/* SUMMARY */}
        <div className="space-y-2">
          <Skeleton width={120} height={16} />

          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton width={100} height={12} />
              <Skeleton width={60} height={12} />
            </div>
          ))}

          <div className="border-t pt-2 flex justify-between">
            <Skeleton width={80} height={14} />
            <Skeleton width={90} height={14} />
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <Skeleton width={90} height={38} />
        <Skeleton width={90} height={38} />
        <Skeleton width={110} height={38} />
      </div>
    </div>
  );
}
