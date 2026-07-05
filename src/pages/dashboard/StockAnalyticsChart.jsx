"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import StockFilters from "./StockFilters";
import { Button } from "@/components/ui/button";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function StockAnalyticsChart({
  // data
  data,
  loading,

  // filters
  search,
  setSearch,

  collections,
  categories,
  subcategories,

  collection,
  category,
  subcategory,

  setCollection,
  setCategory,
  setSubcategory,

  // limit
  limit,
  handleLimitChange,

  // actions
  applyFilters,
  clearFilters,

  // pagination
  page,
  totalPages,
  nextPage,
  prevPage,
}) {
  // =========================
  // CHART DATA
  // =========================
  const chartData = {
    labels: data.map((p) =>
      p.title?.length > 10 ? p.title.slice(0, 10) + "..." : p.title,
    ),

    datasets: [
      {
        label: "Stock",
        data: data.map((p) => p.stock),

        backgroundColor: "rgba(11, 11, 11, 0.7)",
        borderColor: "#949597",
        borderRadius: 4,
        maxBarThickness: 40,
        categoryPercentage: 0.6,
        barPercentage: 0.7,
      },
    ],
  };

  // =========================
  // CHART OPTIONS
  // =========================
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      tooltip: {
        callbacks: {
          title: (ctx) => {
            const item = data[ctx[0].dataIndex];
            return item.title;
          },

          label: (ctx) => {
            const item = data[ctx.dataIndex];

            return [`Stock: ${item.stock}`, `Price: ${item.price || 0} EGP`];
          },
        },
      },
    },

    scales: {
      x: {
        offset: true,
        ticks: {
          autoSkip: false,
          maxRotation: 40,
          minRotation: 0,
        },

        title: {
          display: true,
          text: "Products",
        },
      },

      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "Stock",
        },
      },
    },
  };

  return (
    <div className="space-y-5">
      {/* FILTERS */}
      <StockFilters
        search={search}
        setSearch={setSearch}
        collections={collections}
        categories={categories}
        subcategories={subcategories}
        collection={collection}
        category={category}
        subcategory={subcategory}
        setCollection={setCollection}
        setCategory={setCategory}
        setSubcategory={setSubcategory}
        limit={limit}
        setLimit={handleLimitChange}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />

      {/* PAGINATION */}
      <div className="flex items-center gap-3">
        <Button onClick={prevPage} disabled={page === 1 || loading}>
          Prev
        </Button>

        <span className="text-sm">
          {page} / {totalPages}
        </span>

        <Button onClick={nextPage} disabled={page === totalPages || loading}>
          Next
        </Button>
      </div>

      {/* CHART */}
      <div className="relative h-112 w-full border rounded-xl p-4">
        {/* EMPTY STATE */}
        {!loading && data.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                No Products Found
              </h3>

              <p className="text-sm text-gray-500">
                Try changing filters or search keyword
              </p>
            </div>
          </div>
        ) : (
          <Bar data={chartData} options={options} />
        )}

        {/* LOADING */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-50">
            <div className="w-7 h-7 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
