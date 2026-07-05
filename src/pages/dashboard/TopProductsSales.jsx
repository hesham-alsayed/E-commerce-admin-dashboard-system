"use client";

import { useMemo, useState } from "react";
import TopProductsFilter from "./TopProductFilter";

export default function TopProductsSales(props) {
  const {
    data,
    loading,
    mode,
    setMode,
    filters,
    setFilters,
    handleApply,
    handleClear,
    getValue,
  } = props;

  const [openFilter, setOpenFilter] = useState(false);

  const maxValue = useMemo(() => {
    if (!data.length) return 1;
    return Math.max(...data.map(getValue));
  }, [data, getValue]);

  return (
    <div className="bg-white border rounded-2xl p-5 space-y-5">
      {/* FILTER HEADER + MODAL */}
      <TopProductsFilter
        open={openFilter}
        setOpen={setOpenFilter}
        filters={filters}
        setFilters={setFilters}
        handleApply={handleApply}
        handleClear={handleClear}
        loading={loading}
        mode={mode}
        setMode={setMode}
      />

      {/* LIST */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : data.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try changing filters</p>
          </div>
        ) : (
          data.map((item, i) => {
            const value = getValue(item);
            const percent = (value / maxValue) * 100;

            return (
              <div key={i} className="p-4 border rounded-xl bg-gray-50">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium capitalize text-xs text-gray-800">
                    {item.productTitle}
                  </h3>

                  <span className="text-sm text-gray-600">
                    {mode === "sold"
                      ? `${item.totalSold} sold`
                      : `$${item.totalRevenue}`}
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gray-600 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
