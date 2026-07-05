"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, XCircle, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderActions({ order, onUpdate, onCancel }) {
  const hideCancel = ["delivered", "cancelled"].includes(order.orderStatus);

  return (
    <DropdownMenu>
      {/* TRIGGER */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
            shrink-0 w-9 h-9 p-0
            border-gray-200
            focus-visible:ring-0
            focus-visible:ring-offset-0
            focus:outline-none
            focus:border-gray-200
          "
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* MENU */}
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={6}
        collisionPadding={12}
        className="w-44 z-50"
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* VIEW */}
        <Link to={`/admin/commerce/orders/order-details/${order._id}`}>
          <DropdownMenuItem>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </DropdownMenuItem>
        </Link>

        {/* UPDATE */}
        <DropdownMenuItem onClick={() => onUpdate(order)}>
          <Pencil className="w-4 h-4 mr-2" />
          Update
        </DropdownMenuItem>

        {/* CANCEL (HIDDEN WHEN DELIVERED OR CANCELLED) */}
        {!hideCancel && (
          <DropdownMenuItem
            onClick={() => onCancel(order._id)}
            className="text-yellow-600"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
