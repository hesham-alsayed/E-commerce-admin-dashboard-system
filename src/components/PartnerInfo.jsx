import React from "react";

export default function PartnerInfo({ name, email, active, joinedAt }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 mb-6 border">
      <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
        AC
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">{name}</h2>
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              active
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="flex gap-6 text-sm text-gray-500 mt-1">
          <span>{email}</span>
          <span>{formatDate(joinedAt)}</span>
        </div>
      </div>
    </div>
  );
}
