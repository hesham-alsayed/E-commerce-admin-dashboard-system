"use client";

import { FiFilter } from "react-icons/fi";
import TopProductsFilterModal from "./TopProductFilterModal";

export default function TopProductsFilter({
  open,
  setOpen,
  filters,
  setFilters,
  handleApply,
  handleClear,
  loading,
  mode,
  setMode,
}) {
  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-600">Top Products</h2>

        <div className="flex gap-2 items-center">
          {/* MODE */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {["sold", "revenue"].map((t) => (
              <button
                key={t}
                onClick={() => setMode(t)}
                className={`px-3 py-1 text-sm rounded-md ${
                  mode === t ? "bg-gray-600 text-white" : "text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* OPEN MODAL */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md text-xs"
          >
            <FiFilter size={14} />
            Filter
          </button>
        </div>
        {/* MODAL */}
        <TopProductsFilterModal
          open={open}
          setOpen={setOpen}
          filters={filters}
          setFilters={setFilters}
          handleApply={handleApply}
          handleClear={handleClear}
          loading={loading}
        />
      </div>
    </>
  );
}
