// categoryApi.js
import { api } from "./index";
// categoryApi.js - Fixed getAllCategories
export const getAllCategories = async ({
  page,
  limit,
  collectionId,
  keyword,
  sort,
} = {}) => {
  try {
    const params = {};

    if (page) params.page = page;
    if (limit) params.limit = limit;

    // ✅ FIXED
    if (collectionId) params.collection = collectionId;

    if (keyword) params.keyword = keyword;
    if (sort) params.sort = sort;

    const res = await api.get("/categories", { params });
    return res.data;
  } catch (error) {
    console.error("Get categories error:", error);
    throw error;
  }
};
// ================= GET SINGLE CATEGORY =================
export const getCategory = async (id) => {
  try {
    const res = await api.get(`/categories/${id}`);
    return res?.data?.category || res?.data?.data?.category || null;
  } catch (error) {
    console.error("Get category error:", error);
    throw error;
  }
};

// ================= CREATE CATEGORY =================
export const createCategory = async (data) => {
  try {
    console.log("📤 Creating category:", data); // DEBUG
    const res = await api.post("/categories", data);
    console.log("✅ Create category success:", res.data); // DEBUG
    return res?.data?.category || res?.data?.data?.category || null;
  } catch (error) {
    console.error("❌ Create category error:", error.response?.data || error);
    throw error;
  }
};

// ================= UPDATE CATEGORY =================
export const updateCategory = async (id, data) => {
  try {
    console.log("📤 Updating category:", id, data); // DEBUG
    const res = await api.patch(`/categories/${id}`, data);
    console.log("✅ Update category success:", res.data); // DEBUG
    return res?.data?.category || res?.data?.data?.category || null;
  } catch (error) {
    console.error("❌ Update category error:", error.response?.data || error);
    throw error;
  }
};

// ================= DELETE CATEGORY =================
export const deleteCategory = async (id) => {
  try { 
    console.log("📤 Deleting category:", id); // DEBUG
    await api.delete(`/categories/${id}`);
    console.log("✅ Delete category success:", id); // DEBUG
    return id;
  } catch (error) {
    console.error("❌ Delete category error:", error.response?.data || error);
    throw error;
  }
};
