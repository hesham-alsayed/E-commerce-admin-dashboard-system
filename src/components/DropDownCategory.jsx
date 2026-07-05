"use client";

import { AnimatePresence, motion as _motion } from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export default function DropDownCategory({
  open,
  setOpen,
  selectedCategory,
  handleCategoryChange,
  categories = [],
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  const handleSelect = useCallback(
    (item) => {
      handleCategoryChange(item);
      setOpen(false);
    },
    [handleCategoryChange, setOpen],
  );


  return (
    <div className="mt-2 relative" ref={containerRef}>
      <p className="text-[14px] font-medium mb-2">Category :</p>

      <div
        className="cursor-pointer flex justify-between items-center border px-3 py-2 rounded-sm hover:bg-gray-100"
        onClick={() => setOpen((p) => !p)}
      >
        <span>{selectedCategory?.name || "Select Category"}</span>

        {open ? (
          <MdOutlineKeyboardArrowUp size={25} />
        ) : (
          <MdOutlineKeyboardArrowDown size={25} />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <_motion.div className="absolute z-50 w-full mt-1 bg-white border rounded-sm shadow">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(cat)}
              >
                {cat.name}
              </div>
            ))}
          </_motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
