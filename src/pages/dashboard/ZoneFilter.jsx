"use client";

import { FiFilter } from "react-icons/fi";
import DateFilterModal from "./DateFilterModal";

export default function ZoneFilter({
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
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-600">Zone Analytics</h2>

        <div className="flex gap-2 items-center">
          {/* MODE */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {["revenue", "orders", "users"].map((t) => (
              <button
                key={t}
                onClick={() => setMode(t)}
                className={`px-3 py-1 text-xs rounded-md ${
                  mode === t ? "bg-gray-600 text-white" : "text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* FILTER BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md text-xs"
          >
            <FiFilter size={14} />
            Filter
          </button>
        </div>
        {/* MODAL */}
        <DateFilterModal
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


