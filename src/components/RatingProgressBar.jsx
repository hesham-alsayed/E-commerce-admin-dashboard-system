"use client";

import { Star } from "lucide-react";
import { Progress } from "./ui/progress";
import { useReviews } from "./hooks/useReviews";
import { showToast } from "@/lib/utils";
import { useEffect } from "react";

export default function RatingProgressBar() {
  const { analyticsRated, fetchRatedAnalytics } = useReviews();
  const handleFetchRated = async () => {
    try {
      const result = await fetchRatedAnalytics();
      console.log(result);
    } catch (error) {
      showToast({ message: error.response.data.message, type: "error" });
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    handleFetchRated();
  }, []);
  console.log(analyticsRated);

  return (
    <div className="h-50 w-full px-6 py-2  border border-gray-200 rounded-sm ">
      {/* HEADER (smaller) */}
      <div className="">
        <p className="text-[16px] font-medium capitalize mb-2 ">
          Customer Reviews
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(analyticsRated?.averageRating)
                    ? "fill-blue-500 text-blue-500"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>

          <span className="text-lg font-bold">
            {analyticsRated?.averageRating}
          </span>

          <span className="text-xs text-muted-foreground">
            ({analyticsRated?.totalReviews})
          </span>
        </div>
      </div>

      {/* BODY */}
      <div>
        {analyticsRated?.ratings.map((rating) => (
          <div key={rating.star} className="flex items-center gap-2">
            {/* star */}
            <div className="flex items-center gap-1 w-10 shrink-0">
              <span className="text-xs font-medium">{rating.star}</span>
              <Star className="h-3 w-3 text-blue-500 fill-blue-500" />
            </div>

            {/* progress */}
            <div className="flex-1">
              <Progress
                value={rating.percent}
                className="h-1.5 bg-muted [&>div]:bg-blue-500"
              />
            </div>

            {/* percent */}
            <div className="w-14 text-right">
              <span className="text-[11px] text-muted-foreground">
                {rating.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
