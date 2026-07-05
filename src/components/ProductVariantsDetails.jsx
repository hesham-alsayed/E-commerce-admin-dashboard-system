export default function ProductVariantsDetails({
  variants,
}) {
  return (
    <div className="p-4 rounded-xl border bg-white">
      <h3 className="font-semibold mb-4">
        Variants
      </h3>

      <div className="space-y-4">
        {variants.map((v, i) => (
          <div
            key={i}
            className="border rounded-lg p-3"
          >
            {/* COLOR */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: v.colorCode,
                }}
              />
              <span className="font-medium capitalize">
                {v.color}
              </span>
            </div>

            {/* SIZES */}
            <div className="flex flex-wrap gap-2">
              {v.sizes.map((s, j) => (
                <span
                  key={j}
                  className="text-xs px-2 py-1 border rounded"
                >
                  {s.size} ({s.stock})
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}