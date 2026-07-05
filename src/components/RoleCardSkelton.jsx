import Skeleton from "react-loading-skeleton";

export function RoleCardSkelton() {
  return (
    <div className="p-4 border rounded-xl space-y-3">
      <Skeleton width={120} height={18} />
      <Skeleton width={180} height={12} />
      <Skeleton width={50} height={28} />
    </div>
  );
}
