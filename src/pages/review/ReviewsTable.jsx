"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Star } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function ReviewsTable({ reviews = [], loading }) {
  if (!reviews.length && !loading) {
    return (
      <div className="text-center text-gray-400 py-10">No reviews found</div>
    );
  }

  return (
    <div className="rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r._id}>
              {/* USER */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={r.user?.avatar}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <p className="font-medium">
                      {r.user?.firstName} {r.user?.lastName}
                    </p>
                    <p className="text-gray-500">{r.user?.email}</p>
                  </div>
                </div>
              </TableCell>

              {/* PRODUCT */}
              <TableCell className="text-sm font-medium">
                {r.product?.title}
              </TableCell>

              {/* RATING */}
              <TableCell>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span>{r.rating}</span>
                </div>
              </TableCell>

              {/* COMMENT */}
              <TableCell className="text-gray-600 text-sm">
                {r.comment || "-"}
              </TableCell>

              {/* DATE */}
              <TableCell className="text-xs text-gray-500">
                {formatDateTime(r.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
