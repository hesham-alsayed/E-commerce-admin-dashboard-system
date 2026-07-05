import React, { useState } from "react";
import { ReviewContext } from "./ReviewContext";

import {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  getLatestReviews,
  getMyReviews,
  getUserReviews,
  deleteUserReviews,
  getProductReviews,
  deleteProductReviews,
  getReviewsAnalytics,
  getRatedAnalytics,
} from "../../ِApi/reviewApi";
import { showToast } from "@/lib/utils";

export default function ReviewProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [analyticsRated, setAnalyticsRated] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
  });

  // ✅ create
  const fetchCreateReview = async (data) => {
    try {
      setLoading(true);
      const res = await createReview(data);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (params = {}) => {
    try {
      setLoading(true);

      const data = await getAllReviews(params);

      if (!data) return;

      setReviews(data.reviews);
      setPagination({
        currentPage: data.pagination.currentPage,
        numberOfPages: data.pagination.numberOfPages,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
      setInitialLoading(false); // ✅ مهم
    }
  };
  const fetchRatedAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getRatedAnalytics();
      setAnalyticsRated(data.data);
      return data;
    } catch (error) {
      showToast({ message: error.response.data.message, type: "error" });
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ get one
  const fetchReview = async (id) => {
    try {
      setLoading(true);
      const res = await getReview(id);
      setReview(res.data || res);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ update
  const fetchUpdateReview = async (id, data) => {
    try {
      setLoading(true);
      const res = await updateReview(id, data);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ delete
  const fetchDeleteReview = async (id) => {
    try {
      setLoadingDelete(true);

      await deleteReview(id);

      // ✅ update state immediately
      setReviews((prev) => prev.filter((r) => r._id !== id));

      return true;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadingDelete(false);
    }
  };

  // ✅ latest
  const fetchLatestReviews = async (limit) => {
    try {
      setLoading(true);
      const res = await getLatestReviews(limit);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ my reviews
  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const res = await getMyReviews();
      setReviews(res.data || res);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ user reviews
  const fetchUserReviews = async (userId) => {
    try {
      setLoading(true);
      const res = await getUserReviews(userId);
      setReviews(res.data || res);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ delete user reviews
  const fetchDeleteUserReviews = async (userId) => {
    try {
      setLoading(true);
      const res = await deleteUserReviews(userId);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ product reviews
  const fetchProductReviews = async (productId) => {
    try {
      setLoading(true);
      const res = await getProductReviews(productId);
      setReviews(res.data || res);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ delete product reviews
  const fetchDeleteProductReviews = async (productId) => {
    try {
      setLoading(true);
      const res = await deleteProductReviews(productId);
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ analytics
  const fetchReviewsAnalytics = async () => {
    try {
      setLoading(true);
      const res = await getReviewsAnalytics();
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    loadingDelete,
    initialLoading,
    reviews,
    review,
    analyticsRated,
    pagination,
    fetchCreateReview,
    fetchReviews,
    fetchReview,
    fetchUpdateReview,
    fetchDeleteReview,

    fetchLatestReviews,
    fetchMyReviews,
    fetchUserReviews,
    fetchDeleteUserReviews,

    fetchProductReviews,
    fetchDeleteProductReviews,

    fetchReviewsAnalytics,
    fetchRatedAnalytics,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}
