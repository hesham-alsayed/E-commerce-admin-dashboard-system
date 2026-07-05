// TopNav/SearchTrigger.jsx
import React from "react";
import { Search } from "lucide-react";

export default function SearchTrigger({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative w-80 border border-gray-200 rounded-xl cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-gray-500 transition-colors" />
      
      <input
        placeholder="Search anything..."
        readOnly
        className="pl-9 pr-12 rounded-xl focus:outline-none bg-gray-50 w-full text-sm py-2 cursor-pointer hover:bg-gray-100 transition-all group-hover:shadow-sm"
      />
      
      <span className="absolute right-4 top-2 text-xs text-gray-400 border px-1.5 py-0.5 rounded bg-white/60 group-hover:bg-white">
        ⌘K
      </span>
    </div>
  );
}