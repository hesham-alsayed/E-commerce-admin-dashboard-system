import React from "react";

export default function ButtonsFilters({ handleApply, handleClear, loading }) {
  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={handleApply}
        disabled={loading}
        className="flex-1 bg-black cursor-pointer text-white text-xs py-2 rounded-md hover:bg-gray-800 transition flex justify-center items-center gap-2"
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        Apply
      </button>

      <button
        onClick={handleClear}
        disabled={loading} 
        className="flex-1 border border-gray-300 text-xs py-2 rounded-md hover:bg-gray-100 transition"
      >
        Clear
      </button>
    </div>
  );
}
