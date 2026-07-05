"use client";

import React, { useState } from "react";
import ModalCategory from "./ModalCategory";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export default function CategoryOrganization({
  isOpen,
  setOpenCategory,
  selectedCategory,
  selectedCollection,
  handleCategoryChange,
  categories,
  error,
}) {
  const [touched, setTouched] = useState(false);

  const handleClick = () => {
    setTouched(true);
    if (!selectedCollection) return;
    setTouched(false);
    setOpenCategory(true);
  };

  return (
    <div className="mt-4">
      <p className="text-[14px] font-medium mb-2">Category:</p>

      {/* Category Trigger */}
      <button
        className="cursor-pointer w-full flex justify-between items-center border border-gray-200 px-3 py-2 rounded-sm hover:bg-gray-100 transition-colors"
        onClick={() => handleClick()}
      >
        <span>{selectedCategory?.name || "Assign to category"}</span>
        {isOpen ? (
          <MdOutlineKeyboardArrowUp size={25} />
        ) : (
          <MdOutlineKeyboardArrowDown size={25} />
        )}
      </button>
      {error && <p className="text-red-500 text-xs mt-1 px-1">{error}</p>}
      {touched && !selectedCollection && (
        <p className="text-red-600 bg-red-50 w-full px-3 mt-2 py-1 rounded-sm text-sm">
          Select collection first
        </p>
      )}

      <ModalCategory
        handleCategoryChange={handleCategoryChange}
        isOpen={isOpen}
        onClose={() => setOpenCategory(false)}
        categories={categories}
      />
    </div>
  );
}
