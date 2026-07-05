import React from "react";
import PartnerCouponCard from "./PartnerCouponCard";
import { getCouponStatus } from "@/lib/utils";

export default function PartnerCouponsSection({ coupons = [], onCreate }) {
  const hasCoupons = coupons.length > 0;

  console.log(coupons);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Partner Coupons</h2>
          <p className="text-sm text-gray-500">
            Discount codes managed by this partner.
          </p>
        </div>

        {hasCoupons && (
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:opacity-80"
          >
            Create Coupon
          </button>
        )}
      </div>

      {/* ================= EMPTY STATE ================= */}
      {!hasCoupons ? (
        <div className="bg-white border rounded-2xl p-10 text-center flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm">
            No coupons assigned to this partner yet.
          </p>

          <button
            onClick={onCreate}
            className="px-5 py-2 bg-black text-white rounded-xl text-sm hover:opacity-80"
          >
            Create First Coupon
          </button>
        </div>
      ) : (
        /* ================= LIST ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coupons.map((coupon) => (
            <PartnerCouponCard
              key={coupon._id}
              code={coupon.code}
              discount={
                coupon.discountType === "percentage"
                  ? `${coupon.discountValue}% OFF`
                  : `$${coupon.discountValue} OFF`
              }
              type={coupon.discountType}
              minPurchase={coupon.minPurchase ? `$${coupon.minPurchase}` : null}
              validity={`${new Date(
                coupon.startDate,
              ).toLocaleDateString()} - ${new Date(
                coupon.endDate,
              ).toLocaleDateString()}`}
              usage={coupon.usedCount}
              maxUsage={coupon.usageLimit}
              status={getCouponStatus(coupon)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
