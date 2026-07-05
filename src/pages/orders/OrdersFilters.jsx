"use client";

import { useLateSearch } from "@/components/hooks/useLateSearch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const FilterItem = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    {children}
  </div>
);

export default function OrderFilters({ filters, updateFilter }) {
  const [search, setSearch] = useState(filters.search || "");

  const debouncedSearch = useLateSearch(search, 400);

  useEffect(() => {
    updateFilter("search", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="flex gap-4 flex-wrap items-end">
      <FilterItem label="Search Order">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Order number / email..."
          className="w-70 py-4 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </FilterItem>

      <FilterItem label="Order Status">
        <Select
          value={filters.orderStatus}
          onValueChange={(val) => updateFilter("orderStatus", val)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      <FilterItem label="Payment Status">
        <Select
          value={filters.paymentStatus}
          onValueChange={(val) => updateFilter("paymentStatus", val)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      <FilterItem label="Payment Method">
        <Select
          value={filters.paymentMethod}
          onValueChange={(val) => updateFilter("paymentMethod", val)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      <FilterItem label="Coupon">
        <Select
          value={filters.coupon}
          onValueChange={(val) => updateFilter("coupon", val)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">With Coupon</SelectItem>
            <SelectItem value="false">No Coupon</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      <FilterItem label="Per Page">
        <Select
          value={String(filters.limit)}
          onValueChange={(val) => updateFilter("limit", Number(val))}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      <FilterItem label="Sort By">
        <Select
          value={filters.sort}
          onValueChange={(val) => updateFilter("sort", val)}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-createdAt">Newest</SelectItem>
            <SelectItem value="createdAt">Oldest</SelectItem>
            <SelectItem value="-totalPriceAfterDiscount">
              Highest Paid
            </SelectItem>
            <SelectItem value="totalPriceAfterDiscount">Lowest Paid</SelectItem>
            <SelectItem value="-paidAt">Latest Paid</SelectItem>
            <SelectItem value="paidAt">Oldest Paid</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>
    </div>
  );
}
