import React from "react";
import { PartnerStatsSkeleton } from "./PartnerStatsSkeleton";
import { PartnerTableSkeleton } from "./PartnerTableSkeleton";
import { PageInfoSkeleton } from "./PageInfoSkeleton";

export default function PartnerPageSkeleton() {
  return (
    <div className="space-y-10">
      <PageInfoSkeleton />
      <PartnerStatsSkeleton />
      <PartnerTableSkeleton />
    </div>
  );
}
