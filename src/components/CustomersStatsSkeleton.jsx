import Skeleton from "react-loading-skeleton";

export function CustomersStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-xl bg-white">
          <Skeleton height={15} width={100} />
          <Skeleton height={25} width={80} className="mt-2" />
        </div>
      ))}
    </div>
  );
}