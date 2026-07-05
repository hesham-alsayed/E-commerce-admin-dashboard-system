import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

export default function UsersPagination({
  fetchLoading,
  filters,
  setFilters,
  pagination,
}) {
  const currentPage = pagination?.currentPage || filters.page || 1;
  const totalPages = pagination?.numberOfPages || 1;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const goPrev = () => {
    if (isFirstPage || fetchLoading) return;

    setFilters((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  const goNext = () => {
    if (isLastPage || fetchLoading) return;

    setFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  return (
    <div className="flex items-center gap-3">
      {/* PREV */}
      <Button disabled={isFirstPage || fetchLoading} onClick={goPrev}>
        {fetchLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Prev"}
      </Button>

      {/* INFO */}
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>

      {/* NEXT */}
      <Button disabled={isLastPage || fetchLoading} onClick={goNext}>
        {fetchLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Next"}
      </Button>
    </div>
  );
}
