import { Button } from "@/components/ui/button";

export default function PartnerPagination({
  fetchLoading,
  filters,
  updateFilter,
  pagination,
}) {
  const currentPage = filters?.page || 1;
  const totalPages = pagination?.numberOfPages || 1;

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const prev = () => {
    if (isFirst || fetchLoading) return;
    updateFilter("page", currentPage - 1);
  };

  const next = () => {
    if (isLast || fetchLoading) return;
    updateFilter("page", currentPage + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        disabled={isFirst || fetchLoading}
        onClick={prev}
        variant="outline"
      >
        Prev
      </Button>

      <span className="text-xs text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        disabled={isLast || fetchLoading}
        onClick={next}
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
}
