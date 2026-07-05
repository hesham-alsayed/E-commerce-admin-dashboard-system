"use client";
import { IoCloseOutline } from "react-icons/io5";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";

export default function FilterSidebar({ isOpen, onClose, children }) {
  // Lock scroll when sidebar is open
  const { overlayRef, handleOverlayClick } = useModalBehavior(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <_motion.div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <_motion.div
            className="fixed top-0 left-0 h-screen w-100 bg-white z-50 shadow-xl flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex justify-between p-4 border-b">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button onClick={onClose}>
                <IoCloseOutline size={22} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="px-4 py-2 overflow-y-auto flex-1">{children}</div>
          </_motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
