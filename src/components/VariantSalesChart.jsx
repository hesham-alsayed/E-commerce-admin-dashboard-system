import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChart3 } from "lucide-react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function VariantSalesChart({ data }) {
  const normalizedData =
    data?.map((v) => ({
      color: v.color,
      totalSold: v.totalSold ?? 0,
    })) || [];

  // ❌ check: no sales at all
  const hasSales = normalizedData.some((v) => v.totalSold > 0);

  // EMPTY STATE if no sales
  if (!hasSales) {
    return (
      <div className="bg-white border rounded-xl p-10 flex flex-col items-center justify-center text-center">
        <div className="p-3 rounded-full bg-blue-50 text-blue-700 mb-3">
          <BarChart3 size={28} />
        </div>

        <h3 className="text-sm font-semibold text-gray-800">No Sales Yet</h3>

        <p className="text-xs text-gray-500 mt-1 max-w-xs">
          The chart will appear once at least one variant generates sales.
        </p>
      </div>
    );
  }

  const chartData = {
    labels: normalizedData.map((v) => v.color),
    datasets: [
      {
        label: "Total Sold",
        data: normalizedData.map((v) => v.totalSold),
        backgroundColor: "#1e3a8a",
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `Sold: ${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sold",
        },
      },
      y: {
        title: {
          display: true,
          text: "Color",
        },
      },
    },
  };

  return (
    <div className="bg-white border rounded-xl p-4">
      <h3 className="font-semibold mb-4">Variant Sales Chart</h3>

      <Bar data={chartData} options={options} />
    </div>
  );
}
