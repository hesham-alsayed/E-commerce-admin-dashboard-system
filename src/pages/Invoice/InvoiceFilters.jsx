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

export default function InvoiceFilters({ filters, updateFilter }) {
  const selectClass =
    "w-40 border border-gray-200 shadow-none focus:border-gray-200 focus:ring-0 focus:outline-none data-[state=open]:border-gray-200";

  return (
    <div className="flex gap-4 flex-wrap items-end">
      {/* SEARCH */}
      <FilterItem label="Search Invoice">
        <Input
          placeholder="Invoice / order / email..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-50 border focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
        />
      </FilterItem>

      {/* PAYMENT STATUS */}
      <FilterItem label="Payment Status">
        <Select
          value={filters.paymentStatus}
          onValueChange={(val) => updateFilter("paymentStatus", val)}
        >
          <SelectTrigger className={selectClass}>
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

      {/* PAYMENT METHOD */}
      <FilterItem label="Method">
        <Select
          value={filters.paymentMethod}
          onValueChange={(val) => updateFilter("paymentMethod", val)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>

      {/* LIMIT */}
      <FilterItem label="Per Page">
        <Select
          value={String(filters.limit)}
          onValueChange={(val) => updateFilter("limit", Number(val))}
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
      </FilterItem>

      {/* SORT */}
      <FilterItem label="Sort By">
        <Select
          value={filters.sort}
          onValueChange={(val) => updateFilter("sort", val)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="-createdAt">Newest</SelectItem>

            <SelectItem value="createdAt">Oldest</SelectItem>

            <SelectItem value="-totalPriceAfterDiscount">
              Highest Amount
            </SelectItem>

            <SelectItem value="totalPriceAfterDiscount">
              Lowest Amount
            </SelectItem>

            <SelectItem value="-paidAt">Latest Paid</SelectItem>
          </SelectContent>
        </Select>
      </FilterItem>
    </div>
  );
}
