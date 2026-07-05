"use client";

import {
  Ticket,
  Activity,
  Percent,
  Users,
  Ban,
  TrendingUp,
} from "lucide-react";

export default function CouponStatsCard({ stats }) {
  const cards = [
    {
      title: "Total Coupons",
      value: stats?.totalCoupons || 0,
      icon: Ticket,
      color: "text-blue-600",
      bg: "bg-blue-50",
      desc: "All coupons created",
    },
    {
      title: "Active Coupons",
      value: stats?.totalActiveCoupons || 0,
      icon: Activity,
      color: "text-green-600",
      bg: "bg-green-50",
      desc: "Currently usable coupons",
    },
    {
      title: "Inactive Coupons",
      value: stats?.totalInactiveCoupons || 0,
      icon: Ban,
      color: "text-red-600",
      bg: "bg-red-50",
      desc: "Disabled or expired coupons",
    },
    {
      title: "General Coupons",
      value: stats?.totalGeneralCoupons || 0,
      icon: Percent,
      color: "text-purple-600",
      bg: "bg-purple-50",
      desc: "System-wide coupons",
    },
    {
      title: "Partner Coupons",
      value: stats?.totalPartnerCoupons || 0,
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50",
      desc: "Partner-generated coupons",
    },
    {
      title: "Total Usage",
      value: stats?.totalUsedCount || 0,
      icon: TrendingUp,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      desc: "All time coupon usage",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className="p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">{c.title}</p>

            <div className={`p-2 rounded-lg ${c.bg}`}>
              <c.icon className={`w-4 h-4 ${c.color}`} />
            </div>
          </div>

          {/* VALUE */}
          <h2 className={`text-2xl font-bold mt-3 text-gray-700`}>{c.value}</h2>

          {/* DESC */}
          <p className="text-xs text-gray-400 mt-1">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
