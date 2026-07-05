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
import { useEffect, useState } from "react";

export default function PartnerFilters({ filters, updateFilter }) {
  const [search, setSearch] = useState(filters.search || "");

  // debounce (simple + correct)
  useEffect(() => {
    const t = setTimeout(() => {
      updateFilter("search", search);
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  const change = (key, value) => {
    updateFilter(key, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4  rounded-lg ">
      <div className="space-y-1 w-full">
        <Label>Search</Label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email..."
        />
      </div>

      <div className="space-y-1">
        <Label>Status</Label>
        <Select
          value={filters.active}
          onValueChange={(val) => change("active", val)}
        >
          <SelectTrigger className="w-full  shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Show</Label>
        <Select
          value={String(filters.limit)}
          onValueChange={(val) => change("limit", Number(val))}
        >
          <SelectTrigger className="w-full  shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1 lg:col-span-2">
        <Label>Sort</Label>
        <Select
          value={filters.sort}
          onValueChange={(val) => change("sort", val)}
        >
          <SelectTrigger className="w-full  shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-createdAt">Newest</SelectItem>
            <SelectItem value="createdAt">Oldest</SelectItem>
            <SelectItem value="name">A-Z</SelectItem>
            <SelectItem value="-name">Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
