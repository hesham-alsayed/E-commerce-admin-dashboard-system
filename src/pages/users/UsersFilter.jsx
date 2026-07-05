"use client";

import { useLateSearch } from "@/components/hooks/useLateSearch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function UserFilters({ filters, setFilters }) {
  const [search, setSearch] = useState(filters.search || "");

  const debouncedSearch = useLateSearch(search, 400);

  // 🔍 SEARCH (debounced)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch, setFilters]);

  // 🔧 UPDATE FILTER (KEEP "all" IN STATE)
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const selectClass =
    "w-full bg-background shadow-none border border-input " +
    "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none " +
    "data-[state=open]:ring-0 data-[state=open]:outline-none";

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 rounded-xl bg-muted/20">
      {/* 🔍 SEARCH */}
      <div className="space-y-1 w-full">
        <Label>Search</Label>
        <Input
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-input shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* 👤 ROLE */}
      <div className="space-y-1 w-full">
        <Label>Role</Label>
        <Select
          value={filters.role}
          onValueChange={(val) => updateFilter("role", val)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ⚡ ACTIVE */}
      <div className="space-y-1 w-full">
        <Label>Status</Label>
        <Select
          value={filters.isActive}
          onValueChange={(val) => updateFilter("isActive", val)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ✅ VERIFIED */}
      <div className="space-y-1 w-full">
        <Label>Verified</Label>
        <Select
          value={filters.isVerified}
          onValueChange={(val) => updateFilter("isVerified", val)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="All Verified" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Verified</SelectItem>
            <SelectItem value="false">Not Verified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔽 SORT */}
      <div className="space-y-1 w-full">
        <Label>Sort</Label>
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
            <SelectItem value="firstName">Name A-Z</SelectItem>
            <SelectItem value="-firstName">Name Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

