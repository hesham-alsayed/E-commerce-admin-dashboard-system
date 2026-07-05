// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Button } from "@/components/ui/button";
// import { useCategoryFilter } from "./useCategoryFilter";

// export default function CategoryFilter({
//   categories = [],
//   handleSelectCategory,
// }) {
//   const { selectedCategory, setCategory } = useCategoryFilter();

//   const selectedName =
//     categories.find((c) => c._id === selectedCategory)?.name ||
//     "Select Category";

//   return (
//     <div className="mt-4 w-full">
//       <DropdownMenu>
//         <DropdownMenuTrigger
//           className="w-full  cursor-pointer flex items-center border border-gray-200 justify-between gap-1 px-3 py-2 rounded-sm hover:bg-gray-100 hover:text-black transition-colors"
//           asChild
//         >
//           <Button variant="ghost">{selectedName}</Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           align="start"
//           className="min-w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none"
//         >
//           {/* Clear */}
//           <DropdownMenuItem onClick={() => setCategory("")}>
//             All Categories
//           </DropdownMenuItem>

//           {categories.map((cat) => (
//             <DropdownMenuItem
//               key={cat._id}
//               onClick={() => {
//                 setCategory(cat._id);
//                 handleSelectCategory(cat._id);
//               }}
//               className={`
//                 cursor-pointer
//                 focus:bg-gray-100
//                 ${selectedCategory === cat._id ? "bg-gray-100" : ""}
//               `}
//             >
//               {cat.name}
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCategoryFilter } from "./useCategoryFilter";

export default function CategoryFilter({
  categories = [],
  handleSelectCategory,
  selectedCollection,
}) {
  const { selectedCategory, setCategory } = useCategoryFilter();
  const [open, setOpen] = useState(false);

  const selectedName =
    categories.find((c) => c._id === selectedCategory)?.name ||
    "Select Category";

  const ref = useRef();
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
    <div className="w-full mt-4" ref={ref}>
      <Button
        variant="ghost"
        className="w-full justify-between border border-gray-200"
        onClick={() => setOpen(!open)} 
        disabled={!selectedCollection}
      >
        {selectedName}
      </Button>

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
              <div
                onClick={() => {
                  setOpen(false);
                }}
                className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                All Categories
              </div>

              {categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => {
                    setCategory(cat._id);
                    handleSelectCategory(cat._id);
                    setOpen(false);
                  }}
                  className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    selectedCategory === cat._id ? "bg-gray-100" : ""
                  }`}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </_motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
