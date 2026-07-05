// collectionApi.js
import { api } from "./index";

// ================= GET ALL COLLECTIONS =================
export const getAllCollections = async () => {
  try {
    const res = await api.get("/collections");
    return res.data;
  } catch (error) {
    console.error(
      "❌ Get collections error:",
      error.response?.data || error.message,
    );
    return []; // ✅ Return empty array instead of throwing
  }
};
// ================= GET SINGLE COLLECTION =================
export const getCollection = async (id) => {
  try {
    const res = await api.get(`/collections/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Get collection error:", error);
    throw error;
  }
};

// ================= CREATE COLLECTION =================
export const createCollection = async (data) => {
  try {
    console.log("Creating collection:", data); // DEBUG
    const res = await api.post("/collections", data);
    console.log("Create success:", res.data); // DEBUG
    return res?.data?.collection || res?.data?.data?.collection || null;
  } catch (error) {
    console.error("Create collection error:", error.response?.data || error);
    throw error;
  }
};

// ================= UPDATE COLLECTION =================
export const updateCollection = async (id, data) => {
  try {
    console.log("Updating collection:", id, data); // DEBUG
    const res = await api.patch(`/collections/${id}`, data);
    console.log("Update success:", res.data); // DEBUG
    return res?.data?.collection || res?.data?.data?.collection || null;
  } catch (error) {
    console.error("Update collection error:", error.response?.data || error);
    throw error;
  }
};

// ================= DELETE COLLECTION =================
export const deleteCollection = async (id) => {
  try {
    console.log("Deleting collection:", id); // DEBUG
    await api.delete(`/collections/${id}`);
    console.log("Delete success:", id); // DEBUG
    return id;
  } catch (error) {
    console.error("Delete collection error:", error.response?.data || error);
    throw error;
  }
};
