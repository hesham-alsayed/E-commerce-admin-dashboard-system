import { PackageSearch } from "lucide-react";

export default function VariantDetailedTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-6 flex flex-col items-center justify-center text-center">
        <div className="p-2.5 rounded-full bg-gray-100 text-gray-500 mb-2">
          <PackageSearch size={22} />
        </div>

        <h3 className="text-xs font-semibold text-gray-800">
          No Variant Analytics Found
        </h3>

        <p className="text-[11px] text-gray-500 mt-1 max-w-xs">
          Sales will appear once orders are placed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-4">
      {/* HEADER */}
      <div className="mb-3">
        <h3 className="font-semibold text-gray-900 text-xs">
          Variant Performance
        </h3>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {data.map((v, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-100 bg-gray-50 p-2.5"
          >
            {/* COLOR HEADER */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black" />
                <span className="text-xs font-medium capitalize">
                  {v.color}
                </span>
              </div>

              <span className="text-[11px] text-gray-600 font-medium">
                {v.totalSold} sold
              </span>
            </div>

            {/* TABLE HEADER (FIXED GRID) */}
            <div className="grid grid-cols-3 text-[10px] text-gray-400 mb-1 px-1">
              <span className="text-left">Size</span>
              <span className="text-center">Units</span>
              <span className="text-right">Revenue</span>
            </div>

            {/* SIZES (FIXED GRID - SAME AS HEADER) */}
            <div className="space-y-1">
              {v.sizes.map((s, j) => (
                <div
                  key={j}
                  className="grid grid-cols-3 text-[11px] items-center px-1"
                >
                  <span className="text-left text-gray-600">{s.size}</span>

                  <span className="text-center text-gray-700 font-medium tabular-nums">
                    {s.totalSold}
                  </span>

                  <span className="text-right text-emerald-600 font-medium tabular-nums">
                    ${s.totalRevenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
