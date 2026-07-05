// subCategoryApi.js
import { api } from "./index";

// ================= GET ALL SUBCATEGORIES =================
export const getAllSubCategories = async (params) => {
  try {
    const res = await api.get("/subcategories", { params });

    // console.log("📥 Subcategories response:", res.data);

    return res.data; 
  } catch (error) {
    console.error("Get subcategories error:", error);
    throw error;
  }
};

// ================= GET SINGLE SUBCATEGORY =================
export const getSubCategory = async (id) => {
  try {
    const res = await api.get(`/subcategories/${id}`);
    return res?.data?.subcategory || res?.data?.data?.subcategory || null;
  } catch (error) {
    console.error("Get subcategory error:", error);
    throw error;
  }
};

// ================= CREATE SUBCATEGORY =================
export const createSubCategory = async (data) => {
  try {
    console.log("📤 Creating subcategory:", data); // DEBUG
    const res = await api.post("/subcategories", data);
    console.log("✅ Create subcategory success:", res.data); // DEBUG
    return res?.data?.subcategory || res?.data?.data?.subcategory || null;
  } catch (error) {
    console.error(
      "❌ Create subcategory error:",
      error.response?.data || error,
    );
    throw error;
  }
};

// ================= UPDATE SUBCATEGORY =================
export const updateSubCategory = async (id, data) => {
  try {
    console.log("📤 Updating subcategory:", id, data); // DEBUG
    const res = await api.patch(`/subcategories/${id}`, data);
    console.log("✅ Update subcategory success:", res.data); // DEBUG
    return res?.data?.subcategory || res?.data?.data?.subcategory || null;
  } catch (error) {
    console.error(
      "❌ Update subcategory error:",
      error.response?.data || error,
    );
    throw error;
  }
};

// ================= DELETE SUBCATEGORY =================
export const deleteSubCategory = async (id) => {
  try {
    console.log("📤 Deleting subcategory:", id); // DEBUG
    await api.delete(`/subcategories/${id}`);
    console.log("✅ Delete subcategory success:", id); // DEBUG
    return id;
  } catch (error) {
    console.error(
      "❌ Delete subcategory error:",
      error.response?.data || error,
    );
    throw error;
  }
};
