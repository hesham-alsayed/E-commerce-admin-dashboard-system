"use client";

import { CouponProgressBar } from "@/components/CouponProgressBar";
import { formatDateTime, getCouponStatus } from "@/lib/utils";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { RiCoupon2Fill } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";

export default function CouponTable({ coupons, onEdit, onDelete }) {
  const statusStyles = {
    Valid: "bg-emerald-100 text-emerald-700",
    Active: "bg-green-100 text-green-700",
    Disabled: "bg-gray-100 text-gray-500",
    "Limit Reached": "bg-amber-100 text-amber-700",
    Expired: "bg-red-100 text-red-700",
    Pending: "bg-blue-100 text-blue-700",
  };

  const data = coupons || [];
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full">
          {/* ================= HEADER ================= */}
          <thead className="bg-gray-50 text-sm font-semibold text-gray-600">
            <tr>
              <th className="pl-6 py-4 text-left">Code & Details</th>
              <th className="px-4 py-4 text-left">Discount</th>
              <th className="px-4 py-4 text-left w-95">Usage</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Validity</th>
              <th className="pr-6 py-4 text-left"></th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody>
            {data.map((c) => {
              const status = getCouponStatus(c);

              const used = c.usedCount || 0;
              const limit =
                c.usageLimit === 0 || !c.usageLimit ? Infinity : c.usageLimit;

              return (
                <tr
                  key={c._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* ================= CODE ================= */}
                  <td className="pl-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
                        <RiCoupon2Fill className="text-gray-600" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {c.code}
                          </span>

                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                            {c.type}
                          </span>
                        </div>

                        {c.minPurchase > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            Min: ${c.minPurchase}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* ================= DISCOUNT ================= */}
                  <td className="px-4 py-4">
                    <div className="font-semibold text-sm">
                      {c.discountType === "percentage"
                        ? `${c.discountValue}%`
                        : `$${c.discountValue}`}
                    </div>

                    <div className="text-xs text-gray-500 capitalize">
                      {c.discountType}
                    </div>
                  </td>

                  {/* ================= USAGE (BIG) ================= */}
                  <td className="px-4 py-4 w-[320px]">
                    <div className="space-y-2">
                      <CouponProgressBar used={used} limit={limit} />

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{used} used</span>
                        <span>{limit === Infinity ? "∞" : limit} limit</span>
                      </div>
                    </div>
                  </td>

                  {/* ================= STATUS ================= */}
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
                        statusStyles[status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* ================= VALIDITY ================= */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col text-sm">
                      <span className="text-gray-700">
                        {formatDateTime(c.startDate)}
                      </span>
                      <span className="text-gray-400">
                        {formatDateTime(c.endDate)}
                      </span>
                    </div>
                  </td>

                  {/* ================= ACTIONS ================= */}
                  <td className="pr-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreHorizontal size={18} />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-50  space-y-2 "
                      >
                        {c.partner && (
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/admin/marketing-partner/${c.partner}`,
                              )
                            }
                            className="flex pl-3 items-center gap-2 cursor-pointer"
                          >
                            <Pencil size={16} />
                            Partner Details
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => onEdit(c)}
                          className="flex items-center gap-2 pl-3  cursor-pointer"
                        >
                          <Pencil size={16} />
                          Update
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => onDelete?.(c)}
                          className="flex items-center pl-3 gap-2 text-red-600 cursor-pointer"
                        >
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
