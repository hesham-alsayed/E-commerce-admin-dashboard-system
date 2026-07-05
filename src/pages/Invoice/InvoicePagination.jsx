import { Button } from "@/components/ui/button";

export default function InvoicePagination({
  fetchLoading,
  filters,
  updateFilter,
  pagination,
}) {
  const currentPage = pagination?.currentPage || filters.page || 1;

  const totalPages = pagination?.numberOfPages || 1;

  const isFirstPage = currentPage <= 1;

  const isLastPage = currentPage >= totalPages;

  /* ================= PREV ================= */
  const goPrev = () => {
    if (isFirstPage || fetchLoading) return;

    updateFilter("page", currentPage - 1);
  };

  /* ================= NEXT ================= */
  const goNext = () => {
    if (isLastPage || fetchLoading) return;

    updateFilter("page", currentPage + 1);
  };

  return (
    <div className="flex items-center gap-3">
      {/* PREV */}
      <Button
        disabled={isFirstPage || fetchLoading}
        onClick={goPrev}
      >
        Prev
      </Button>

      {/* INFO */}
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>

      {/* NEXT */}
      <Button
        disabled={isLastPage || fetchLoading}
        onClick={goNext}
      >
        Next
      </Button>
    </div>
  );
}