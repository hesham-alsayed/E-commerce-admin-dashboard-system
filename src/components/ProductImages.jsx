import { useState } from "react";

export default function ProductImages({ product }) {
  const [selected, setSelected] = useState(
    product?.variants?.[0],
  );

  return (
    <div className="p-4 rounded-xl border bg-white">
      <h3 className="font-semibold mb-3">
        Product Images
      </h3>

      {/* MAIN IMAGE */}
      <div className="h-60 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
        {selected?.images?.[0] ? (
          <img
            src={selected.images[0]}
            className="h-full object-cover rounded-lg"
          />
        ) : (
          "No Image"
        )}
      </div>

      {/* VARIANTS PREVIEW */}
      <div className="flex gap-2">
        {product.variants.map((v, i) => (
          <button
            key={i}
            onClick={() => setSelected(v)}
            className="w-6 h-6 rounded-full border"
            style={{
              background: v.colorCode,
            }}
          />
        ))}
      </div>
    </div>
  );
}