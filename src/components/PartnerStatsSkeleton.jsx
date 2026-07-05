import Skeleton from "react-loading-skeleton";

export function PartnerStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white border rounded-xl p-4">
          <Skeleton height={12} width={100} />
          <div className="mt-3">
            <Skeleton height={24} width={60} />
          </div>
        </div>
      ))}
    </div>
  );
}