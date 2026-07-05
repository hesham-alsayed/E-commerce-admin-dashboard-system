/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { FiFilter } from "react-icons/fi";

import DateFilterModal from "./DateFilterModal";

export default function OrderStatusSummary({
  data,
  loading,
  filters,
  setFilters,
  openFilter,
  setOpenFilter,
  handleApply,
  handleClear,
}) {
  // ✅ safe data
  const safeData = Array.isArray(data) ? data : [];

  // 🎨 colors
  const statusColors = {
    pending: "#dddddd",
    processing: "#aeaeae",
    shipped: "#606060",
    delivered: "#404040",
    cancelled: "#040404",
  };

  // 📊 total count
  const totalCount = useMemo(() => {
    return safeData.reduce((sum, item) => sum + (item.count || 0), 0);
  }, [safeData]);

  // 🚨 empty condition:
  // 1. no data
  // 2. OR all counts = 0
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const isEmpty = useMemo(() => {
    if (!safeData.length) return true;

    return safeData.every((item) => (item.count || 0) === 0);
  }, [safeData]);

  // 📊 chart data
  const chartData = useMemo(() => {
    return {
      labels: safeData.map((d) => d.status || "unknown"),
      datasets: [
        {
          data: safeData.map((d) => d.count || 0),
          backgroundColor: safeData.map(
            (d) => statusColors[d.status] || "#9ca3af",
          ),
          borderWidth: 1,
        },
      ],
    };
  }, [safeData]);

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const item = safeData?.[context.dataIndex];

            if (!item) return [];

            const percent = totalCount
              ? ((item.count || 0) / totalCount) * 100
              : 0;

            return [
              `${item.status || "unknown"}`,
              `Count: ${item.count || 0}`,
              `Percentage: ${percent.toFixed(1)}%`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="bg-white w-full border h-full rounded-2xl p-5 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-sm font-semibold text-gray-600">
          Order Status Distribution
        </h2>

        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md text-xs"
        >
          <FiFilter size={14} />
          Filter
        </button>
      </div>

      {/* CHART AREA */}
      <div className="h-85 relative flex items-center justify-center">
        {/* LOADING */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <p className="text-gray-500 animate-pulse">Loading...</p>
          </div>
        )}

        {/* EMPTY STATE (IMPORTANT FIX) */}
        {!loading && isEmpty && (
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium">No Orders Found</p>
            <p className="text-sm">
              All statuses are empty or no data available
            </p>
          </div>
        )}

        {/* CHART */}
        {!loading && !isEmpty && <Pie data={chartData} options={options} />}
      </div>

      {/* MODAL */}
      <DateFilterModal
        open={openFilter}
        setOpen={setOpenFilter}
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        handleApply={handleApply}
        handleClear={handleClear}
      />
    </div>
  );
}
