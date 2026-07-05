"use client";

import {
  Clock,
  RefreshCw,
  Truck,
  Ban,
  FileText,
  TrendingUp,
  Package,
} from "lucide-react";

/* ================= META ================= */
const getMeta = (label) => {
  switch (label) {
    case "Total Profit":
      return {
        icon: TrendingUp,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        desc: "Confirmed paid revenue only",
      };

    case "Pending Revenue":
      return {
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
        desc: "Revenue waiting confirmation",
      };

    case "Processing Revenue":
      return {
        icon: RefreshCw,
        color: "text-blue-600",
        bg: "bg-blue-50",
        desc: "Orders currently in processing stage",
      };

    case "Shipped Revenue":
      return {
        icon: Truck,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        desc: "Orders already shipped to customers",
      };

    case "Delivered Revenue":
      return {
        icon: Package,
        color: "text-purple-600",
        bg: "bg-purple-50",
        desc: "Successfully delivered orders",
      };

    case "Cancelled Revenue":
      return {
        icon: Ban,
        color: "text-red-600",
        bg: "bg-red-50",
        desc: "Revenue lost from cancelled orders",
      };

    case "Total Invoices":
      return {
        icon: FileText,
        color: "text-slate-600",
        bg: "bg-slate-100",
        desc: "All orders in system",
      };

    default:
      return {
        icon: FileText,
        color: "text-gray-500",
        bg: "bg-gray-100",
        desc: "Metric data",
      };
  }
};

/* ================= FORMAT ================= */
const formatValue = (value, type) => {
  if (type === "money") {
    return `EGP ${Number(value || 0).toLocaleString()}`;
  }
  return Number(value || 0).toLocaleString();
};

/* ================= COMPONENT ================= */
export default function TotalStatsInvoice({ stats = [] }) {
  const firstRowStats = stats.slice(0, 4); // First 4 cards
  const secondRowStats = stats.slice(4, 7); // Next 3 cards

  return (
    <div className="w-full space-y-4">
      {/* First Row - 4 cards, full width */}
      <div
        className="grid gap-4 w-full"
        style={{
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {firstRowStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Second Row - 3 cards, full width */}
      {secondRowStats.length > 0 && (
        <div
          className="grid gap-4 w-full"
          style={{
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          {secondRowStats.map((stat, index) => (
            <StatCard key={index + 4} stat={stat} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STAT CARD COMPONENT ================= */
function StatCard({ stat }) {
  const meta = getMeta(stat.label);
  const Icon = meta.icon;

  return (
    <div
      className="
        w-full
        group
        border border-gray-200
        rounded-xl
        p-4
        bg-white
        flex gap-4 items-start
      
      "
    >
      <div
        className={`
          w-11 h-11 flex items-center justify-center
          rounded-lg ${meta.bg}
          shrink-0
        `}
      >
        <Icon className={`w-5 h-5 ${meta.color}`} />
      </div>

      <div className="space-y-1 min-w-0 flex-1">
        <p className="text-xs text-gray-500 font-medium truncate">
          {stat.label}
        </p>

        <p className="text-sm font-bold text-gray-900">
          {formatValue(stat.value, stat.type)}
        </p>

        <p className="text-[11px] text-gray-400">{meta.desc}</p>
      </div>
    </div>
  );
}
