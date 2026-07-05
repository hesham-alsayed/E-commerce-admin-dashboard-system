"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

export default function UsersTableSkeleton({ rows = 8 }) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        {/* HEADER */}
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
              {/* USER */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </TableCell>

              {/* EMAIL */}
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>

              {/* ROLE */}
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>

              {/* STATUS */}
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>

              {/* VERIFIED */}
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>

              {/* DATE */}
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}