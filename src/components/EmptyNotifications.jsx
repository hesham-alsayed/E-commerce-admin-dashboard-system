"use client";

import { FiBell } from "react-icons/fi";

export default function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FiBell size={40} className="text-gray-400 mb-3" />

      <h3 className="text-lg font-semibold">No Notifications</h3>

      <p className="text-gray-500 text-sm mt-1">
        You're all caught up 🎉
      </p>
    </div>
  );
}