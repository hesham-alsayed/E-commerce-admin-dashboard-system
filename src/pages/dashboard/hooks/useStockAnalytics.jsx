/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

import { useCollections } from "@/components/hooks/useCollections";
import { useCategories } from "@/components/hooks/useCategories";
import { useSubCategories } from "@/components/hooks/useSubcategories";

import { showToast } from "@/lib/utils";
import { stockAnalyst } from "@/components/ِApi/productsApi";

export default function useStockAnalytics() {
  // =========================
  // DATA
  // =========================
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // PAGINATION
  // =========================
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("15");
  const [totalPages, setTotalPages] = useState(1);

  // =========================
  // SEARCH
  // =========================
  const [searchInput, setSearchInput] = useState("");

  // =========================
  // MASTER DATA
  // =========================
  const { collections, fetchCollections } = useCollections();
  const { categories, fetchCategories } = useCategories();
  const { subcategories, fetchSubcategories } = useSubCategories();

  // =========================
  // FETCH MASTER DATA
  // =========================
  useEffect(() => {
    fetchCollections();
    fetchCategories({ limit: 1000 });
    fetchSubcategories({ limit: 1000 });
  }, []);

  // =========================
  // UI FILTERS
  // =========================
  const [filters, setFilters] = useState({
    collection: "all",
    category: "all",
    subcategory: "all",
  });

  // =========================
  // APPLIED FILTERS
  // =========================
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    collection: "",
    category: "",
    subcategory: "",
  });

  // =========================
  // FILTERED CATEGORIES
  // =========================
  const filteredCategories = useMemo(() => {
    if (!filters.collection || filters.collection === "all") {
      return [];
    }

    return categories.filter((c) => c.collection?._id === filters.collection);
  }, [categories, filters.collection]);

  // =========================
  // FILTERED SUBCATEGORIES
  // =========================
  const filteredSubcategories = useMemo(() => {
    if (!filters.category || filters.category === "all") {
      return [];
    }

    return subcategories.filter((s) => s.category?._id === filters.category);
  }, [subcategories, filters.category]);

  // =========================
  // CLEAN FILTERS
  // =========================
  const cleanFilters = useCallback(() => {
    return {
      page,
      limit,

      ...(appliedFilters.search?.trim() && {
        search: appliedFilters.search.trim(),
      }),

      ...(appliedFilters.collection &&
        appliedFilters.collection !== "all" && {
          collection: appliedFilters.collection,
        }),

      ...(appliedFilters.category &&
        appliedFilters.category !== "all" && {
          category: appliedFilters.category,
        }),

      ...(appliedFilters.subcategory &&
        appliedFilters.subcategory !== "all" && {
          subcategory: appliedFilters.subcategory,
        }),
    };
  }, [page, limit, appliedFilters]);

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const query = cleanFilters();

      const res = await stockAnalyst(query);

      setData(res?.data || []);
      setTotalPages(res?.pagination?.totalPages || 1);
    } catch (err) {
      console.log(err);

      showToast({
        message: err?.response?.data?.message || "Error fetching data",
        type: "error",
      });

      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [cleanFilters]);

  // =========================
  // FIRST RENDER
  // =========================
  useEffect(() => {
    fetchData();
  }, [page, limit, appliedFilters]);

  // =========================
  // SEARCH DEBOUNCE
  // =========================
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAppliedFilters((prev) => ({
        ...prev,
        search: searchInput,
      }));

      setPage(1);
    }, 700);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  // =========================
  // APPLY FILTERS
  // =========================
  const applyFilters = () => {
    setAppliedFilters({
      search: searchInput,

      collection: filters.collection === "all" ? "" : filters.collection,

      category: filters.category === "all" ? "" : filters.category,

      subcategory: filters.subcategory === "all" ? "" : filters.subcategory,
    });

    setPage(1);
  };

  // =========================
  // CLEAR FILTERS
  // =========================
  const clearFilters = () => {
    setSearchInput("");

    setFilters({
      collection: "all",
      category: "all",
      subcategory: "all",
    });

    setAppliedFilters({
      search: "",
      collection: "",
      category: "",
      subcategory: "",
    });

    setPage(1);
  };

  // =========================
  // FILTER HANDLERS
  // =========================
  const setSearch = (value) => {
    setSearchInput(value);
  };

  const setCollection = (value) => {
    setFilters((prev) => ({
      ...prev,
      collection: value,
      category: "all",
      subcategory: "all",
    }));
  };

  const setCategory = (value) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
      subcategory: "all",
    }));
  };

  const setSubcategory = (value) => {
    setFilters((prev) => ({
      ...prev,
      subcategory: value,
    }));
  };

  // =========================
  // PAGINATION
  // =========================
  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // =========================
  // LIMIT
  // =========================
  const handleLimitChange = (value) => {
    setLimit(value);
    setPage(1);
  };

  // =========================
  // RETURN
  // =========================
  return {
    // DATA
    data,
    loading,

    // PAGINATION
    page,
    limit,
    totalPages,

    nextPage,
    prevPage,

    handleLimitChange,

    // FILTERS
    search: searchInput,
    collection: filters.collection,
    category: filters.category,
    subcategory: filters.subcategory,

    setSearch,
    setCollection,
    setCategory,
    setSubcategory,

    // MASTER DATA
    collections,
    categories: filteredCategories,
    subcategories: filteredSubcategories,

    // ACTIONS
    applyFilters,
    clearFilters,

    // REFETCH
    refetch: fetchData,
  };
}
