/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useCallback } from "react";
import { getTopRatedProducts } from "@/components/ِApi/productsApi";

export default function useProductRatingChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("5");
  const [totalPages, setTotalPages] = useState(1);

  // 🚀 FETCH
  const fetchData = useCallback(async (p, l) => {
    try {
      setLoading(true);

      const res = await getTopRatedProducts({
        page: p,
        limit: l,
      });

      setData(res?.data || []);

      setTotalPages(res?.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);

      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 fetch when page or limit changes
  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  // 🎯 actions
  const handleLimitChange = (value) => {
    setLimit(value);
    setPage(1);
  };

  const nextPage = () => {
    if (page < totalPages && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1 && !loading) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    data,
    loading,

    page,
    limit,
    totalPages,

    setPage,
    setLimit,

    handleLimitChange,
    nextPage,
    prevPage,

    refetch: () => fetchData(page, limit),
  };
}
