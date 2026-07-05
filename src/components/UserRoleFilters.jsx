"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserRoleFilters({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      role: "",
      isActive: "",
      sort: "desc",
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
      {/* SEARCH */}
      <Input
        placeholder="Search by name or email..."
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        className="w-full md:w-1/3"
      />

      {/* ROLE */}
      <Select
        value={filters.role}
        onValueChange={(v) => handleChange("role", v)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>

      {/* ACTIVE */}
      <Select
        value={filters.isActive}
        onValueChange={(v) => handleChange("isActive", v)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
      </Select>

      {/* SORT */}
      <Select
        value={filters.sort}
        onValueChange={(v) => handleChange("sort", v)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Newest</SelectItem>
          <SelectItem value="asc">Oldest</SelectItem>
        </SelectContent>
      </Select>

      {/* LIMIT */}
      <Select
        value={String(filters.limit)}
        onValueChange={(v) => handleChange("limit", Number(v))}
      >
        <SelectTrigger className="w-full md:w-[120px]">
          <SelectValue placeholder="Limit" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="40">40</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>

      {/* RESET */}
      <Button variant="outline" onClick={resetFilters}>
        Reset
      </Button>
    </div>
  );
}
