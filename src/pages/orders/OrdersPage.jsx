"use client";

import useOrders from "@/components/hooks/useOrders";
import OrdersStatsCards from "@/components/OrdersStatsCard";
import PageInfo from "@/components/PageInfo";
import React, { useEffect, useMemo, useRef, useState } from "react";
import OrderFilters from "./OrdersFilters";
import { cleanOrderFilters } from "@/lib/utils";
import PartnerPagination from "../partner/PartnerPagination";
import OrdersTable from "./OrdersTable";
import EmptyOrders from "@/components/EmptyOrders";
import OrdersPageSkeleton from "@/components/OrdersPageSkeleton";
import UsersTableSkeleton from "@/components/UsersTableSkeleton";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ================= SAFE NUMBER ================= */
const toNumber = (v, fallback = 1) => {
  const n = Number(v);
  return Number.isNaN(n) ? fallback : n;
};

export default function OrdersPage() {
  const { fetchStats, fetchOrders, stats, orders, pagination, ordersLoading } =
    useOrders();

  const lastQueryRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  /* ================= FORCE PAGE EXISTENCE ON FIRST LOAD ================= */
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (!url.get("page")) {
      url.set("page", "1");
      setSearchParams(url, { replace: true });
    }
  }, []);

  /* ================= STATS ================= */
  useEffect(() => {
    fetchStats();
  }, []);

  /* ================= FILTERS ================= */
  const filters = useMemo(() => {
    return {
      search: searchParams.get("search") || "",
      orderStatus: searchParams.get("orderStatus") || "all",
      paymentStatus: searchParams.get("paymentStatus") || "all",
      paymentMethod: searchParams.get("paymentMethod") || "all",
      coupon: searchParams.get("coupon") || "all",
      sort: searchParams.get("sort") || "-createdAt",

      page: toNumber(searchParams.get("page"), 1),
      limit: toNumber(searchParams.get("limit"), 10),
    };
  }, [searchParams]);

  /* ================= UPDATE FILTERS ================= */
  const updateFilter = (key, value) => {
    const url = new URLSearchParams(searchParams);

    if (value === "" || value === "all" || value == null) {
      url.delete(key);
    } else {
      url.set(key, String(value));
    }

    setSearchParams(url, { replace: true });
  };

  /* ================= DEBOUNCE SEARCH ================= */
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 700);

    return () => clearTimeout(t);
  }, [filters.search]);

  /* ================= QUERY ================= */
  const query = useMemo(() => {
    const q = {
      orderStatus: filters.orderStatus,
      paymentStatus: filters.paymentStatus,
      paymentMethod: filters.paymentMethod,
      coupon: filters.coupon,
      page: filters.page,
      limit: filters.limit,
      sort: filters.sort,
    };

    if (debouncedSearch?.trim()) {
      q.search = debouncedSearch.trim();
    }

    return cleanOrderFilters(q);
  }, [filters, debouncedSearch]);

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    const key = JSON.stringify(query);

    if (lastQueryRef.current === key) return;
    lastQueryRef.current = key;

    fetchOrders(query);
  }, [query]);

  /* ================= RESET ================= */
  const resetFilters = () => {
    const url = new URLSearchParams();

    url.set("page", "1");
    url.set("limit", "10");
    url.set("sort", "-createdAt");

    setSearchParams(url, { replace: true });
  };

  /* ================= LOADING ================= */
  if (ordersLoading && orders.length === 0) {
    return <OrdersPageSkeleton />;
  }

  return (
    <div>
      <PageInfo
        head="orders"
        title="full control and manage commerce orders customers"
      />

      {/* STATS */}
      <div className="mt-10">
        <OrdersStatsCards stats={stats} />
      </div>

      <div className="bg-white p-4 rounded-2xl mt-10 border border-gray-100">
        {/* FILTERS */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center justify-between">
          <OrderFilters filters={filters} updateFilter={updateFilter} />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 justify-end mt-4">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>

          <PartnerPagination
            filters={filters}
            pagination={pagination}
            updateFilter={updateFilter}
          />
        </div>

        {/* TABLE */}
        <div className="mt-10">
          {ordersLoading && orders.length > 0 && <UsersTableSkeleton />}

          {orders.length === 0 && !ordersLoading ? (
            <EmptyOrders />
          ) : (
            <OrdersTable orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
}
