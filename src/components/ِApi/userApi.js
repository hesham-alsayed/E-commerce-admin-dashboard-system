/* =========================
   PROFILE
========================= */

import { api } from ".";

export const updateMe = async (data) => {
  const res = await api.patch("/users/update-me", data);
  return res.data;
};

export const uploadAvatar = async (data) => {
  const isFormData = data instanceof FormData;
  const res = await api.patch("/users/me", data, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });

  return res.data;
};

export const deleteMe = async () => {
  const res = await api.delete("/users/me");
  return res.data;
};

/* =========================
   USERS (ADMIN)
========================= */

export const changeUserRole = async (userId, role) => {
  const { data } = await api.patch(`/users/${userId}/role`, {
    role,
  });

  return data;
};

export const getAllUsers = async (params) => {
  const res = await api.get(`/users`, {
    params,
  });
  return res.data;
};

export const getUser = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post(`/users`, data);
  return res.data;
};
export const updateUser = async (id, data) => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

/* =========================
   WISHLIST
========================= */

export const getWishlist = async () => {
  const res = await api.get("/users/wishlist");
  return res.data;
};

export const addToWishlist = async (productId) => {
  const res = await api.post("/users/wishlist", { productId });
  return res.data;
};

export const removeFromWishlist = async (productId) => {
  const res = await api.delete(`/users/wishlist/${productId}`);
  return res.data;
};

/* =========================
   ADDRESSES (USER)
========================= */

export const getMyAddresses = async () => {
  const res = await api.get("/users/me/addresses");
  return res.data;
};

export const addMyAddress = async (data) => {
  const res = await api.post("/users/me/addresses", data);
  return res.data;
};

export const updateMyAddress = async (addressId, data) => {
  const res = await api.patch(`/users/me/addresses/${addressId}`, data);
  return res.data;
};

export const deleteMyAddress = async (addressId) => {
  const res = await api.delete(`/users/me/addresses/${addressId}`);
  return res.data;
};

/* =========================
   ADDRESSES (ADMIN)
========================= */

export const getUserAddresses = async (userId) => {
  const res = await api.get(`/users/${userId}/addresses`);
  return res.data;
};

export const addUserAddress = async (userId, data) => {
  const res = await api.post(`/users/${userId}/addresses`, data);
  return res.data;
};

export const updateUserAddress = async (userId, addressId, data) => {
  const res = await api.patch(`/users/${userId}/addresses/${addressId}`, data);
  return res.data;
};

export const deleteUserAddress = async (userId, addressId) => {
  const res = await api.delete(`/users/${userId}/addresses/${addressId}`);
  return res.data;
};

/* =========================
   ANALYTICS
========================= */

export const getCustomersSummary = async (query = {}) => {
  const res = await api.get(`/users/customers-summary`, {
    params: query,
  });
  return res.data;
};

export const getCustomersStats = async () => {
  const res = await api.get("/users/customers-stats");
  return res.data;
};

export const getUsersStats = async () => {
  const res = await api.get("/users/stats");
  return res.data;
};
