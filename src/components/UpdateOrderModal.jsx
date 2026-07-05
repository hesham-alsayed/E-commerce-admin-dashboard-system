/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import OrderFlow from "./OrderFlow";
import { Label } from "./ui/label";

export default function UpdateOrderModal({
  open,
  setOpen,
  order,
  onUpdate,
  loading,
}) {
  const [tab, setTab] = useState("edit");

  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [note, setNote] = useState("");

  // ================= FLOW =================
  const ORDER_FLOW = {
    pending: ["processing", "cancelled"],
    processing: ["shipped", "cancelled"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  // ================= INIT =================
  useEffect(() => {
    if (!order) return;

    setOrderStatus(order.orderStatus);
    setPaymentStatus(order.paymentStatus);
    setNote("");
  }, [order]);

  // ================= AUTO PAYMENT STATUS =================
  useEffect(() => {
    if (!order) return;

    const paymentMethod = order.paymentMethod;

    // ================= CASH =================
    if (paymentMethod === "cash" && orderStatus === "delivered") {
      setPaymentStatus("paid");
    }

    // ================= PAYPAL =================
    if (
      paymentMethod === "paypal" &&
      ["processing", "shipped", "delivered"].includes(orderStatus)
    ) {
      setPaymentStatus("paid");
    }
  }, [orderStatus, order]);

  if (!order) return null;

  const currentOrderStatus = order.orderStatus;
  const currentPaymentStatus = order.paymentStatus;
  const paymentMethod = order.paymentMethod;

  // ================= OPTIONS =================
  const orderStatusOptions = ORDER_FLOW[currentOrderStatus] || [];

  const getPaymentOptions = (status) => {
    const currentStatus = status || currentOrderStatus;

    // ================= PAYPAL =================
    if (paymentMethod === "paypal") {
      if (["processing", "shipped", "delivered"].includes(currentStatus)) {
        return ["paid"];
      }

      if (currentStatus === "pending") {
        return ["pending", "failed", "cancelled"];
      }
    }

    // ================= CASH =================
    if (paymentMethod === "cash") {
      if (currentStatus === "delivered") {
        return ["paid"];
      }

      if (currentStatus === "cancelled") {
        return ["pending", "cancelled"];
      }

      return ["pending"];
    }

    return [currentPaymentStatus];
  };

  // ================= IMPORTANT FIX =================
  const paymentStatusOptions = getPaymentOptions(orderStatus);

  const isFinalState =
    currentOrderStatus === "delivered" || currentOrderStatus === "cancelled";

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    await onUpdate(order._id, {
      orderStatus,
      paymentStatus,
      tracking: note
        ? {
            status: orderStatus,
            note,
          }
        : undefined,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-162 space-y-5">
        <DialogHeader>
          <DialogTitle>Order Management</DialogTitle>
        </DialogHeader>

        {/* TABS */}
        <div className="flex gap-4 border-b pb-2 text-sm">
          <button
            onClick={() => setTab("edit")}
            className={`pb-1 ${
              tab === "edit" ? "border-b-2 border-black font-semibold" : ""
            }`}
          >
            Edit Order
          </button>

          <button
            onClick={() => setTab("tracking")}
            className={`pb-1 ${
              tab === "tracking" ? "border-b-2 border-black font-semibold" : ""
            }`}
          >
            Tracking Flow
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* ================= EDIT ================= */}
          {tab === "edit" && (
            <_motion.div
              key="edit"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-5"
            >
              {/* ORDER STATUS */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Order Status</label>

                <Select
                  value={orderStatus || currentOrderStatus}
                  onValueChange={setOrderStatus}
                  disabled={isFinalState}
                >
                  <SelectTrigger className="w-full focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none">
                    <SelectValue>
                      {orderStatus || currentOrderStatus}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {/* CURRENT */}
                    <SelectItem
                      value={currentOrderStatus}
                      className="font-semibold text-black"
                    >
                      Current: {currentOrderStatus}
                    </SelectItem>

                    {/* DIVIDER */}
                    <div className="h-px bg-gray-100 my-1" />

                    {/* OPTIONS */}
                    {orderStatusOptions
                      .filter((status) => status !== currentOrderStatus)
                      .map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PAYMENT STATUS */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Status</label>

                <Select
                  value={paymentStatus || currentPaymentStatus}
                  onValueChange={setPaymentStatus}
                  disabled={isFinalState}
                >
                  <SelectTrigger className="w-full focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none">
                    <SelectValue>
                      {paymentStatus || currentPaymentStatus}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {/* CURRENT */}
                    <SelectItem
                      value={currentPaymentStatus}
                      className="font-semibold"
                    >
                      Current: {currentPaymentStatus}
                    </SelectItem>

                    <div className="h-px bg-gray-100 my-1" />

                    {/* OPTIONS */}
                    {paymentStatusOptions
                      .filter((status) => status !== currentPaymentStatus)
                      .map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* NOTE */}
              {!isFinalState && (
                <div className="space-y-2">
                  <Label>Tracking Note</Label>

                  <Input
                    placeholder="Add tracking note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className={
                      "w-full focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                    }
                  />
                </div>
              )}

              {/* BUTTON */}
              <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Updating..." : "Update Order"}
                </Button>
              </div>
            </_motion.div>
          )}

          {/* ================= TRACKING ================= */}
          {tab === "tracking" && (
            <_motion.div
              key="tracking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <OrderFlow order={order} />
            </_motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
