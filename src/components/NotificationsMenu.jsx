"use client";

import { Bell } from "lucide-react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNotifications } from "./hooks/useNotifications";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotificationsMenu() {
  const { notifications, markManyAsRead, unreadCount, fetchNotifications } =
    useNotifications();
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  const lastFive = [...notifications]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const unreadIds = lastFive.filter((n) => !n.read).map((n) => n._id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative p-2 hover:bg-gray-100 rounded-sm cursor-pointer">
          <Bell className="w-4 h-4 text-gray-600" />

          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-96 mr-10 p-0 bg-white border shadow-lg">
        {/* HEADER */}
        <div className="flex items-center gap-2 p-3 border-b">
          <p className="font-semibold">Notifications</p>

          {unreadIds.length > 0 && (
            <button
              onClick={() => markManyAsRead(unreadIds)}
              className="ml-auto text-sm flex items-center gap-1 text-gray-600 hover:text-black"
            >
              <IoCheckmarkDoneSharp />
              Mark read
            </button>
          )}
        </div>

        {/* LIST */}
        <div className="max-h-80 overflow-y-auto">
          {lastFive.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 text-center">
              No notifications
            </p>
          ) : (
            lastFive.map((item) => (
              <div
                key={item._id}
                className={`flex gap-3 p-3 border-b hover:bg-gray-50 ${
                  item.read ? "bg-white" : "bg-gray-50"
                }`}
              >
                {/* ICON */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    item.read
                      ? "bg-gray-100 text-gray-500"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  <Bell size={14} />
                </div>

                {/* CONTENT */}
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.message}</p>
                </div>

                {/* unread dot */}
                {!item.read && (
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                )}
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-3 border-t text-center">
          <Link
            to="/admin/system/notifications"
            className="text-sm text-gray-600 hover:text-green-600 hover:underline"
          >
            View all notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
