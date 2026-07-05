import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

export default function ProductsPagination({
  fetchLoading,
  pagination,
  onPageChange,
}) {
  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.numberOfPages || 1;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const goPrev = () => {
    if (isFirstPage || fetchLoading) return;

    onPageChange(currentPage - 1);
  };

  const goNext = () => {
    if (isLastPage || fetchLoading) return;

    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-3 ml-auto">
      {/* Prev */}
      <Button disabled={isFirstPage || fetchLoading} onClick={goPrev}>
        Prev
      </Button>

      {/* Info */}
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next */}
      <Button disabled={isLastPage || fetchLoading} onClick={goNext}>
        Next
      </Button>
    </div>
  );
}