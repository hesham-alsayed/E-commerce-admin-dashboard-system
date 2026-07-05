import { api } from ".";

export const createReview = async (data) => {
  try {
    const res = await api.post("/reviews", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllReviews = async (params = {}) => {
  try {
    const res = await api.get("/reviews", { params });
    return res.data;
  } catch (error) {
    console.log("API ERROR:", error);
    throw error;
  }
};

export const getReview = async (id) => {
  try {
    const res = await api.get(`/reviews/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = async (id, data) => {
  try {
    const res = await api.patch(`/reviews/${id}`, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (id) => {
  try {
    const res = await api.delete(`/reviews/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestReviews = async (limit) => {
  try {
    const res = await api.get("/reviews/latest", {
      params: {
        limit,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyReviews = async () => {
  try {
    const res = await api.get("/reviews/me");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserReviews = async (userId) => {
  try {
    const res = await api.get(`/reviews/user/${userId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserReviews = async (userId) => {
  try {
    const res = await api.delete(`/reviews/user/${userId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductReviews = async (productId) => {
  try {
    const res = await api.get(`/reviews/product/${productId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductReviews = async (productId) => {
  try {
    const res = await api.delete(`/reviews/product/${productId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getReviewsAnalytics = async () => {
  try {
    const res = await api.get(`/reviews/analytics`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRatedAnalytics = async () => {
  try {
    const res = await api.get(`/reviews/analytics-rated`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
