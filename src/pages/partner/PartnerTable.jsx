"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showToast } from "@/lib/utils";
import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function PartnerTable({ partners, onEdit }) {
  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    showToast({ message: "Copied" });
  };

  const data = partners || [];

  return (
    <div className="bg-white border rounded-xl overflow-x-auto">
      <table className="min-w-250 w-full">
        {/* HEADER */}
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="p-4 text-left">Partner Details</th>
            <th className="p-4 text-left">Contact</th>
            <th className="p-4 text-left">CommissionRate</th>
            <th className="p-4 text-left">Joined</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p._id} className="border-t hover:bg-gray-50">
              {/* DETAILS */}
              <td className="p-4">
                <div className="font-semibold">{p.name}</div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{p._id}</span>

                  <button className="hover:cursor-pointer" onClick={() => copyId(p._id)}>
                    <Copy size={18} />
                  </button>
                </div>
              </td>

              {/* CONTACT */}
              <td className="p-4 text-sm text-gray-600">{p.email}</td>

              {/* COMMISSION */}
              <td className="p-4 font-medium">{p.commissionRate}%</td>

              {/* JOINED */}
              <td className="p-4 text-sm">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>

              {/* STATUS */}
              <td className="p-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    p.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {p.active ? "Active" : "Inactive"}
                </span>
              </td>

              {/* ACTION */}
              <td className="p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2 h-8 w-8">
                      <MoreHorizontal size={18} />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-40 space-y-2 p-2"
                  >
                    {/* VIEW */}

                    <Link to={`/admin/marketing-partner/${p._id}`}>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Eye size={16} />
                        View Details
                      </DropdownMenuItem>
                    </Link>

                    {/* EDIT */}
                    <DropdownMenuItem
                      onClick={() => onEdit(p)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Pencil size={16} />
                      Edit Partner
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
