/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import useOrders from "@/components/hooks/useOrders";
import { useEffect, useState, useCallback } from "react";

export default function useTotalSalesChart() {
  const {
    fetchTotalSalesDaily,
    fetchTotalSalesMonthly,
    fetchTotalSalesYearly,
  } = useOrders();

  const [type, setType] = useState("yearly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🚀 FETCH
  const getData = useCallback(
    async (selectedType = type) => {
      setLoading(true);

      try {
        let res;

        if (selectedType === "daily") {
          res = await fetchTotalSalesDaily();
        } else if (selectedType === "monthly") {
          res = await fetchTotalSalesMonthly();
        } else {
          res = await fetchTotalSalesYearly();
        }

        setData(res?.data || []);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [type, fetchTotalSalesDaily, fetchTotalSalesMonthly, fetchTotalSalesYearly],
  );

  // 🚀 initial load
  useEffect(() => {
    getData(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // 🎯 change type + fetch immediately
  const handleTypeChange = async (newType) => {
    setType(newType);
    await getData(newType);
  };

  return {
    type,
    setType: handleTypeChange,

    data,
    loading,

    refetch: getData,
  };
}
