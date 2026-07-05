"use client";

import { useEffect, useRef, useState } from "react";

import PageInfo from "@/components/PageInfo";
import RatingProgressBar from "@/components/RatingProgressBar";
import ReviewCard from "@/components/ReviewCard";
import ReviewFilters from "./ReviewFilters";
import ReviewsTable from "./ReviewsTable";
import PartnerPagination from "../partner/PartnerPagination";

import { useReviews } from "@/components/hooks/useReviews";
import { cleanReviewFilters } from "@/lib/utils";
import { TableLoadingOverlay } from "@/components/TableLoadingOverlay";
import EmptyReviewsState from "@/components/EmptyReviewsState";
import ReviewPageSkeleton from "@/components/ReviewPageSkeleton";

export default function ReviewPage() {
  const { reviews, fetchReviews, loading, pagination, initialLoading } =
    useReviews();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    rating: "all",
    product: "all",
    sort: "-createdAt",
  });

  const lastQueryRef = useRef(null);

  useEffect(() => {
    const query = cleanReviewFilters(filters);
    const queryStr = JSON.stringify(query);

    if (lastQueryRef.current === queryStr) return;
    lastQueryRef.current = queryStr;

    fetchReviews(query);
  }, [filters, fetchReviews]);

  // ================= INITIAL LOADING =================
  if (initialLoading) {
    return <ReviewPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* ================= TOP ================= */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <PageInfo
            head="Reviews"
            title="Show and manage your products reviews"
          />
        </div>

        <div className="flex-1">
          <RatingProgressBar />
        </div>
      </div>

      {/* ================= STATS / CARDS ================= */}
      <ReviewCard />
      {/* ================= TABLE CARD ================= */}
      <div className="relative bg-white border p-4 rounded-2xl space-y-4">
        {/* FILTERS */}
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <ReviewFilters filters={filters} setFilters={setFilters} />

          <PartnerPagination
            filters={filters}
            setFilters={setFilters}
            fetchLoading={loading}
            pagination={pagination}
          />
        </div>

        {/* 🔥 LOADING OVERLAY (filter فقط) */}
        {loading && reviews?.length > 0 && <TableLoadingOverlay />}

        {/* 🔥 EMPTY */}
        {!loading && reviews?.length === 0 ? (
          <EmptyReviewsState />
        ) : (
          <ReviewsTable reviews={reviews} />
        )}
      </div>
    </div>
  );
}
