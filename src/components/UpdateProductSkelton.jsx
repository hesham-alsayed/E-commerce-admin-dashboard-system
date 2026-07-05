import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UpdateProductSkelton() {
  return (
    <div className="mb-6 container mx-auto">
      {/* Header */}
      <div className="mt-4">
        <Skeleton height={30} width={200} />
        <Skeleton height={20} width={300} className="mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-6">
        {/* LEFT - FORM */}
        <div className="lg:col-span-4 bg-white border rounded-xl px-4 py-6 space-y-4">
          <Skeleton height={40} />
          <Skeleton height={80} />

          <div className="flex gap-3">
            <Skeleton height={40} width="100%" />
            <Skeleton height={40} width="100%" />
            <Skeleton height={40} width="100%" />
          </div>

          <Skeleton height={120} />

          <Skeleton height={40} width={200} />
        </div>

        {/* RIGHT - ORGANIZATION */}
        <div className="lg:col-span-2 bg-white border rounded-xl px-4 py-6 space-y-4">
          <Skeleton height={20} width={120} />

          <Skeleton height={45} />
          <Skeleton height={45} />
          <Skeleton height={45} />

          <Skeleton height={45} />
          <Skeleton height={45} />

          <Skeleton height={45} />

          <Skeleton height={45} />
        </div>
      </div>
    </div>
  );
}
