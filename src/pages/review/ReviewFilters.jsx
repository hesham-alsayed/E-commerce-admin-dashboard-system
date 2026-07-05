"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useLateSearch } from "@/components/hooks/useLateSearch";
import { Star } from "lucide-react";

const FilterField = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    {children}
  </div>
);

export default function ReviewFilters({ filters, setFilters }) {
  const [search, setSearch] = useState(filters.search || "");
  const debouncedSearch = useLateSearch(search, 400);

  // ✅ debounce search
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch, setFilters]);

  const update = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const selectClass = " w-46 border border-gray-200 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:ring-0 data-[state=open]:outline-none data-[state=open]:border-gray-200 shadow-none rounded-lg"

  return (
    <div className="flex flex-wrap gap-4 items-end">
      {/* ================= SEARCH ================= */}
      <FilterField label="Search Reviews">
        <Input
          placeholder="Search by user, product, comment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-72
              border
  focus-visible:ring-0
  focus-visible:ring-offset-0
  focus:outline-none
          "
        />
      </FilterField>

      {/* ================= RATING ================= */}
      <FilterField label="Rating">
        <Select
          value={filters.rating}
          onValueChange={(v) => update("rating", v)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>

            {[5, 4, 3, 2, 1].map((r) => (
              <SelectItem key={r} value={String(r)}>
                <div className="flex items-center gap-1">
                  {Array.from({ length: r }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="ml-1">({r})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      {/* ================= LIMIT ================= */}
      <FilterField label="Per Page">
        <Select
          value={String(filters.limit)}
          onValueChange={(v) =>
            setFilters((prev) => ({
              ...prev,
              limit: Number(v),
              page: 1,
            }))
          }
        >
          <SelectTrigger className={selectClass}>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </FilterField>
    </div>
  );
}
