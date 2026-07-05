import { showToast } from "@/lib/utils";
import { api } from "./index";

export const createProduct = async (formData) => {
  try {
    const res = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllProducts = async (params) => {
  try {
    const res = await api.get("/products", {
      params,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOneProduct = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const res = await api.patch(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    showToast({ message, type: "error" });

    console.log("AXIOS ERROR:", error);

    // 🔥 IMPORTANT: rethrow error
    throw error;
  }
};

export const deleteProductById = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const stockAnalyst = async (params) => {
  try {
    const res = await api.get(`/products/stock-analysis`, {
      params,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const stockAnalystByCategory = async () => {
  try {
    const res = await api.get(`/products/stock-analysis-by-category`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const stockAnalystByCollection = async () => {
  try {
    const res = await api.get(`/products/stock-analysis/by-collection`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopRatedProducts = async ({ page = 1, limit = 5 }) => {
  try {
    const res = await api.get("/products/analysis-top-rated", {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAdminProductAnalytics = async (id) => {
  const { data } = await api.get(`/products/${id}/analytics`, {
    withCredentials: true, // لو عندك cookies auth
  });

  return data.data; // 👈 مهم: بنرجع data فقط
};
