// api/orders.api.js

import { api } from ".";

// ================= ADMIN =================

// Get orders stats
export const getOrdersStats = async () => {
  const res = await api.get("/orders/stats");
  return res.data;
};

// Get all orders (pagination + search)
export const getAllOrders = async (query = {}) => {
  const res = await api.get("/orders", {
    params: query,
  });
  return res.data;
};

// Get orders by user
export const getOrdersByUser = async (userId) => {
  const res = await api.get(`/orders/users/${userId}`);
  return res.data;
};

// Cancel order
export const cancelOrder = async (orderId) => {
  const res = await api.patch(`/orders/cancel-order/${orderId}`);
  return res.data;
};

// ================= ANALYTICS =================

export const getStatusTotalSales = async (query = {}) => {
  const res = await api.get("/orders/analytics/total-sales", {
    params: query,
  });
  return res.data;
};

export const getDailySales = async (query = {}) => {
  const res = await api.get("/orders/analytics/total-sales-daily", {
    params: query,
  });
  return res.data;
};

export const getMonthlySales = async (query = {}) => {
  const res = await api.get("/orders/analytics/total-sales-monthly", {
    params: query,
  });
  return res.data;
};

export const getYearlySales = async (query = {}) => {
  const res = await api.get("/orders/analytics/total-sales-yearly", {
    params: query,
  });
  return res.data;
};

export const getTopProducts = async (query = {}) => {
  const res = await api.get("/orders/analytics/top-products", {
    params: query,
  });
  return res.data;
};

export const getStatusSummary = async (query = {}) => {
  const res = await api.get("/orders/analytics/status-summary", {
    params: query,
  });
  return res.data;
};

export const getPaymentMethodsSummary = async (query = {}) => {
  const res = await api.get("/orders/analytics/payment-methods-summary", {
    params: query,
  });
  return res.data;
};

export const getCitySummary = async (query = {}) => {
  const res = await api.get("/orders/analytics/sales-by-city", {
    params: query,
  });
  return res.data;
};

export const getTodaySales = async () => {
  const res = await api.get("/orders/analytics/today");
  return res.data;
};

// ================= USER =================

// Get my orders
export const getMyOrders = async () => {
  const res = await api.get("/orders/my-orders");
  return res.data;
};

// Create order
export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

// Get single order
export const getOrder = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

// Track order (params + query)
export const trackOrder = async (orderNumber, email) => {
  const res = await api.get(`/orders/track/${orderNumber}`, {
    params: { email },
  });
  return res.data;
};

// Delete order
export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

// Update order
export const updateOrder = async (id, data) => {
  const res = await api.patch(`/orders/${id}`, data);
  return res.data;
};

// Get user stats
export const getUserStats = async () => {
  const res = await api.get("/orders/user-stats");
  return res.data;
};

export const getInvoiceStats = async () => {
  const res = await api.get("/orders/invoice-stats");
  return res.data.stats;
};
