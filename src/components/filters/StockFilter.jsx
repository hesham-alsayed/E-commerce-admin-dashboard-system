"use client";

import { useEffect, useRef, useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStockFilter } from "./useStockFilter";

export default function StockFilter() {
  const { stock, setStock } = useStockFilter();
  const [open, setOpen] = useState(false);

  const ref = useRef();

  const options = [
    { value: "all", label: "All Stock" },
    { value: "in", label: "In Stock" },
    { value: "out", label: "Out of Stock" },
  ];

  const selectedName =
    options.find((o) => o.value === stock)?.label || "All Stock";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-4 w-full" ref={ref}>
      {/* Trigger */}
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        className="w-full justify-between border border-gray-200"
      >
        {selectedName}
      </Button>

      {/* DROPDOWN (push layout like Collection) */}
      <AnimatePresence initial={false}>
        {open && (
          <_motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border border-gray-200 mt-2 rounded-sm"
          >
            <div className="p-2 space-y-1">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setStock(opt.value);
                    setOpen(false);
                  }}
                  className={`
                    p-2 text-sm cursor-pointer hover:bg-gray-100
                    ${stock === opt.value ? "bg-gray-100" : ""}
                  `}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </_motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
