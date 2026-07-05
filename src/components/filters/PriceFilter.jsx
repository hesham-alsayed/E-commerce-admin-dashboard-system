"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePriceFilter } from "./usePriceFilter";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

export default function FilterPrice({ maxRange = 7000, setFilters }) {
  const { minPrice, maxPrice, handlePrice } = usePriceFilter(700, maxRange);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Slider change
  const handleSliderChange = (event, newValue) => {
    const [newMin, newMax] = newValue;

    handlePrice(newMin, newMax); // URL

    setFilters?.((prev) => ({
      ...prev,
      minPrice: newMin,
      maxPrice: newMax,
      page: 1,
    }));
  };

  const handleMinChange = (value) => {
    const num = Number(value);

    handlePrice(num, maxPrice);

    setFilters?.((prev) => ({
      ...prev,
      minPrice: num,
      maxPrice,
      page: 1,
    }));
  };

  
  const handleMaxChange = (value) => {
    const numValue = Number(value);
    handlePrice(minPrice, Math.max(numValue, minPrice));
  };

  return (
    <div className="mt-4 relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        className="w-full justify-between border border-gray-200"
        onClick={() => setOpen(!open)}
      >
        Price
      </Button>

      {/* ✅ نفس أنيميشن SubCategoryFilter بالضبط */}
      <AnimatePresence initial={false}>
        {open && (
          <_motion.div
            key="dropdown"
            initial={{
              opacity: 0,
              height: 0,
              scale: 0.95,
              y: -8,
              originY: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              scale: 0.95,
              y: -8,
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
              height: {
                duration: 0.25,
                ease: "easeInOut",
              },
            }}
            className=" mt-2"
          >
            <div className="">
              <Box sx={{ px: 1 }}>
                <Slider
                  value={[minPrice, maxPrice]}
                  min={0}
                  max={maxRange}
                  onChange={handleSliderChange}
                  valueLabelDisplay="off"
                  getAriaLabel={() => "Price range"}
                  sx={{
                    color: "#000",
                    height: 8,
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#fff",
                      border: "1px solid #e7e7e7",
                      width: 20,
                      height: 20,
                      "&:hover": {
                        boxShadow: "0 0 0 8px rgba(0,0,0,0.08)",
                      },
                    },
                    "& .MuiSlider-track": { backgroundColor: "#000" },
                    "& .MuiSlider-rail": { backgroundColor: "#ccc" },
                  }}
                />
              </Box>
              <div className="flex items-center gap-4 px-2 py-1 ">
                {/* Min */}
                <div className="flex-1">
                  <label className="text-[12px] font-medium text-gray-500 mb-1 block">
                    Min price
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-gray-400 focus-within:border-gray-400">
                    <span className="text-gray-600 mr-1">ج.م</span>
                    <div className="w-px h-8 bg-gray-300 mx-2"></div>

                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => handleMinChange(e.target.value)}
                      className="w-full text-right text-[12px] font-medium bg-transparent  outline-none focus:outline-none appearance-none"
                    />
                  </div>
                </div>

                <span className="text-gray-400 font-bold text-sm">—</span>

                {/* Max */}
                <div className="flex-1">
                  <label className="text-[12px] font-medium text-gray-500 mb-1 block">
                    Max price
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-gray-400 focus-within:border-gray-400">
                    <span className="text-gray-600 mr-1">ج.م</span>
                    <div className="w-px h-8 bg-gray-300 mx-2"></div>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => handleMaxChange(e.target.value)}
                      className="w-full text-right text-[12px] font-medium bg-transparent outline-none focus:outline-none appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </_motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
