"use client";

import { Star } from "lucide-react";
import { BiComment } from "react-icons/bi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductRatingChart({
  data,
  loading,
  page,
  limit,
  totalPages,
  handleLimitChange,
  nextPage,
  prevPage,
}) {
  return (
    <div className="relative bg-white border rounded-2xl p-5 space-y-5">
      {/* LOADING */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
            <p className="text-xs text-gray-500">Loading...</p>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-600">Product Ratings</h2>

        <Select value={limit} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-28 text-sm">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="5">Top 5</SelectItem>
            <SelectItem value="10">Top 10</SelectItem>
            <SelectItem value="20">Top 20</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {!loading && data.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No Products Found
          </div>
        )}

        {!loading &&
          data.map((item, i) => {
            const percent = (item.averageRating / 5) * 100;

            return (
              <div
                key={i}
                className="p-3 rounded-lg hover:bg-gray-50 transition space-y-2"
              >
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span className="font-medium text-gray-800 capitalize truncate max-w-[55%]">
                    {item.title}
                  </span>

                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <BiComment size={14} />
                      {item.numReviews}
                    </span>

                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500" />
                      {item.averageRating}/5
                    </span>
                  </div>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-700 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* PAGINATION */}
      {!loading && data.length > 0 && (
        <div className="flex items-center justify-between border-t pt-3">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-3 py-1 text-xs bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
          >
            Prev
          </button>

          <span className="text-xs text-gray-500">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="px-3 py-1 text-xs bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
