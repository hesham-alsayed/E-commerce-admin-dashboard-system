/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";

export default function OrdersAnalyticsChart({
  data = {},
  loading,
  filters,
  setFilters,
  handleApply,
  handleClear,
}) {
  const grayShades = {
    processing: "#374151",
    shipped: "#6b7280",
    delivered: "#9ca3af",
  };

  const statuses = [
    "processing",
    "shipped",
    "delivered",
  ];

  const hasRealData = useMemo(() => {
    if (!data?.monthly?.length) return false;

    return data.monthly.some((m) =>
      m.statuses?.some((s) => s.revenue > 0 || s.count > 0),
    );
  }, [data]);

  const chartData = useMemo(() => {
    if (!data?.monthly) return null;

    return {
      labels: data.monthly.map((m) => m.month),
      datasets: statuses.map((status) => ({
        label: status,
        data: data.monthly.map((m) => {
          const found = m.statuses?.find((s) => s.status === status);
          return found?.revenue ?? 0;
        }),
        borderColor: grayShades[status],
        // backgroundColor: `${grayShades[status]}22`,
        backgroundColor: `${grayShades[status]}55`,
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
      })),
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "nearest", intersect: true },
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          title: (ctx) => `Month: ${ctx[0].label}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, title: { display: true, text: "Revenue" } },
    },
  };

  return (
    <div className="bg-white border rounded-2xl p-5 space-y-5 relative">
      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap justify-end">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters((p) => ({ ...p, startDate: e.target.value }))
          }
          className="border p-2 rounded-md text-sm"
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) =>
            setFilters((p) => ({ ...p, endDate: e.target.value }))
          }
          className="border p-2 rounded-md text-sm"
        />

        <button
          onClick={handleApply}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          Apply
        </button>

        <button
          onClick={handleClear}
          className="bg-gray-100 px-4 py-2 rounded-md text-sm"
        >
          Clear
        </button>
      </div>

      {/* TOP STATS */}
      <div className="flex justify-center gap-10 text-center">
        <div>
          <p className="text-xs text-gray-400">Total Orders</p>
          <h2 className="text-xl font-bold">{data?.totalOrders || 0}</h2>
        </div>

        <div className="border-l pl-10">
          <p className="text-xs text-gray-400">Revenue</p>
          <h2 className="text-xl font-bold">${data?.totalRevenue || 0}</h2>
        </div>
      </div>

      {/* CHART */}
      <div className="h-112 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="w-10 h-10 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        )}

        {!loading && !hasRealData && (
          <div className="h-full flex items-center justify-center text-gray-500">
            No analytics data found
          </div>
        )}

        {!loading && hasRealData && chartData && (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
