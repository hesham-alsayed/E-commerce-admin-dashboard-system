import { api } from ".";

// ================= PUBLIC =================
export const getCouponByCode = async (code) => {
  const res = await api.get(`/coupons/code/${code}`);
  return res.data;
};

// ================= ADMIN =================
export const getAllCoupons = async (filter) => {
  const res = await api.get(`/coupons`, {
    params: filter, 
  });

  return res.data;
};

export const getCouponById = async (id) => {
  const res = await api.get(`/coupons/${id}`);
  return res.data;
};

export const createCoupon = async (data) => {
  const res = await api.post(`/coupons`, data);
  return res.data;
};

export const updateCoupon = async (id, data) => {
  const res = await api.patch(`/coupons/${id}`, data);
  return res.data;
};

export const deleteCoupon = async (id) => {
  const res = await api.delete(`/coupons/${id}`);
  return res.data;
};

export const softDeleteCoupon = async (id) => {
  const res = await api.patch(`/coupons/${id}/soft-delete`);
  return res.data;
};

export const incrementUsage = async (id, increment = 1) => {
  const res = await api.patch(`/coupons/${id}/increment`, {
    increment,
  });
  return res.data;
};

export const getCouponsByPartner = async (partnerId, active = false) => {
  const res = await api.get(`/coupons/partner/${partnerId}`, {
    params: { active },
  });
  return res.data;
};
