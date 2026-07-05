"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  Calendar,
  Eye,
  Lock,
  Shield,
  User,
} from "lucide-react";

/* ================= DEFAULT AVATAR ================= */
const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

/* ================= COLORS ================= */

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-200 text-gray-600",
};

export default function RoleTable({ onChangeRole, users = [] }) {
  return (
    <div>
      <div className="shadow-md rounded-xl  overflow-hidden">
        <Table>
          {/* ================= HEADER ================= */}
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role & Access</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          {/* ================= BODY ================= */}
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                const status = user.isActive ? "Active" : "Inactive";

                return (
                  <TableRow
                    key={user._id || user.id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* USER */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || DEFAULT_AVATAR}
                          onError={(e) => {
                            e.target.src = DEFAULT_AVATAR;
                          }}
                          className="w-9 h-9 rounded-full object-cover"
                          alt="avatar"
                        />

                        <span className="font-medium whitespace-nowrap">
                          {user.firstName} {user.lastName || ""}
                        </span>
                      </div>
                    </TableCell>

                    {/* EMAIL */}
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>

                    {/* ROLE */}
                    {/* ROLE */}
                    <TableCell>
                      {(() => {
                        const role = (user.role || "").toLowerCase();

                        const roleConfig = {
                          admin: {
                            label: "Admin",
                            className: "bg-purple-100 text-purple-700",
                            icon: <Shield className="w-3 h-3" />,
                          },
                          user: {
                            label: "User",
                            className: "bg-blue-100 text-blue-700",
                            icon: <User className="w-3 h-3" />,
                          },
                          customer: {
                            label: "Customer",
                            className: "bg-green-100 text-green-700",
                            icon: <User className="w-3 h-3" />,
                          },
                        };

                        const config = roleConfig[role] || {
                          label: role,
                          className: "bg-gray-100 text-gray-600",
                          icon: <User className="w-3 h-3" />,
                        };

                        return (
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium w-fit whitespace-nowrap ${config.className}`}
                          >
                            {config.icon}
                            {config.label}
                          </span>
                        );
                      })()}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[status]
                        }`}
                      >
                        {status}
                      </span>
                    </TableCell>

                    {/* CREATED */}
                    <TableCell className="text-gray-600 whitespace-nowrap">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB")
                        : "-"}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <Button
                        className={
                          "px-4 bg-white border border-gray-300 text-black gap-4 hover:cursor-pointer"
                        }
                        onClick={() => onChangeRole(user)}
                      >
                        Change Role <Lock />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
