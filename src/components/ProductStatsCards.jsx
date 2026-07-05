import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";

export default function ProductStatsCards({ analytics }) {
  console.log(analytics);

  const stats = [
    {
      label: "Total Revenue",
      value: `$${analytics.totalRevenue}`,
      icon: DollarSign,
    },
    {
      label: "Units Sold",
      value: analytics.totalSold,
      icon: TrendingUp,
    },
    {
      label: "Total Orders",
      value: analytics.totalOrders,
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;

        return (
          <div
            key={i}
            className="bg-white px-4 py-8 rounded-xl border flex items-center gap-3"
          >
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="font-bold text-lg">{s.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
