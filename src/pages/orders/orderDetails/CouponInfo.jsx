import { Badge } from "@/components/ui/badge";
import { Tag, User, Mail } from "lucide-react";

export default function CouponInfo({ coupon }) {
  console.log(coupon);

  if (!coupon) {
    return (
      <div className="p-4 rounded-xl border bg-gray-50">
        <p className="text-sm text-gray-500">No coupon applied</p>
      </div>
    );
  }

  const isPercentage = coupon.discountType === "percentage";

  const isPartnerCoupon = coupon.type === "partner";

  return (
    <div className="p-4 rounded-xl border bg-white space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-500" />
          Coupon Applied
        </h3>

        <Badge className="bg-green-500/10 text-green-700 border-green-200">
          ACTIVE
        </Badge>
      </div>

      {/* CODE */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Code</span>

        <span className="font-medium text-gray-800">{coupon.code}</span>
      </div>

      {/* DISCOUNT */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Discount</span>

        <span className="flex items-center gap-1 font-semibold text-green-600">
          {coupon.discountValue}
          {isPercentage ? "%" : "$"}
        </span>
      </div>

      {/* DISCOUNT TYPE */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Discount Type</span>

        <span className="text-sm font-medium text-gray-700 capitalize">
          {coupon.discountType}
        </span>
      </div>

      {/* COUPON TYPE */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Coupon Type</span>

        <Badge
          className={
            isPartnerCoupon
              ? "bg-blue-100 text-blue-700 border-blue-200"
              : "bg-gray-100 text-gray-700 border-gray-200"
          }
        >
          {coupon.type}
        </Badge>
      </div>

      {/* MIN PURCHASE */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Min Purchase</span>

        <span className="text-sm font-medium text-gray-700">
          ${coupon.minPurchase || 0}
        </span>
      </div>

      {/* PARTNER INFO */}
      {isPartnerCoupon && coupon.partner && (
        <div className="pt-3 border-t space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">
            Partner Information
          </h4>

          {/* PARTNER NAME */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <User className="w-4 h-4" />
              Name
            </span>

            <span className="text-sm font-medium text-gray-800">
              {coupon.partner.name}
            </span>
          </div>

          {/* PARTNER EMAIL */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Email
            </span>

            <span className="text-sm font-medium text-gray-800">
              {coupon.partner.email}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
