import { api } from ".";

// ================= GET ALL PARTNERS =================

export const getAllPartners = async (params) => {
  const res = await api.get("/partners", { params });
  return res.data; 
};

// ================= GET PARTNERS WITH COUPON COUNT =================
export const getPartnersWithCouponCount = async () => {
  const res = await api.get("/partners");
  return res.data;
};

// ================= GET SINGLE PARTNER =================
export const getPartnerById = async (id) => {
  const res = await api.get(`/partners/${id}`);
  return res.data;
};

// ================= CREATE PARTNER =================
export const createPartner = async (data) => {
  const res = await api.post("/partners", data);
  return res.data;
};

// ================= UPDATE PARTNER =================
export const updatePartner = async (id, data) => {
  const res = await api.patch(`/partners/${id}`, data);
  return res.data;
};

// ================= DELETE PARTNER =================
export const deletePartner = async (id, force = false) => {
  const res = await api.delete(`/partners/${id}${force ? "?force=true" : ""}`);
  return res.data;
};
