import { ArrowLeft, Pencil, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductHeader({ product }) {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (value) => {
    if (!value) return;

    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="p-4 border rounded-xl bg-white flex justify-between items-center">

      {/* LEFT */}
      <div className="flex items-start gap-3">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-xl font-bold capitalize">
            {product.title}
          </h1>

          {/* INFO ROW */}
          <div className="flex flex-wrap gap-2 mt-2 items-center">

            {/* CATEGORY */}
            <div className="px-2 py-1 rounded-full bg-gray-100 border text-xs text-gray-600">
              {product.category?.name}
            </div>

            {/* FULL ID WITH COPY */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100 border text-xs text-gray-700">
              <span className="font-medium">ID:</span>

              <span className="font-mono">
                {product._id}
              </span>

              <button
                onClick={() => copyToClipboard(product._id)}
                className="hover:scale-110 transition cursor-pointer"
              >
                {copied ? (
                  <Check size={14} className="text-green-600" />
                ) : (
                  <Copy size={14} className="text-gray-500" />
                )}
              </button>
            </div>

            {/* BRAND (clean badge) */}
            <div className="px-2 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-700 font-medium">
              Brand: {product.brand || "N/A"}
            </div>

            {/* MATERIAL (clean badge) */}
            <div className="px-2 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-700 font-medium">
              Material: {product.material || "N/A"}
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 text-sm">

        {/* STATUS */}
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {product.status || "draft"}
        </span>

        {/* STOCK / PRICE */}
        <div className="hidden md:flex gap-3 text-gray-600">
          <span>Stock: {product.stock}</span>
          <span>Price: ${product.price}</span>
        </div>

        {/* EDIT */}
        <button
          onClick={() =>
            navigate(`/admin/commerce/products/update/${product._id}`)
          }
          className="flex items-center gap-1 px-3 py-1 rounded-md border hover:bg-gray-100 cursor-pointer transition"
        >
          <Pencil size={14} />
          Edit
        </button>
      </div>
    </div>
  );
}