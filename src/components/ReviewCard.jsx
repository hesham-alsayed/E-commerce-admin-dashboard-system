import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MessageSquare, Star, Users, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useReviews } from "./hooks/useReviews";

export default function ReviewCard() {
  const { fetchReviewsAnalytics, reviews } = useReviews();
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchReviewsAnalytics();
      setData(res.data);
    };

    load();
  }, [reviews]);

  const cards = [
    {
      title: "Total Reviews",
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      key: "reviews",
      main: "total",
      text: "All reviews received from users",
    },
    {
      title: "Comments",
      icon: MessageSquare,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      key: "comments",
      main: "current",
      text: "Total comments activity",
    },
    {
      title: "Users",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      key: "users",
      main: "current",
      text: "Active users in system",
    },
    {
      title: "Products",
      icon: Package,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      key: "products",
      main: "current",
      text: "Available products count",
    },
  ];

  return (
    <main className="mb-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const item = data?.[card.key];

          return (
            <Card key={card.key} className="border-0 bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}
                >
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>

              <CardContent>
                {/* MAIN VALUE */}
                <div className="text-3xl font-bold">
                  {item?.[card.main] ?? 0}
                </div>

                {/* GROWTH */}
                <p className="mt-1 text-xs text-muted-foreground">
                  <span
                    className={
                      item?.growth >= 0 ? "text-emerald-500" : "text-red-500"
                    }
                  >
                    {item?.growth ?? 0}%
                  </span>{" "}
                  from last month
                </p>

                {/* EXTRA INFO */}
                <p className="mt-2 text-xs text-gray-500">{card.text}</p>

                {/* COMPARE */}
                <p className="mt-1 text-xs text-gray-400">
                  Previous: {item?.previous ?? 0} → Current:{" "}
                  {item?.[card.main] ?? 0}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
