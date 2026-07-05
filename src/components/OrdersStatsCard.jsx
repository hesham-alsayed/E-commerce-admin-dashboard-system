"use client";

import {
  ShoppingCart,
  RefreshCw,
  CheckCircle,
  XCircle,
  PackageCheck,
  Truck,
} from "lucide-react";

export default function OrdersStatsCards({ stats }) {
  const cards = [
    {
      label: "Total Orders",
      desc: "All orders in system",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      label: "Pending",
      desc: "Orders waiting confirmation",
      value: stats?.pending || 0,
      icon: PackageCheck,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-600",
    },
    {
      label: "Processing",
      desc: "Orders currently processing",
      value: stats?.processing || 0,
      icon: RefreshCw,
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-600",
    },
    {
      label: "Shipped",
      desc: "Orders shipped to customers",
      value: stats?.shipped || 0,
      icon: Truck,
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-600",
    },
    {
      label: "Delivered",
      desc: "Successfully delivered orders",
      value: stats?.delivered || 0,
      icon: CheckCircle,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600",
    },
    {
      label: "Cancelled",
      desc: "Cancelled or failed orders",
      value: stats?.cancelled || 0,
      icon: XCircle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              {/* TEXT */}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {card.label}
                </p>

                <p className="text-xs text-gray-500 mt-1">{card.desc}</p>

                <h2 className="text-2xl font-bold text-black mt-3">
                  {card.value}
                </h2>
              </div>

              {/* ICON */}
              <div
                className={`p-3 rounded-xl ${card.iconBg} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
