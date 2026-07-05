"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const getStatusStyle = (status) => {
  return status
    ? "bg-green-500/10 text-green-700 border-green-200"
    : "bg-red-500/10 text-red-700 border-red-200";
};

export default function CustomersTable({ data = [] }) {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden">
      <Table>
        {/* HEADER */}
        <TableHeader className={'bg-gray-100'}>
          <TableRow className="border-b">
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Spend</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Last Order</TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {data?.map((c) => (
            <TableRow key={c.userId}>
              {/* 👤 AVATAR + NAME */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatar || "/placeholder-avatar.png"}
                    alt={c.firstName}
                    className="w-9 h-9 rounded-full object-cover border"
                  />

                  <div className="flex flex-col">
                    <span className="font-medium">
                      {c.firstName} {c.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                      #{c.userId.slice(-6)}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* 📧 EMAIL */}
              <TableCell className="text-muted-foreground">{c.email}</TableCell>

              {/* 🟢 STATUS */}
              <TableCell>
                <Badge className={`border ${getStatusStyle(c.status)}`}>
                  {c.status ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              {/* 💰 TOTAL */}
              <TableCell className="font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(c.totalRevenue)}
              </TableCell>

              {/* 📦 ORDERS */}
              <TableCell>{c.ordersCount}</TableCell>

              {/* 📅 DATE */}
              <TableCell>
                {new Date(c.lastOrderDate).toLocaleDateString()}
              </TableCell>

             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
