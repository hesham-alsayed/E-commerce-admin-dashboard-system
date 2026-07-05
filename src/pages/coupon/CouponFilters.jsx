"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const FilterItem = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    {children}
  </div>
);

export default function CouponFilters({ filters, updateFilter }) {
  return (
    <div className="flex gap-4 flex-wrap items-end">
      {/* SEARCH */}
      <FilterItem label="Search">
        <Input
          placeholder="Search coupon code..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-60"
        />
      </FilterItem>

      {/* TYPE */}
      <FilterItem label="Type">
        <Select
          value={filters.type || "all"}
          onValueChange={(val) => updateFilter("type", val)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="partner">Partner</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      {/* STATUS */}
      <FilterItem label="Status">
        <Select
          value={filters.active || "all"}
          onValueChange={(val) => updateFilter("active", val)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      {/* LIMIT */}
      <FilterItem label="Per Page">
        <Select
          value={filters.limit?.toString() || "10"}
          onValueChange={(val) => updateFilter("limit", Number(val))}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      {/* SORT */}
      <FilterItem label="Sort By">
        <Select
          value={filters.sort || "-createdAt"}
          onValueChange={(val) => updateFilter("sort", val)}
        >
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="-createdAt">Newest</SelectItem>

            <SelectItem value="createdAt">Oldest</SelectItem>

            <SelectItem value="-discountValue">High Discount</SelectItem>

            <SelectItem value="discountValue">Low Discount</SelectItem>

            <SelectItem value="-usedCount">Most Used</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>
    </div>
  );
}
