/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import PageInfo from "@/components/PageInfo";
import CouponStatsCard from "./CouponStatsCard";
import CouponTable from "./CouponTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CouponModal from "@/components/CouponModal";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCoupons } from "@/components/hooks/useCoupons";
import { cleanCouponFilters, showToast } from "@/lib/utils";
import CouponFilters from "./CouponFilters";
import PartnerPagination from "../partner/PartnerPagination";
import CouponsPageSkeleton from "@/components/ui/CouponsPageSkeleton";
import TableCouponsSkeleton from "@/components/ui/TableCouponsSkeleton";
import { DeleteModal2 } from "@/components/DeleteModal2";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DeleteModal } from "@/components/DeleteModal";

/* ================= DEBOUNCE HOOK ================= */
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function CouponsPage() {
  const {
    addCoupon,
    editCoupon,
    removeCoupon,
    coupons,
    actionLoading,
    fetchCoupons,
    pagination,
    fetchLoading,
    stats,
  } = useCoupons();

  const [open, setOpen] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [couponToDelete, setCouponToDelete] = useState(null);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const lastQueryRef = useRef(null);

  /* ================= URL → FILTERS ================= */
  const filters = useMemo(() => {
    return {
      page: Number(searchParams.get("page") ?? 1),

      limit: Number(searchParams.get("limit") ?? 10),

      search: searchParams.get("search") ?? "",

      type: searchParams.get("type") ?? "all",

      active: searchParams.get("active") ?? "all",

      sort: searchParams.get("sort") ?? "-createdAt",
    };
  }, [searchParams]);

  /* ================= DEBOUNCE SEARCH ONLY ================= */
  const debouncedSearch = useDebounce(filters.search, 500);

  /* ================= FINAL FILTERS ================= */
  const finalFilters = useMemo(() => {
    return {
      ...filters,
      search: debouncedSearch,
    };
  }, [filters, debouncedSearch]);

  /* ================= FETCH ================= */
  useEffect(() => {
    const query = cleanCouponFilters(finalFilters);

    const queryStr = JSON.stringify(query);

    if (lastQueryRef.current === queryStr) return;

    lastQueryRef.current = queryStr;

    fetchCoupons(query);
  }, [finalFilters, fetchCoupons]);

  /* ================= UPDATE FILTER ================= */
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // reset page except pagination
    if (key !== "page") {
      params.set("page", "1");
    }

    navigate(
      {
        search: params.toString(),
      },
      {
        replace: true,
      },
    );
  };

  /* ================= RESET ================= */
  const resetFilters = () => {
    navigate(
      {
        search: "",
      },
      {
        replace: true,
      },
    );
  };

  /* ================= MODALS ================= */
  const handleOpenModal = () => {
    setSelectedCoupon(null);

    setOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCoupon) {
        await editCoupon(selectedCoupon._id, formData);

        showToast({
          message: "Coupon updated successfully",
          type: "success",
        });
      } else {
        await addCoupon(formData);

        showToast({
          message: "Coupon created successfully",
          type: "success",
        });
      }

      setOpen(false);

      setSelectedCoupon(null);
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Error",
        type: "error",
      });
    }
  };

  const handleOpenDelete = (coupon) => {
    setCouponToDelete(coupon);

    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await removeCoupon(couponToDelete._id);

      showToast({
        message: "Coupon deleted successfully",
        type: "success",
      });

      setOpenDeleteModal(false);

      setCouponToDelete(null);
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Delete failed",
        type: "error",
      });
    }
  };
  console.log(coupons);
  console.log(pagination);

  /* ================= INITIAL LOADING ================= */
  if (fetchLoading && coupons.length === 0) {
    return <CouponsPageSkeleton />;
  }

  return (
    <div className="container mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <PageInfo
            head="Coupon management"
            title="Create and manage discount codes and partner promotions."
          />
        </div>

        <Button onClick={handleOpenModal} className="flex gap-2">
          <Plus size={16} />
          Create Coupon
        </Button>
        <DeleteModal
          isLoadingDelete={actionLoading}
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          itemTitle={couponToDelete?.code}
          loadingData={fetchLoading}
          onConfirm={handleDelete} 
          title="Coupon"
        />
      </div>

      {/* STATS */}
      <CouponStatsCard stats={stats} />

      {/* FILTERS + TABLE */}
      <div className="bg-white p-6 rounded-xl space-y-4">
        <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center justify-between">
          <CouponFilters filters={filters} updateFilter={updateFilter} />
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>

          <PartnerPagination
            filters={filters}
            fetchLoading={fetchLoading}
            pagination={pagination}
            updateFilter={updateFilter}
          />
        </div>

        {fetchLoading && coupons.length > 0 ? (
          <TableCouponsSkeleton />
        ) : (
          <CouponTable
            coupons={coupons}
            onEdit={(coupon) => {
              setSelectedCoupon(coupon);

              setOpen(true);
            }}
            onDelete={handleOpenDelete}
          />
        )}
      </div>

      {/* MODALS */}
      <CouponModal
        open={open}
        setOpen={setOpen}
        initialData={selectedCoupon}
        onSubmit={handleSubmit}
        loading={actionLoading}
      />
    </div>
  );
}
