"use client";

import { useLateSearch } from "@/components/hooks/useLateSearch";
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

export default function NotificationsFilters({ filters, setFilters }) {
  const [search, setSearch] = useState(filters.search || "");

  const debouncedSearch = useLateSearch(search, 400);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const baseInput =
    "w-full border border-gray-200 bg-white rounded-md px-3 py-2 text-sm " +
    "hover:border-gray-300 transition focus-visible:outline-none focus-visible:ring-0";

  const baseSelectTrigger =
    "w-full border border-gray-200 bg-white rounded-md px-3 py-2 text-sm " +
    "hover:border-gray-300 transition focus-visible:outline-none focus-visible:ring-0 data-[state=open]:border-gray-400";

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-5 
        gap-4 
        p-4 
        border 
        rounded-lg 
        bg-white
        w-full
      "
    >
      {/* 🔍 SEARCH */}
      <div className="space-y-1 w-full">
        <Label className="text-sm text-gray-600">Search</Label>
        <Input
          className={baseInput}
          placeholder="Search title or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📖 READ STATUS */}
      <div className="space-y-1 w-full">
        <Label className="text-sm text-gray-600">Status</Label>
        <Select
          value={filters.read ?? "all"}
          onValueChange={(val) =>
            updateFilter("read", val === "all" ? undefined : val)
          }
        >
          <SelectTrigger className={baseSelectTrigger}>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Read</SelectItem>
            <SelectItem value="false">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🧾 TYPE */}
      <div className="space-y-1 w-full">
        <Label className="text-sm text-gray-600">Type</Label>
        <Select
          value={filters.type || "all"}
          onValueChange={(val) =>
            updateFilter("type", val === "all" ? undefined : val)
          }
        >
          <SelectTrigger className={baseSelectTrigger}>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="order_received">Order Received</SelectItem>
            <SelectItem value="order-updated">Order update</SelectItem>
            <SelectItem value="order_cancelled">order cancelled </SelectItem>
            <SelectItem value="order_paid">order paid</SelectItem>
            <SelectItem value="new_user_signup">New User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🎯 TARGET */}
      <div className="space-y-1 w-full">
        <Label className="text-sm text-gray-600">Target</Label>
        <Select
          value={filters.target || "all"}
          onValueChange={(val) =>
            updateFilter("target", val === "all" ? undefined : val)
          }
        >
          <SelectTrigger className={baseSelectTrigger}>
            <SelectValue placeholder="Target" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔽 SORT */}
      <div className="space-y-1 w-full">
        <Label className="text-sm text-gray-600">Sort</Label>
        <Select
          value={filters.sort || "-createdAt"}
          onValueChange={(val) => updateFilter("sort", val)}
        >
          <SelectTrigger className={baseSelectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-createdAt">Newest</SelectItem>
            <SelectItem value="createdAt">Oldest</SelectItem>
            <SelectItem value="type">Type A-Z</SelectItem>
            <SelectItem value="-type">Type Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
