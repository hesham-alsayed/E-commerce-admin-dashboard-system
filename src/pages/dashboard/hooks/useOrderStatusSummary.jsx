/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getStatusSummary } from "@/components/ِApi/orderApi";

export default function useOrderStatusSummary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  // 📦 FETCH ONLY DATA
  const fetchData = useCallback(async (customFilters) => {
    setLoading(true);

    try {
      const res = await getStatusSummary(customFilters);

      setData(res?.data || []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 initial load only once
  useEffect(() => {
    fetchData(filters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🎯 APPLY FILTER
  const handleApply = async (newFilters) => {
    setFilters(newFilters);

    await fetchData(newFilters);

    setOpenFilter(false);
  };

  // 🧹 CLEAR FILTER
  const handleClear = async () => {
    const reset = {
      startDate: "",
      endDate: "",
    };

    setFilters(reset);

    await fetchData(reset);
  };

  // 📊 total
  const total = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.count || 0), 0);
  }, [data]);

  // 📊 empty check
  const isEmpty = useMemo(() => {
    return !data || data.length === 0;
  }, [data]);

  return {
    data,
    loading,

    filters,
    setFilters,

    openFilter,
    setOpenFilter,

    handleApply,
    handleClear,

    total,
    isEmpty,
  };
}
