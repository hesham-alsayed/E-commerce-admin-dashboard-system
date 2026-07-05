import { Pie } from "react-chartjs-2";
import { useMemo, useState } from "react";
import ZoneFilter from "./ZoneFilter";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function ZoneAnalyticsChart(props) {
  const {
    data,
    loading,
    filters,
    setFilters,
    handleApply,
    handleClear,
    mode,
    setMode,
    getValue,
  } = props;

  const [openFilter, setOpenFilter] = useState(false);

  const generateGrayColors = (count) =>
    Array.from({ length: count }, (_, i) => {
      const lightness = 30 + (i * 50) / Math.max(count - 1, 1);
      return `hsl(0, 0%, ${lightness}%)`;
    });

  const chartData = useMemo(() => {
    return {
      labels: data.map((d) => d.zone || "Unknown"),
      datasets: [
        {
          data: data.map(getValue),
          backgroundColor: generateGrayColors(data.length),
          borderWidth: 1,
        },
      ],
    };
  }, [data, getValue]);

  const isEmpty = !data || data.length === 0;

  // 🔥 tooltip logic
  const tooltipCallback = {
    callbacks: {
      label: (context) => {
        const index = context.dataIndex;
        const item = data[index];

        const zone = item?.zone || "Unknown";

        if (mode === "users") {
          return ` Users: ${item?.uniqueUsers || 0} | Count: ${item?.usersCount || 0}`;
        }

        if (mode === "orders") {
          return ` Orders: ${item?.ordersCount || 0}`;
        }

        if (mode === "revenue") {
          return ` Revenue: ${item?.totalRevenue || 0} EGP`;
        }

        return `${zone}: ${context.raw}`;
      },
    },
  };

  const options = {
    plugins: {
      tooltip: tooltipCallback,
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white border rounded-2xl p-5 space-y-5">
      {/* FILTER */}
      <ZoneFilter
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

      {/* CHART */}
      <div className="h-85 relative flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <p className="text-gray-500 animate-pulse">Loading...</p>
          </div>
        )}

        {!loading && isEmpty && (
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium">No Data Found</p>
            <p className="text-sm">Try changing filters</p>
          </div>
        )}

        {!loading && !isEmpty && <Pie data={chartData} options={options} />}
      </div>
    </div>
  );
}
