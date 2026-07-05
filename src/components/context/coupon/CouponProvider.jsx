"use client";

import { useState } from "react";

import { CouponContext } from "./CouponContext";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from "@/components/ِApi/couponApi";
import { toast } from "sonner";

// ================= PROVIDER =================
export function CouponProvider({ children }) {
  const [coupons, setCoupons] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
  });
  const [fetchLoading, setFetchLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================= FETCH ALL =================
  const fetchCoupons = async (filter) => {
    setFetchLoading(true);

    try {
      const res = await getAllCoupons(filter);
      console.log(res);

      setCoupons(res.coupons.couponsData); // ✅ array فقط
      setStats(res.coupons.stats); // (لو هتستخدمها)
      setPagination({
        currentPage: res.pagination.currentPage,
        numberOfPages: res.pagination.numberOfPages,
      });
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setFetchLoading(false);
    }
  };
  // ================= CREATE =================
  const addCoupon = async (data) => {
    setActionLoading(true);
    setError(null);
    console.log(data);

    try {
      const res = await createCoupon(data);
      console.log(res);

      setCoupons((prev) => [res.coupon, ...prev]);

      return res;
    } catch (err) {
      console.error(err);
      setError("Failed to create coupon");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ================= UPDATE =================
  const editCoupon = async (id, data) => {
    setActionLoading(true);
    setError(null);

    try {
      const res = await updateCoupon(id, data);

      setCoupons((prev) => prev.map((c) => (c._id === id ? res.coupon : c)));

      return res;
    } catch (err) {
      console.error(err);
      setError("Failed to update coupon");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ================= DELETE =================
  const removeCoupon = async (id) => {
    setActionLoading(true);
    setError(null);
    try {
      await deleteCoupon(id);

      setCoupons((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete coupon");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,

        // states
        fetchLoading, // fetch loading
        actionLoading, // create/update/delete loading
        error,
        stats,
        // actions
        fetchCoupons,
        addCoupon,
        editCoupon,
        removeCoupon,
        pagination,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}
