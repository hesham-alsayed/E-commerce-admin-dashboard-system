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
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import OrderActions from "./OrdersActions";
import useOrders from "@/components/hooks/useOrders";
import UpdateOrderModal from "@/components/UpdateOrderModal";
import { useState } from "react";
import { CancelOrderModal } from "@/components/CancelOrderModal";
import { useNotifications } from "@/components/hooks/useNotifications";

const getStatusColor = (status) => {
  switch (status) {
    case "delivered":
      return "bg-green-500/10 text-green-700 border-green-200";
    case "processing":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
    case "shipped":
      return "bg-blue-500/10 text-blue-700 border-blue-200";
    case "cancelled":
      return "bg-red-500/10 text-red-700 border-red-200";
    default:
      return "bg-gray-500/10 text-gray-700 border-gray-200";
  }
};

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

const getPaymentMethodColor = (method) => {
  switch (method) {
    case "cash":
      return "bg-green-500/10 text-green-700 border-green-200";

    case "paypal":
      return "bg-blue-500/10 text-blue-700 border-blue-200";

    case "stripe":
      return "bg-purple-500/10 text-purple-700 border-purple-200";

    default:
      return "bg-gray-500/10 text-gray-700 border-gray-200";
  }
};

const getCouponStatus = (coupon) => {
  if (!coupon) {
    return {
      label: "No Coupon",
      className: "bg-gray-500/10 text-gray-600 border-gray-200",
    };
  }

  return {
    label: `-${coupon.discountValue}${coupon.discountType === "percentage" ? "%" : "$"}`,
    className: "bg-green-500/10 text-green-700 border-green-200",
  };
};

export default function OrdersTable({ orders = [] }) {
  const { handleUpdateOrder, actionLoading, handleCancelOrder } = useOrders();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const { fetchNotifications } = useNotifications();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleUpdate = async (id, data) => {
    await handleUpdateOrder(id, data); // API call
    await fetchNotifications();
    setOpenUpdate(false);
    setSelectedOrder(null);
  };
  const onCLickUpdate = (order) => {
    setSelectedOrder(order);
    setOpenUpdate(true);
  };

  const onClickCancel = (order) => {
    setSelectedOrder(order);
    setOpenCancel(true);
  };

  const cancelOrder = async () => {
    await handleCancelOrder(selectedOrder._id);
    await fetchNotifications();

    setOpenCancel(false);
    setSelectedOrder(null);
  };
  return (
    <div className="rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Coupon</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              {/* ORDER NUMBER */}
              <TableCell className="font-medium">
                #{order.orderNumber}
              </TableCell>

              {/* USER */}
              <TableCell className="text-gray-600 text-sm">
                {order.contactEmail}
              </TableCell>
              {/* COUPON */}
              <TableCell>
                {(() => {
                  const couponStatus = getCouponStatus(order.coupon);

                  return (
                    <div className="flex flex-col gap-1">
                      <Badge className={`border ${couponStatus.className}`}>
                        {couponStatus.label}
                      </Badge>

                      {order.coupon && (
                        <span className="text-xs text-gray-500">
                          {order.coupon.code}
                        </span>
                      )}
                    </div>
                  );
                })()}
              </TableCell>

              {/* ORDER STATUS */}
              <TableCell>
                <Badge
                  className={`border ${getStatusColor(order.orderStatus)}`}
                >
                  {order.orderStatus}
                </Badge>
              </TableCell>

              {/* PAYMENT STATUS */}
              <TableCell>
                <Badge
                  className={`border ${getPaymentColor(order.paymentStatus)}`}
                >
                  {order.paymentStatus}
                </Badge>
              </TableCell>
              {/* PROVIDER */}
              <TableCell>
                <Badge
                  className={`border ${getPaymentMethodColor(order.paymentMethod)}`}
                >
                  {order.paymentMethod}
                </Badge>
              </TableCell>
              {/* TOTAL */}
              <TableCell className="font-semibold">
                ${order.totalPriceAfterDiscount || order.totalPrice}
              </TableCell>

              {/* DATE */}
              <TableCell className="text-gray-500 text-sm">
                {formatDateTime(new Date(order.createdAt), "MMM dd, yyyy")}
              </TableCell>

              {/* ACTION */}
              <TableCell className="text-right">
                <OrderActions
                  order={order}
                  onView={(id) => console.log("view", id)}
                  onUpdate={() => onCLickUpdate(order)}
                  onCancel={() => onClickCancel(order)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <UpdateOrderModal
          loading={actionLoading}
          onUpdate={handleUpdate}
          open={openUpdate}
          setOpen={setOpenUpdate}
          order={selectedOrder}
        />
        <CancelOrderModal
          isLoading={actionLoading}
          isOpen={openCancel}
          onClose={() => setOpenCancel(false)}
          orderNumber={selectedOrder?.orderNumber}
          onConfirm={cancelOrder}
          title={"Cancel Order"}
          orderId={selectedOrder?._id}
        />
      </Table>
    </div>
  );
}
