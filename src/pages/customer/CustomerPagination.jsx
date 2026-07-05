import { Button } from "@/components/ui/button";

export default function CustomerPagination({
  filters,
  updateFilter,
  pagination,
}) {
  const currentPage = filters?.page || 1;
  const totalPages = pagination?.pages || 1;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const goPrev = () => {
    if (isFirstPage) return;

    updateFilter("page", currentPage - 1);
  };

  const goNext = () => {
    if (isLastPage) return;

    updateFilter("page", currentPage + 1);
  };

  return (
    <div className="flex items-center gap-3">
      {/* PREV */}
      <button
        className="bg-gray-200 text-sm text-gray-700 px-2 py-0.5 rounded-sm hover:cursor-pointer hover:bg-gray-300"
        disabled={isFirstPage}
        onClick={goPrev}
      >
        Prev
      </button>

      {/* INFO */}
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>

      {/* NEXT */}
      <button
        className="bg-gray-200 text-sm text-gray-700 px-2 py-0.5 rounded-sm hover:cursor-pointer hover:bg-gray-300"
        disabled={isLastPage}
        onClick={goNext}
      >
        Next
      </button>
    </div>
  );
}
