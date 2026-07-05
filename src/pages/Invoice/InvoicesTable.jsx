"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { Receipt, User, CreditCard, View } from "lucide-react";
import { Link } from "react-router-dom";

const getPaymentColor = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-500/10 text-green-700 border-green-200";
    case "pending":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
    case "failed":
      return "bg-red-500/10 text-red-700 border-red-200";
    case "cancelled":
      return "bg-gray-500/10 text-gray-700 border-gray-200";
    default:
      return "bg-gray-500/10 text-gray-700 border-gray-200";
  }
};

export default function InvoicesTable({ orders = [] }) {
  console.log(orders);

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <Table>
        <TableHeader className={"bg-gray-100"}>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              {/* INVOICE NUMBER */}
              <TableCell className="font-semibold flex items-center gap-2">
                <Receipt className="w-4 h-4 text-gray-500" />
                {order.invoiceNumber}
              </TableCell>

              {/* ORDER NUMBER */}
              <TableCell className="text-gray-600">
                #{order.orderNumber}
              </TableCell>

              {/* CUSTOMER */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="w-4 h-4 text-gray-500" />
                    {`${order.user?.firstName} ${order.user?.lastName}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    {order.contactEmail}
                  </span>
                </div>
              </TableCell>

              {/* AMOUNT */}
              <TableCell className="font-semibold">
                EGP {order.totalPriceAfterDiscount || order.totalPrice}
              </TableCell>

              {/* PAYMENT STATUS */}
              <TableCell>
                <Badge
                  className={`border ${getPaymentColor(order.paymentStatus)}`}
                >
                  {order.paymentStatus}
                </Badge>
              </TableCell>

              {/* PAYMENT METHOD */}
              <TableCell className="flex items-center gap-1 capitalize text-gray-600">
                <CreditCard className="w-4 h-4 text-gray-500" />
                {order.paymentMethod}
              </TableCell>

              {/* DATE */}
              <TableCell className="text-gray-500 text-sm">
                {formatDateTime(new Date(order.createdAt), "MMM dd, yyyy")}
              </TableCell>

              <TableCell>
                <Link to={`/admin/commerce/orders/order-invoice/${order._id}`}>
                  <View
                    size={33}
                    className=" hover:bg-gray-200 rounded-sm p-2"
                  />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
