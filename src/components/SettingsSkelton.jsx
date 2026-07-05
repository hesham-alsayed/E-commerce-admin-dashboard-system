"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Card, CardContent } from "@/components/ui/card";

export default function SettingsSkeleton() {
  return (
    <div className="p-6 space-y-6 container mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton width={220} height={25} />
          <Skeleton width={320} height={15} />
        </div>

        <div className="flex gap-2">
          <Skeleton width={90} height={35} />
          <Skeleton width={90} height={35} />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {Array(8).fill(0).map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="flex justify-between items-center p-4">

              {/* LEFT TEXT */}
              <div className="space-y-2">
                <Skeleton width={140} height={18} />
                <Skeleton width={200} height={12} />
              </div>

              {/* RIGHT CONTROLS */}
              <div className="flex items-center gap-3">
                <Skeleton width={60} height={30} />
                <Skeleton circle width={30} height={30} />
              </div>

            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
}