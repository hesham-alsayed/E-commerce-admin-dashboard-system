"use client";

import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function DateFilterModal({
  open,
  setOpen,
  filters,
  setFilters,
  handleApply,
  handleClear,
  loading,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  // sync
  useEffect(() => {
    const check = () => {
      if (open) setLocalFilters(filters);
    };
    check();
  }, [filters, open]);

  // lock scroll (IMPORTANT FIX)
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onApply = () => {
    setFilters(localFilters);
    handleApply?.(localFilters);
    setOpen(false);
  };

  const onClear = () => {
    const reset = { startDate: "", endDate: "" };

    setLocalFilters(reset);
    setFilters(reset);
    handleClear?.();
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-95 rounded-xl p-5 space-y-4 shadow-xl relative"
      >
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3"
        >
          <IoCloseOutline size={22} />
        </button>

        <h2 className="text-sm font-semibold text-gray-700">Date Filters</h2>

        {/* INPUTS */}
        <input
          type="date"
          value={localFilters.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className="w-full border p-2 rounded-md text-sm"
        />

        <input
          type="date"
          value={localFilters.endDate}
          onChange={(e) => handleChange("endDate", e.target.value)}
          className="w-full border p-2 rounded-md text-sm"
        />

        {/* ACTIONS */}
        <div className="flex justify-between pt-3">
          {filters.startDate || filters.endDate ? (
            <button
              onClick={onClear}
              className="bg-gray-200 px-3 py-2 rounded-md text-sm"
            >
              Clear
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <button onClick={() => setOpen(false)}>Cancel</button>

            <button
              onClick={onApply}
              disabled={loading}
              className="bg-black text-white px-3 py-2 rounded-md text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
