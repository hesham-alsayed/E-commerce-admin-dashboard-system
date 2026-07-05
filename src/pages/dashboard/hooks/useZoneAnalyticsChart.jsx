/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { getCitySummary } from "@/components/ِApi/orderApi";

export default function useZoneAnalyticsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("revenue");

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  // 🚀 FETCH
  const fetchData = useCallback(async (customFilters) => {
    setLoading(true);

    try {
      const res = await getCitySummary(customFilters);

      setData(res?.data || []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 initial load
  useEffect(() => {
    fetchData(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🎯 APPLY FILTER
  const handleApply = async (newFilters) => {
    setFilters(newFilters);

    await fetchData(newFilters);
  };

  // 🧹 CLEAR FILTER
  const handleClear = async () => {
    const reset = { startDate: "", endDate: "" };

    setFilters(reset);

    await fetchData(reset);
  };

  // 📊 VALUE
  const getValue = useCallback(
    (item) => {
      if (mode === "orders") return Number(item.ordersCount || 0);
      if (mode === "users") return Number(item.uniqueUsers || 0);
      return Number(item.totalRevenue || 0);
    },
    [mode],
  );

  return {
    data,
    loading,

    filters,
    setFilters,

    handleApply,
    handleClear,

    mode,
    setMode,

    getValue,
  };
}
