// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useCollectionFilter } from "./useCollectionFilter";
// import { Button } from "../ui/button";

// export default function CollectionFilter({
//   collections = [],
//   handleSelectCollection,
// }) {
//   const { selectedCollection, setCollection } = useCollectionFilter();

//   const selectedName =
//     collections.find((c) => c._id === selectedCollection)?.name ||
//     "Select Collection";

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
//           <DropdownMenuItem
//             onClick={() => setCollection("")}
//             className="focus:bg-gray-100"
//           >
//             All Collections
//           </DropdownMenuItem>

//           {collections.map((col) => (
//             <DropdownMenuItem
//               key={col._id}
//               onClick={() => {
//                 setCollection(col._id);
//                 handleSelectCollection(col._id);
//               }}
//               className={`
//                 cursor-pointer
//                 focus:bg-gray-100
//                 ${selectedCollection === col._id ? "bg-gray-100" : ""}
//               `}
//             >
//               {col.name}
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
import { useCollectionFilter } from "./useCollectionFilter";

export default function CollectionFilter({
  collections = [],
  handleSelectCollection,
}) {
  const { selectedCollection, setCollection } = useCollectionFilter();
  const [open, setOpen] = useState(false);

  const selectedName =
    collections.find((c) => c._id === selectedCollection)?.name ||
    "Select Collection";
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
    <div className="mt-4 w-full" ref={ref}>
      {/* Trigger */}
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        className="w-full justify-between border border-gray-200"
      >
        {selectedName}
      </Button>

      {/* DROPDOWN (push layout) */}
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
                  setCollection("");
                  setOpen(false);
                }}
                className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                All Collections
              </div>

              {collections.map((col) => (
                <div
                  key={col._id}
                  onClick={() => {
                    setCollection(col._id);
                    handleSelectCollection(col._id);
                    setOpen(false);
                  }}
                  className={`
                    p-2 py-1 text-sm cursor-pointer hover:bg-gray-100
                    ${selectedCollection === col._id ? "bg-gray-100" : ""}
                  `}
                >
                  {col.name}
                </div>
              ))}
            </div>
          </_motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
