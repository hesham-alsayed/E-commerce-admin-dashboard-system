/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { getTopProducts } from "@/components/ِApi/orderApi";

export default function useTopProductsSales() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("sold");

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 5,
  });

  // 🚀 FETCH
  const fetchData = useCallback(async (customFilters) => {
    setLoading(true);

    try {
      const res = await getTopProducts(customFilters);

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
  const handleApply = async () => {
    await fetchData(filters);
  };

  // 🧹 CLEAR FILTER
  const handleClear = async () => {
    const reset = { startDate: "", endDate: "", limit: 5 };

    setFilters(reset);

    await fetchData(reset);
  };

  // 📊 VALUE
  const getValue = useCallback(
    (item) => (mode === "sold" ? item.totalSold : item.totalRevenue),
    [mode],
  );

  return {
    data,
    loading,

    mode,
    setMode,

    filters,
    setFilters,

    handleApply,
    handleClear,

    getValue,
  };
}