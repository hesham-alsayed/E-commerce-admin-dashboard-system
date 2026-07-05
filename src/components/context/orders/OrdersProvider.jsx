"use client";

import {
  cancelOrder,
  getAllOrders,
  getDailySales,
  getMonthlySales,
  getOrder,
  getOrdersByUser,
  getOrdersStats,
  getStatusTotalSales,
  getYearlySales,
  trackOrder,
  updateOrder,
} from "@/components/ِApi/orderApi";

import { useState } from "react";
import { toast } from "sonner";
import OrdersContext from "./OrdersContext";
import { showToast } from "@/lib/utils";

export const OrdersProvider = ({ children }) => {
  // ================= DATA =================
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [pagination, setPagination] = useState(null);

  // ================= LOADING STATES =================
  const [statsLoading, setStatsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // ================= STATS =================
  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      const data = await getOrdersStats();
      setStats(data.data);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to fetch stats",
        type: "error",
      });
    } finally {
      setStatsLoading(false);
    }
  };

  // ================= ALL ORDERS =================
  const fetchOrders = async (query = {}) => {
    try {
      setOrdersLoading(true);

      const data = await getAllOrders(query);

      setOrders(data.data.orders || []);
      setPagination(data.pagination || null);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to fetch orders",
        type: "error",
      });
    } finally {
      setOrdersLoading(false);
    }
  };

  // ================= ORDERS BY USER =================
  const fetchOrdersByUser = async (userId) => {
    try {
      setOrdersLoading(true);

      const data = await getOrdersByUser(userId);

      setOrders(data.data.orders || []);
    } catch (err) {
     showToast({
        message: err?.response?.data?.message || "Failed to fetch user's orders",
        type: "error",
      });
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchOrderById = async (id) => {
    try {
      setOrdersLoading(true);
      const data = await getOrder(id);

      setCurrentOrder(data.order); // حسب الـ API عندك
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to fetch order details",
        type: "error",
      });
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchOrderByNumber = async (orderNumber, email) => {
    try {
      setActionLoading(true);
      const data = await trackOrder(orderNumber, email);
      return data;
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to track order",
        type: "error",
      });
      return null;
    } finally {
      setActionLoading(false);
    }
  };

  // ================= DELETE ORDER (optional future) =================
  const handleDeleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o._id !== orderId));
  };

  const handleUpdateOrder = async (orderId, updates) => {
    if (!orderId) return;

    const prevOrders = [...orders];

    try {
      setActionLoading(true);

      // ✅ optimistic update (خفيف جدًا)
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? {
                ...o,
                ...updates,
                ...(updates.tracking && {
                  tracking: [...(o.tracking || []), updates.tracking],
                }),
              }
            : o,
        ),
      );

      // ✅ API (الباك هو اللي يتحكم)
      const res = await updateOrder(orderId, updates);

      // ✅ sync مع الباك (الأهم)
      const updated = res.data?.updatedOrder;

      if (updated) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? updated : o)));
      }

      toast.success("Order updated");
    } catch (err) {
      setOrders(prevOrders);
      showToast({
        message: err?.response?.data?.message || "Update failed",
        type: "error",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!orderId) return;

    const prevOrders = [...orders];

    try {
      setActionLoading(true);

      // ✅ optimistic
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: "cancelled" } : o,
        ),
      );

      await cancelOrder(orderId);

      toast.success("Order cancelled");
    } catch (err) {
      // ❌ rollback
      setOrders(prevOrders);
      showToast({
        message: err?.response?.data?.message || "Failed to cancel order",
        type: "error",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ================= HELPERS (SMART UI CONTROL) =================

  const isOrderPaid = (order) => order?.paymentStatus === "paid";

  const getPaymentState = (order) => {
    const status = order?.paymentStatus;

    if (status === "paid") return { label: "Paid", variant: "success" };
    if (status === "pending") return { label: "Pending", variant: "warning" };
    if (status === "failed") return { label: "Failed", variant: "destructive" };
    if (status === "cancelled")
      return { label: "Cancelled", variant: "secondary" };

    return { label: "Unknown", variant: "secondary" };
  };

  const getOrderState = (order) => {
    const status = order?.orderStatus;

    if (status === "pending") return { label: "Pending", variant: "secondary" };
    if (status === "processing")
      return { label: "Processing", variant: "default" };
    if (status === "shipped") return { label: "Shipped", variant: "outline" };
    if (status === "delivered")
      return { label: "Delivered", variant: "success" };
    if (status === "cancelled")
      return { label: "Cancelled", variant: "destructive" };

    return { label: "Unknown", variant: "secondary" };
  };

  // ================= SMART RULES ENGINE =================

  const getAllowedOrderStatus = (order) => {
    if (!order) return [];

    if (order.orderStatus === "cancelled") return ["cancelled"];
    if (order.orderStatus === "delivered") return ["delivered"];

    return ["pending", "processing", "shipped", "delivered", "cancelled"];
  };

  const getAllowedPaymentStatus = (order) => {
    if (!order) return [];

    const { paymentMethod, orderStatus } = order;

    if (orderStatus === "cancelled") return ["cancelled"];
    if (orderStatus === "delivered") return ["paid"];

    if (paymentMethod === "cash") {
      if (orderStatus === "pending") return ["pending"];
      if (["processing", "shipped"].includes(orderStatus)) return ["pending"];
      return ["paid"];
    }

    if (paymentMethod === "paypal") {
      if (orderStatus === "pending") return ["pending", "paid", "failed"];
      return ["paid"];
    }

    return ["pending", "paid", "failed", "cancelled"];
  };

  const canUpdateOrder = (order) => {
    if (!order) return false;
    if (order.orderStatus === "cancelled") return false;
    if (order.orderStatus === "delivered") return false;
    return true;
  };

  // Analytics
  const fetchStatusTotalSales = async (query = {}) => {
    const data = await getStatusTotalSales(query);
    return data;
  };

  const fetchTotalSalesDaily = async (query = {}) => {
    const data = await getDailySales(query);
    return data;
  };
  const fetchTotalSalesMonthly = async (query = {}) => {
    const data = await getMonthlySales(query);
    return data;
  };
  const fetchTotalSalesYearly = async (query = {}) => {
    const data = await getYearlySales(query);
    return data;
  };

  return (
    <OrdersContext.Provider
      value={{
        // data
        stats,
        orders,
        pagination,

        // loading
        statsLoading,
        ordersLoading,
        actionLoading,
        currentOrder,

        // actions
        fetchStats,
        fetchOrders,
        fetchOrdersByUser,
        handleCancelOrder,
        handleDeleteOrder,
        handleUpdateOrder,
        fetchOrderById,
        fetchOrderByNumber,

        // helper
        isOrderPaid,
        getPaymentState,
        getOrderState,
        getAllowedOrderStatus,
        getAllowedPaymentStatus,
        canUpdateOrder,

        // analytics
        fetchStatusTotalSales,
        fetchTotalSalesDaily,
        fetchTotalSalesMonthly,
        fetchTotalSalesYearly,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;
