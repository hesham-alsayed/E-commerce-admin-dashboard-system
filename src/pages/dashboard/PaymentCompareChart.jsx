"use client";

import { Bar } from "react-chartjs-2";
import PaymentFilters from "./PaymentCompareFilter";
import PaymentCompareFilter from "./PaymentCompareFilter";

export default function PaymentCompareChart({
  data,
  loading,
  filters,
  setFilters,
  handleApply,
  handleClear,
}) {
  const chartData = {
    labels: data.map((d) => `M${d.month}/${d.year}`),

    datasets: [
      {
        label: "Cash",
        data: data.map((d) => d.cash?.totalRevenue || 0),
        backgroundColor: "#3c3c3c",
        borderRadius: 6,

        // ✅ FIX BAR WIDTH
        categoryPercentage: 0.9,
        barPercentage: 0.7,
        maxBarThickness: 40,
      },

      {
        label: "PayPal",
        data: data.map((d) => d.paypal?.totalRevenue || 0),
        backgroundColor: "#888888",
        borderRadius: 6,

        // ✅ FIX BAR WIDTH
        categoryPercentage: 0.9,
        barPercentage: 0.7,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },

      tooltip: {
        callbacks: {
          label: (ctx) => {
            const item = data[ctx.dataIndex];
            const isCash = ctx.dataset.label === "Cash";
            const target = isCash ? item.cash : item.paypal;

            return [
              `${ctx.dataset.label} Revenue: ${target?.totalRevenue || 0}`,
              `Orders: ${target?.ordersCount || 0}`,
              `Users: ${target?.uniqueUsers || 0}`,
            ];
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        // ✅ fix large width
        stacked: false,
      },

      y: {
        beginAtZero: true,
      },
    },
  };
  const hasData =
    Array.isArray(data) &&
    data.length > 0 &&
    data.some((d) => d.cash?.totalRevenue > 0 || d.paypal?.totalRevenue > 0);

  return (
    <div className="bg-white border rounded-2xl p-5 space-y-4">
      {/* FILTER UI (same component) */}
      <PaymentCompareFilter
        filters={filters}
        setFilters={setFilters}
        onApply={handleApply}
        onClear={handleClear}
        loading={loading}
      />

      <div className="h-100 relative">
        {/* LOADING */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <div className="w-10 h-10 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && !hasData && (
          <div className="h-full flex items-center justify-center text-gray-500">
            No Data Found
          </div>
        )}

        {/* CHART */}
        {!loading && hasData && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
}
