"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersStatsCardsSkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          className="border rounded-2xl shadow-sm bg-white"
        >
          {/* HEADER */}
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="h-10 w-10 rounded-lg" />
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="space-y-3">
            <Skeleton className="h-8 w-20" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}