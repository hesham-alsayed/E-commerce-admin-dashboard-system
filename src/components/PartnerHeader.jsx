import React from "react";
import { Edit, Loader2 } from "lucide-react";

export default function PartnerHeader({
  onEdit,
  deactivate,
  updateLoading,
  active,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      
      {/* LEFT */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          Partner Details
        </h1>
        <p className="text-gray-500 text-xs md:text-sm">
          View partner metrics and manage their assigned coupons.
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
        
        {/* EDIT */}
        <button
          onClick={onEdit}
          className="w-full hover:cursor-pointer sm:w-auto px-4 py-2 rounded-xl text-sm flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition"
        >
          <Edit size={16} />
          Edit Partner
        </button>

        {/* ACTIVATE / DEACTIVATE */}
        <button
          onClick={deactivate}
          disabled={updateLoading}
          className={`w-full sm:w-auto px-4 py-2 rounded-xl hover:opacity-70 hover:cursor-pointer text-sm flex items-center justify-center gap-2 text-white bg-black hover:bg-gray-900 transition
          ${updateLoading ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {updateLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : active ? (
            "Deactivate Partner"
          ) : (
            "Activate Partner"
          )}
        </button>
      </div>
    </div>
  );
}