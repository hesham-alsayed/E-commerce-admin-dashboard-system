"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

export default function StockFilters({
  search,
  setSearch,

  collections,
  categories,
  subcategories,

  collection,
  category,
  subcategory,

  setCollection,
  setCategory,
  setSubcategory,

  limit,
  setLimit,

  applyFilters,
  clearFilters,
}) {
  return (
    <div className="flex flex-wrap gap-3 items-end">
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded-md"
        placeholder="Search..."
      />

      {/* COLLECTION */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Collection</span>

        <Select value={collection} onValueChange={setCollection}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All Collections" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            {collections.map((c) => (
              <SelectItem key={c._id} value={c._id}>
                {c.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* CATEGORY */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Category</span>

        <Select
          value={category}
          onValueChange={setCategory}
          disabled={!collection || collection === "all"}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            {categories.map((c) => (
              <SelectItem key={c._id} value={c._id}>
                {c.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* SUBCATEGORY */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Subcategory</span>

        <Select
          value={subcategory}
          onValueChange={setSubcategory}
          disabled={!category || category === "all"}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All Subcategories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            {subcategories.map((s) => (
              <SelectItem key={s._id} value={s._id}>
                {s.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* LIMIT */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Show</span>

        <Select value={limit} onValueChange={setLimit}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* APPLY */}
      <Button
        onClick={applyFilters}
        className="bg-gray-900 hover:cursor-pointer text-white"
      >
        Apply
      </Button>

      {/* CLEAR */}
      <Button
        onClick={clearFilters}
        variant="outline"
        className="hover:cursor-pointer"
      >
        Clear
      </Button>
    </div>
  );
}
