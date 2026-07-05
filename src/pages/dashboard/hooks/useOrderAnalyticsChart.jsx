/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import useOrders from "@/components/hooks/useOrders";

export default function useOrdersAnalyticsChart() {
  const { fetchStatusTotalSales } = useOrders();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  // 🚀 fetch logic
  const fetchData = useCallback(
    async (customFilters) => {
      setLoading(true);

      try {
        const res = await fetchStatusTotalSales(customFilters);

        setData(res?.data || null);
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [fetchStatusTotalSales],
  );

  // 🚀 initial load only once
  useEffect(() => {
    fetchData(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🎯 apply filters
  const handleApply = async () => {
    await fetchData(filters);
  };

  // 🧹 clear filters
  const handleClear = async () => {
    const reset = {
      startDate: "",
      endDate: "",
    };

    setFilters(reset);

    await fetchData(reset);
  };

  return {
    // data
    data,
    loading,

    // filters
    filters,
    setFilters,

    // actions
    handleApply,
    handleClear,

    // optional
    fetchData,
  };
}
