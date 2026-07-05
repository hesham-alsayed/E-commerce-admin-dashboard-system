/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useCallback } from "react";
import { getPaymentMethodsSummary } from "@/components/ِApi/orderApi";

const cleanParams = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line no-unused-vars
      ([_, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

export default function usePaymentCompareChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    start: "",
    end: "",
    year: new Date().getFullYear(),
  });

  // 🚀 FETCH
  const fetchData = useCallback(async (customFilters) => {
    setLoading(true);

    try {
      const params = cleanParams({
        year: customFilters.year || new Date().getFullYear(),
        start: customFilters.start,
        end: customFilters.end,
      });

      const res = await getPaymentMethodsSummary(params);

      setData(res?.data || []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 initial load once
  useEffect(() => {
    fetchData(filters);
  }, []);

  // 🎯 APPLY
  const handleApply = async (newFilters) => {
    setFilters(newFilters);

    await fetchData(newFilters);
  };

  // 🧹 CLEAR
  const handleClear = async () => {
    const reset = {
      start: "",
      end: "",
      year: new Date().getFullYear(),
    };

    setFilters(reset);

    await fetchData(reset);
  };

  return {
    data,
    loading,

    filters,
    setFilters,

    handleApply,
    handleClear,
  };
}
