import { useContext } from "react";
import { CouponContext } from "../context/coupon/CouponContext";

export const useCoupons = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCoupons must be used within CouponsProviders");
  }
  return context;
};
