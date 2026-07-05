"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { IoCloseOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { motion as _motion, AnimatePresence } from "framer-motion";
import ScrollToTop from "./ScrollToTop";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";

export default function ModalCategory({
  isOpen,
  onClose,
  handleCategoryChange,
  categories = [],
}) {
  const [query, setQuery] = useState("");
  const { overlayRef, handleOverlayClick } = useModalBehavior(isOpen, onClose);

  const filteredCategories = categories?.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (cat) => {
    handleCategoryChange(cat);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <_motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-9999 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-4"
        >
          <_motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-xl shadow-2xl max-h-[90vh] overflow-hidden z-10000]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 pl-4 pr-3 py-3 border-b border-gray-200 bg-white">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search category..."
                className="flex-1 outline-none text-sm"
              />
              <button
                onClick={onClose}
                className="hover:bg-gray-200 rounded-xl p-2"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Results */}
            <div className="p-3 max-h-[70vh] overflow-y-auto space-y-2 custom-scroll">
              {filteredCategories.length ? (
                filteredCategories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => handleSelect(cat)}
                    className="flex items-center gap-2 px-3 py-2 capitalize rounded-sm cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    <BiCategory className="w-4 h-4 text-gray-500" /> {cat.name}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 px-3 py-2">
                  No results found
                </div>
              )}
            </div>
          </_motion.div>
        </_motion.div>
      )}
    </AnimatePresence>
  );
}
