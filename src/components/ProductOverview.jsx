import { getFinalPrice, isDiscountValid, resolveDiscount } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function ProductOverview({ product }) {
  const [activeImage, setActiveImage] = useState(
    product?.variants?.[0]?.images?.[0],
  );

  // DISCOUNT LOGIC
  const discount = useMemo(() => resolveDiscount(product), [product]);

  const finalPrice = useMemo(
    () => getFinalPrice(product.price, discount),
    [product.price, discount],
  );

  const discountPercent = useMemo(() => {
    if (!isDiscountValid(discount)) return 0;

    if (discount.type === "percentage") {
      return discount.value;
    }

    if (discount.type === "fixed") {
      return Math.round((discount.value / product.price) * 100);
    }

    return 0;
  }, [discount, product.price]);

  return (
    <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* IMAGE SECTION */}
      <div>
        {/* MAIN IMAGE */}
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          {/* DISCOUNT BADGE */}
          {discountPercent > 0 && (
            <div className="absolute top-0 right-0 bg-red-700 text-white text-xs px-3 py-1 rounded-bl-2xl shadow-md">
              -{discountPercent}%
            </div>
          )}

          <img
            src={activeImage}
            className="w-full  object-cover object-center"
          />
        </div>

        {/* VARIANT THUMBNAILS */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {product.variants?.map((v, i) => (
            <img
              key={i}
              src={v.images?.[0]}
              onClick={() => setActiveImage(v.images?.[0])}
              className={`w-14 h-14 rounded border cursor-pointer object-cover flex-shrink-0 
              hover:opacity-80 transition`}
            />
          ))}
        </div>
      </div>

      {/* INFO SECTION */}
      <div>
        <h2 className="text-xl capitalize font-bold">{product.title}</h2>

        <p className="text-gray-500 capitalize mt-2">{product.description}</p>

        {/* PRICE */}
        <div className="mt-3">
          <p className="text-sm text-gray-500">Current Price:</p>

          <div className="flex gap-2 items-center">
            <span className="text-2xl font-bold">${finalPrice}</span>

            {finalPrice < product.price && (
              <span className="line-through text-gray-400">
                ${product.price}
              </span>
            )}
          </div>
        </div>

        {/* VARIANTS DETAILS */}
        <div className="mt-5 space-y-3">
          <h4 className="text-sm font-semibold">Available Variants</h4>

          {product.variants?.map((v, i) => (
            <div key={i} className="border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: v.colorCode }}
                />
                <span className="text-sm">{v.color}</span>
              </div>

              <div className="flex gap-2 mt-2 flex-wrap">
                {v.sizes.map((s, j) => (
                  <span key={j} className="text-xs border px-2 py-1 rounded">
                    {s.size} ({s.stock})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
