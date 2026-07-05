"use client";

import { MessageSquare } from "lucide-react";

export default function EmptyReviewsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <MessageSquare className="w-8 h-8 text-gray-300 mb-3" />

      <p className="text-sm font-medium text-gray-600">
        No reviews found
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Try adjusting your filters or search
      </p>
    </div>
  );
}