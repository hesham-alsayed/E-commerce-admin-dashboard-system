import Skeleton from "react-loading-skeleton";
import { RoleCardSkelton } from "./RoleCardSkelton";
import { TableRoleSkeleton } from "./TableRoleSkelton";

export function RolePageSkeleton() {
  return (
    <div className="container mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <Skeleton width={200} height={20} />
          <Skeleton width={300} height={14} />
        </div>

        <Skeleton width={120} height={40} />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <RoleCardSkelton key={i} />
        ))}
      </div>

      {/* TABLE */}
      <TableRoleSkeleton />
    </div>
  );
}
