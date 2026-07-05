"use client";

import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";
import { Bar, Line } from "react-chartjs-2";

export default function TotalSalesChart({ type, setType, data = [], loading }) {
  // ================= LABEL FORMAT =================
  const formatLabel = (item) => {
    const id = item?._id || {};

    if (type === "daily") {
      if (!id.day) return "N/A";
      return `${id.day}/${id.month}/${id.year}`;
    }

    if (type === "monthly") {
      if (!id.month) return "N/A";
      return `${id.month}/${id.year}`;
    }

    return item?.year || "N/A";
  };

  // ================= STEP SIZE =================
  const getStepSize = (list, type) => {
    if (!list?.length) return 1;

    const values = list.map((d) => Number(d?.totalRevenue) || 0);

    const max = Math.max(...values);

    if (!max) return 10;

    if (type === "daily") return Math.ceil(max / 10);

    if (type === "monthly") return Math.ceil(max / 6);

    return Math.ceil(max / 5);
  };

  // ================= EMPTY STATE =================
  const isEmpty =
    !data ||
    !Array.isArray(data) ||
    data.length === 0 ||
    data.every((d) => (Number(d?.totalRevenue) || 0) === 0);

  // ================= CHART DATA =================
  const chartData = {
    labels: data?.map(formatLabel) || [],

    datasets: [
      {
        label: "Revenue",

        data: data?.map((d) => Number(d?.totalRevenue) || 0) || [],

        // ================= LINE STYLE =================
        borderColor: "#424242",
        backgroundColor: "#424242",

        borderWidth: 2,

        fill: false,

        // ✅ smoother without breaking line
        tension: 0.2,

        // ✅ connect missing points
        spanGaps: true,

        // ✅ points
        pointRadius: 4,
        pointHoverRadius: 6,

        pointBackgroundColor: "#424242",
        pointBorderColor: "#424242",

        // ✅ smoother curve
        cubicInterpolationMode: "monotone",

        // ✅ only for bars
        borderRadius: 6,
        maxBarThickness: 45,
      },
    ],
  };

  // ================= COMMON OPTIONS =================
  const commonOptions = {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#111827",
        padding: 12,

        callbacks: {
          label: (context) => {
            return `Revenue: ${context.raw} EGP`;
          },
        },
      },
    },

    elements: {
      line: {
        capBezierPoints: true,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#6B7280",
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "#E5E7EB",
        },

        ticks: {
          color: "#6B7280",

          stepSize: getStepSize(data, type),
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-2xl border flex flex-col gap-4 relative">
      {/* ================= LOADING ================= */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex items-center justify-center">
          <LoaderSpinnerButton />
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2">
          {["daily", "monthly", "yearly"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1 rounded-md text-sm border transition-all ${
                type === t
                  ? "bg-gray-700 text-white border-gray-700"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="text-xs capitalize text-gray-600 bg-gray-100 py-2 px-3 rounded-xl">
          {type === "daily" &&
            "Daily revenue chart shows sales performance for each day."}

          {type === "monthly" && "Monthly revenue grouped by each month."}

          {type === "yearly" && "Yearly revenue overview."}
        </p>
      </div>

      {/* ================= EMPTY ================= */}
      {isEmpty ? (
        <div className="h-80 flex flex-col items-center justify-center text-gray-400 text-sm">
          <p className="font-medium">No data available</p>

          <p className="text-xs">Try selecting another range</p>
        </div>
      ) : (
        <div className="h-80 w-full">
          {type === "daily" ? (
            <Line data={chartData} options={commonOptions} />
          ) : (
            <Bar data={chartData} options={commonOptions} />
          )}
        </div>
      )}
    </div>
  );
}
