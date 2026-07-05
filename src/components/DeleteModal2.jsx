import React, { useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";

export const DeleteModal2 = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  type = "item",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const confirmText = title;

  const handleConfirm = async () => {
    if (inputValue === confirmText) {
      setIsConfirming(true);
      await onConfirm();
      setIsConfirming(false);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue === confirmText) {
      handleConfirm();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  const modalVariants = {
    hidden: { scale: 0.3, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
    exit: {
      scale: 0.3,
      opacity: 0,
      rotate: 10,
      transition: { type: "spring", stiffness: 500, damping: 40 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <_motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal wrapper */}
          <_motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <_motion.div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 overflow-hidden">

              {/* HEADER */}
              <div className="relative p-6 bg-red-100 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="flex items-center gap-3">
                  {/* Danger Icon */}
                  <div className="w-13 h-13 p-4 flex items-center justify-center bg-red-200 dark:bg-red-800 rounded-full">
                    <svg
                      className="w-10 h-10 text-red-600 dark:text-red-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01M10.29 3.86l-8.3 14.38A2 2 0 003.73 21h16.54a2 2 0 001.74-2.76L13.71 3.86a2 2 0 00-3.42 0z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Delete {type}?
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      This action cannot be undone. It will permanently delete{" "}
                      <span className="font-mono bg-white/70 dark:bg-black/30 px-1.5 py-0.5 rounded">
                        {title}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* INPUT */}
              <div className="p-6">
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Type{" "}
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                    {title}
                  </span>{" "}
                  to confirm
                </label>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Type "${title}"`}
                  disabled={isConfirming}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono bg-gray-50 dark:bg-gray-800/50
                  focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
                />
              </div>

              {/* FOOTER */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  disabled={isConfirming}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirm}
                  disabled={inputValue !== confirmText || isConfirming}
                  className={`px-6 py-2 text-sm font-semibold rounded-md transition ${
                    inputValue === confirmText && !isConfirming
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isConfirming ? "Deleting..." : `Delete ${type}`}
                </button>
              </div>
            </_motion.div>
          </_motion.div>
        </>
      )}
    </AnimatePresence>
  );
};