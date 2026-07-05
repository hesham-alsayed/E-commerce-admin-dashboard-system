"use client";

import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion as _motion } from "framer-motion";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";

export default function ProductPickerModal({
  open,
  onClose,
  products = [],
  selected = [],
  onSelect,
}) {
  const [search, setSearch] = useState("");
  const { overlayRef, handleOverlayClick } = useModalBehavior(open, onClose);
  const filteredProducts = useMemo(() => {
    return products?.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const toggleProduct = (product) => {
    const exists = selected.find((p) => p._id === product._id);

    const updated = exists
      ? selected.filter((p) => p._id !== product._id)
      : [...selected, product];

    onSelect(updated);
  };

  return (
    <AnimatePresence>
      {open && (
        <_motion.div
          ref={overlayRef}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          {/* MODAL BOX */}
          <_motion.div
            className="bg-white w-[800px] max-h-[80vh] rounded-lg shadow-lg flex flex-col"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-3 border-b">
              <h2 className="font-semibold">Select Products</h2>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* SEARCH */}
            <div className="p-3 border-b">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full border px-3 py-2 rounded outline-none"
              />
            </div>

            {/* LIST */}
            <div className="p-3 overflow-y-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredProducts.map((product) => {
                const isSelected = selected.some((p) => p._id === product._id);

                return (
                  <div
                    key={product._id}
                    onClick={() => toggleProduct(product)}
                    className={`border-2 p-2 rounded cursor-pointer hover:bg-gray-100 transition ${
                      isSelected ? "border-green-600 bg-gray-100" : ""
                    }`}
                  >
                    <img
                      src={product.variants?.[0]?.images?.[0]}
                      className="w-full h-60  object-contain rounded"
                    />

                    <p className="text-sm capitalize  mt-2">
                      title : {product.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </_motion.div>
        </_motion.div>
      )}
    </AnimatePresence>
  );
}
