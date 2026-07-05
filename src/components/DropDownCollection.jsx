"use client";

import React, { useCallback, useEffect } from "react";
import { motion as _motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SlArrowDown } from "react-icons/sl";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { getAllCategories } from "./ِApi/categoryApi";

export default function DropDownCollection({
  selectedCollection,
  handleCollectionChange,
  collections = [],
  setCategories,
  error,
}) {
  const handleSelect = useCallback(
    (item) => {
      handleCollectionChange(item);
    },
    [handleCollectionChange],
  );

  const filterCategoryByCollectionSelected = async () => {
    try {
      const data = await getAllCategories({
        collectionId: selectedCollection?._id,
      });
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedCollection) filterCategoryByCollectionSelected();
  }, [selectedCollection]);

  return (
    <div className="mt-2 ">
      <p className="text-[14px] font-medium mb-2">Collection :</p>

      <DropdownMenu className={"w-full"}>
        {/* Trigger */}
        <DropdownMenuTrigger
          className="w-full  cursor-pointer flex items-center border border-gray-200 justify-between gap-1 px-3 py-2 rounded-sm hover:bg-gray-100 hover:text-black transition-colors"
          asChild
        >
          <button disabled={!collections?.length}>
            <span>{selectedCollection?.name || "Assign Collection"}</span>
            <MdOutlineKeyboardArrowDown size={25} />
          </button>
        </DropdownMenuTrigger>
        {error && <p className="text-red-500 text-xs mt-1 px-1">{error}</p>}

        {/* Animated Content */}
        <DropdownMenuContent
          asChild
          align="start"
          className="min-w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none"
        >
          <_motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full bg-white rounded-sm p-1 border border-gray-200 shadow"
          >
            {collections.map((collection) => (
              <DropdownMenuItem
                key={collection._id}
                onClick={() => handleSelect(collection)}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              >
                {collection.name}
              </DropdownMenuItem>
            ))}
          </_motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
