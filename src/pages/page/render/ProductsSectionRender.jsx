import { getFinalPrice, resolveDiscount, isDiscountValid } from "@/lib/utils";

export default function ProductsSectionRender({ data }) {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {data?.title && (
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {data.title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {data?.products?.map((product) => {
            // 🔥 resolve best valid discount only
            const discount = resolveDiscount(product);

            // ❌ حماية إضافية (important fix)
            const validDiscount = isDiscountValid(discount) ? discount : null;

            const finalPrice = getFinalPrice(product.price, validDiscount);

            const hasDiscount = Boolean(validDiscount);

            return (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition"
              >
                {/* image */}
                <div className="h-60 bg-gray-100 relative">
                  {/* 🔥 discount badge */}
                  {hasDiscount && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {validDiscount.value}
                      {validDiscount.type === "percentage" ? "%" : "$"} OFF
                    </div>
                  )}

                  <img
                    src={
                      product?.variants?.[0]?.images?.[0] || "/placeholder.png"
                    }
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* info */}
                <div className="p-3 space-y-1">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-black">
                      ${finalPrice}
                    </p>

                    {hasDiscount && (
                      <p className="text-xs text-gray-400 line-through">
                        ${product.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
