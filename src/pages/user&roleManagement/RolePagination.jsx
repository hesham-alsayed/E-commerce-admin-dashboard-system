import React from "react";

export default function RolePagination({pagination , handlePageChange }) {
  return (
    <div className="flex items-center gap-1 ml-auto">
      {Array.from({ length: pagination?.numberOfPages || 1 }, (_, i) => {
        const pageNumber = i + 1;
        const isActive = pagination?.currentPage === pageNumber;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-2 py-0.5 border hover:cursor-pointer rounded border-gray-200 transition ${
              isActive ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}
