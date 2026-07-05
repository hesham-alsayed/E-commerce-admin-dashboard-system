"use client";

export default function PaymentCompareFilter({
  filters,
  setFilters,
  onApply,
  onClear,
  loading,
}) {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      {/* START DATE */}
      <input
        type="date"
        value={filters.start}
        onChange={(e) =>
          setFilters((p) => ({ ...p, start: e.target.value }))
        }
        className="border p-2 rounded-md text-sm"
      />

      {/* END DATE */}
      <input
        type="date"
        value={filters.end}
        onChange={(e) =>
          setFilters((p) => ({ ...p, end: e.target.value }))
        }
        className="border p-2 rounded-md text-sm"
      />

      {/* YEAR */}
      <input
        type="number"
        value={filters.year}
        onChange={(e) =>
          setFilters((p) => ({ ...p, year: e.target.value }))
        }
        className="border p-2 rounded-md text-sm w-24"
        placeholder="Year"
      />

      {/* APPLY */}
      <button
        onClick={() => onApply(filters)}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
      >
        Apply
      </button>

      {/* CLEAR */}
      <button
        onClick={onClear}
        disabled={loading}
        className="bg-gray-100 px-4 py-2 rounded-md text-sm disabled:opacity-50"
      >
        Clear
      </button>
    </div>
  );
}