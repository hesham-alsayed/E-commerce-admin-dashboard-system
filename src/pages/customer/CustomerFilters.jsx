"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function CustomerFilters({ filters, updateFilter }) {
  const handleNumberChange = (key, value) => {
    if (value === "") {
      updateFilter(key, "");
      return;
    }

    const num = Number(value);
    if (Number.isNaN(num)) return;

    updateFilter(key, Math.max(0, num));
  };

  const inputClass =
    "w-full border-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none";

  const selectClass =
    "w-full border-1 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-4 bg-muted/20 rounded-xl">
      {/* SEARCH */}
      <div className="space-y-1">
        <Label>Search</Label>
        <Input
          value={filters.search}
          placeholder="Search by name or email..."
          className={inputClass}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
      </div>

      {/* STATUS */}
      <div className="space-y-1">
        <Label>Status</Label>
        <Select
          value={filters.status}
          onValueChange={(val) => updateFilter("status", val)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All customers</SelectItem>
            <SelectItem value="true">Active customers</SelectItem>
            <SelectItem value="false">Inactive customers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* MIN SPEND */}
      <div className="space-y-1">
        <Label>Min Spend</Label>
        <Input
          type="number"
          min={0}
          value={filters.revenueGte}
          placeholder="Min spend (e.g. 0)"
          className={inputClass}
          onChange={(e) => handleNumberChange("revenueGte", e.target.value)}
        />
      </div>

      {/* MAX SPEND */}
      <div className="space-y-1">
        <Label>Max Spend</Label>
        <Input
          type="number"
          min={0}
          value={filters.revenueLte}
          placeholder="Max spend (e.g. 1000)"
          className={inputClass}
          onChange={(e) => handleNumberChange("revenueLte", e.target.value)}
        />
      </div>

      {/* MIN ORDERS */}
      <div className="space-y-1">
        <Label>Min Orders</Label>
        <Input
          type="number"
          min={0}
          value={filters.ordersGte}
          placeholder="Min orders (e.g. 1)"
          className={inputClass}
          onChange={(e) => handleNumberChange("ordersGte", e.target.value)}
        />
      </div>

      {/* MAX ORDERS */}
      <div className="space-y-1">
        <Label>Max Orders</Label>
        <Input
          type="number"
          min={0}
          value={filters.ordersLte}
          placeholder="Max orders (e.g. 10)"
          className={inputClass}
          onChange={(e) => handleNumberChange("ordersLte", e.target.value)}
        />
      </div>

      {/* SORT */}
      <div className="space-y-1">
        <Label>Sort By</Label>
        <Select
          value={filters.sort}
          onValueChange={(val) => updateFilter("sort", val)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastOrderDate">Last Order Date</SelectItem>
            <SelectItem value="totalRevenue">Total Spend</SelectItem>
            <SelectItem value="ordersCount">Orders Count</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ORDER */}
      <div className="space-y-1">
        <Label>Order</Label>
        <Select
          value={filters.order}
          onValueChange={(val) => updateFilter("order", val)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Descending</SelectItem>
            <SelectItem value="asc">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* LIMIT */}
      <div className="space-y-1">
        <Label>Show</Label>
        <Select
          value={filters.limit.toString()}
          onValueChange={(val) => updateFilter("limit", Number(val))}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 per page</SelectItem>

            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
