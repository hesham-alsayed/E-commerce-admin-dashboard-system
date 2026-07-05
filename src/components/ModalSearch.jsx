import { useState } from "react";
import { Search } from "lucide-react";
import { IoCloseOutline } from "react-icons/io5";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";
import { adminSearchPages } from "./AdminSearchPage";

export default function ModalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { overlayRef, handleOverlayClick } = useModalBehavior(isOpen, onClose);

  const filteredPages = adminSearchPages.filter((page) =>
    page.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <_motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <_motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center gap-3 px-4 py-4 border-b bg-gray-50">
              <Search className="w-5 h-5 text-gray-400" />

              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, settings, orders..."
                className="flex-1 bg-transparent outline-none text-sm"
              />

              <button onClick={onClose} className="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-full ">
                <IoCloseOutline className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* RESULTS */}
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredPages.length > 0 ? (
                filteredPages.map((page) => {
                  const Icon = page.icon;

                  return (
                    <div
                      key={page.path}
                      onClick={() => handleNavigate(page.path)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-gray-100 transition group"
                    >
                      {/* ICON */}
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-white group-hover:shadow">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>

                      {/* TEXT */}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {page.name}
                        </span>

                        <span className="text-xs text-gray-500 line-clamp-1">
                          {page.desc}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 text-gray-400 text-sm">
                  No pages found
                </div>
              )}
            </div>
          </_motion.div>
        </_motion.div>
      )}
    </AnimatePresence>
  );
}
