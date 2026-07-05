import React from "react";

export default function PartnerStatsDetails({
  title,
  value,
  subtitle,
  color,
  icon: Icon,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border flex flex-col gap-3 relative overflow-hidden">

      {/* ICON BACKGROUND */}
      {Icon && (
        <div className="absolute -top-4 -right-4 opacity-10">
          <Icon size={90} />
        </div>
      )}

      {/* ICON + TITLE */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {Icon && (
          <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
            <Icon size={16} />
          </div>
        )}
        <span>{title}</span>
      </div>

      {/* VALUE */}
      <span className={`text-2xl font-semibold ${color || ""}`}>
        {value}
      </span>

      {/* SUBTITLE */}
      {subtitle && (
        <span className="text-xs text-gray-400">
          {subtitle}
        </span>
      )}
    </div>
  );
}