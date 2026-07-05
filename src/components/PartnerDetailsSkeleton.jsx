import { PartnerCouponsSkeleton } from "./PartnerCouponsSkeleton";
import { PartnerDetailsStatsSkeleton } from "./PartnerDetailsStatsSkeleton";
import { PartnerHeaderSkeleton } from "./PartnerHeaderSkeleton";
import { PartnerInfoSkeleton } from "./PartnerInfoSkeleton";


export default function PartnerDetailsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <PartnerHeaderSkeleton />
      <PartnerInfoSkeleton />
      <PartnerDetailsStatsSkeleton />
      <PartnerCouponsSkeleton />
    </div>
  );
}