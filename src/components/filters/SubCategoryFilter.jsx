// "use client";

// import React, { useMemo } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Button } from "@/components/ui/button";
// import { motion as _motion, AnimatePresence } from "framer-motion";
// import { useSubcategoryFilter } from "./useSubCategoryFilter";

// export default function SubCategoryFilter({ subcategories = [] }) {
//   const { selectedSubCategories, toggleSubCategory } = useSubcategoryFilter();

//   const selectedNames = useMemo(() => {
//     return (
//       subcategories
//         ?.filter((s) => selectedSubCategories?.includes(s._id))
//         .map((s) => s.name)
//         .join(", ") || "Select Sub Categories"
//     );
//   }, [subcategories, selectedSubCategories]);

//   return (
//     <div className="mt-4 w-full">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="
//               w-full justify-between
//               border border-gray-200
//               px-3 py-2
//               rounded-sm
//               hover:bg-gray-100
//               shadow-none
//               focus:outline-none focus:ring-0
//             "
//           >
//             {selectedNames}
//           </Button>
//         </DropdownMenuTrigger>

//         <AnimatePresence>
//           <DropdownMenuContent
//             align="start"
//             className="min-w-[var(--radix-dropdown-menu-trigger-width)] w-full max-h-80 h-full overflow-y-auto bg-white rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none"
//           >
//             <_motion.div
//               initial={{ opacity: 0, y: -8, scale: 0.98 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -8, scale: 0.98 }}
//               transition={{ duration: 0.2 }}
//               className="max-h-60 overflow-auto"
//             >
//               {subcategories.length > 0 ? (
//                 subcategories.map((sub) => (
//                   <label
//                     key={sub._id}
//                     className="flex items-center text-sm px-2 py-1 gap-6 cursor-pointer hover:bg-gray-100"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedSubCategories.includes(sub._id)}
//                       onChange={() => toggleSubCategory(sub._id)}
//                       className="w-4 h-4 accent-black cursor-pointer"
//                     />
//                     <span>{sub.name}</span>
//                   </label>
//                 ))
//               ) : (
//                 <p className="px-2 py-1 text-gray-400">
//                   No sub categories available
//                 </p>
//               )}
//             </_motion.div>
//           </DropdownMenuContent>
//         </AnimatePresence>
//       </DropdownMenu>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSubcategoryFilter } from "./useSubCategoryFilter";

export default function SubCategoryFilter({ subcategories = [] }) {
  const { selectedSubCategories, toggleSubCategory } = useSubcategoryFilter();

  const [open, setOpen] = useState(false);

  const selectedNames =
    subcategories
      .filter((s) => selectedSubCategories.includes(s._id))
      .map((s) => s.name)
      .join(", ") || "Select Sub Categories";

  return (
    <div className="w-full mt-4">
      <Button
        variant="ghost"
        disabled={subcategories.length ===0}
        className="w-full justify-between border border-gray-200"
        onClick={() => setOpen(!open)}
      >
        {selectedNames}
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
            <div className="p-2 space-y-1 max-h-60 overflow-auto">
              {subcategories.map((sub) => (
                <label
                  key={sub._id}
                  className="flex text-sm capitalize items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubCategories.includes(sub._id)}
                    onChange={() => toggleSubCategory(sub._id)}
                    className="accent-black"
                  />
                  {sub.name}
                </label>
              ))}
            </div>
          </_motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
