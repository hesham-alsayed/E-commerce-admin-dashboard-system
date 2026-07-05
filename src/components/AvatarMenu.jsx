import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "./hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function AvatarMenu() {
  const { fetchLogout, actionLoading: logoutLoading, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetchLogout();
      navigate("/auth?mode=login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-xs uppercase">
              {user?.firstName?.slice(0, 2) || "UN"}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 p-1 border border-gray-200 shadow-lg">
        <Link to="/admin/profile">
          <DropdownMenuItem className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <FiUser className="w-4 h-4" />
            Profile
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={logoutLoading}
          className="flex items-center gap-3 p-2 hover:bg-red-50 rounded text-red-600 border-t mt-1 cursor-pointer"
        >
          <FiLogOut className="w-4 h-4" />
          {logoutLoading ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
