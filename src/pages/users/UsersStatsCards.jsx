import {
  Shield,
  TrendingDown,
  TrendingUp,
  User,
  UserCheck,
  Activity,
} from "lucide-react";

export default function UsersStatsCards({ data }) {
  const stats = [
    {
      title: "Admins",
      data: data?.adminUsers,
      icon: Shield,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Normal",
      data: data?.normalUsers,
      icon: User,
      bg: "bg-gray-50",
      iconColor: "text-gray-700",
    },
    {
      title: "Verified",
      data: data?.verifiedUsers,
      icon: UserCheck,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Active",
      data: data?.activeUsers,
      icon: Activity,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const calcGrowth = (current, previous) => {
    if (!previous) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, i) => {
        const Icon = item.icon;

        const total = item.data?.total ?? 0;
        const current = item.data?.current ?? 0;
        const previous = item.data?.previous ?? 0;

        const growth = item.data?.growth ?? calcGrowth(current, previous);

        const isPositive = growth >= 0;

        return (
          <div
            key={i}
            className="
              bg-white
              border border-gray-100
              rounded-xl
              px-4 py-3
              hover:shadow-sm
              transition
              flex flex-col gap-3
            "
          >
            {/* TOP ROW */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">{item.title}</p>

              <div className={`${item.bg} p-2 rounded-lg`}>
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
            </div>

            {/* MAIN VALUE (COMPACT) */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 leading-none">
                  {total}
                </p>
              </div>

              {/* GROWTH BADGE */}
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium ${
                  isPositive
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}

                <span>
                  {isPositive ? "+" : ""}
                  {growth.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* MINI COMPARISON */}
            <div className="flex justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-100">
              <span>current month: {current}</span>
              <span>Prev month: {previous}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
