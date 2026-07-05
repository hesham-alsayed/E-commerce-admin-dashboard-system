import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import ModalSubcategory from "./ModalSubcategory";

export default function SubcategoryOrganization({
  isOpen,
  setOpenSubcategory,
  selectedSubcategory,
  selectedCategory,
  handleSubcategoryChange,
  subcategories,
  error,
}) {
  const [touched, setTouched] = useState(false);

  const handleClick = () => {
    setTouched(true);
    if (!selectedCategory) return;
    setTouched(false);
    setOpenSubcategory(true);
  };
  return (
    <div className="mt-4">
      <p className="text-[14px] font-medium mb-2">Subcategory:</p>

      {/* Category Trigger */}
      <div
        className="cursor-pointer flex justify-between capitalize items-center border border-gray-200 px-3 py-2 rounded-sm hover:bg-gray-100 transition-colors"
        onClick={() => handleClick()}
      >
        <span>{selectedSubcategory?.name || "Assign to subcategory"}</span>
        {isOpen ? (
          <MdOutlineKeyboardArrowUp size={25} />
        ) : (
          <MdOutlineKeyboardArrowDown size={25} />
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 px-1">{error}</p>}

      {touched && !selectedCategory && (
        <p className="text-red-600 bg-red-50 w-full px-3 mt-2 py-1 rounded-sm text-sm">
          Select category first
        </p>
      )}
      <ModalSubcategory
        handleSubcategoryChange={handleSubcategoryChange}
        isOpen={isOpen}
        onClose={() => setOpenSubcategory(false)}
        subcategories={subcategories}
      />
    </div>
  );
}
