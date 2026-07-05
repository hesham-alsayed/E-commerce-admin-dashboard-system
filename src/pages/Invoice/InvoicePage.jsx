"use client";

import useOrders from "@/components/hooks/useOrders";
import { InvoiceSkeleton } from "@/components/InvoiceSkeleton";
import PageInfo from "@/components/PageInfo";
import { useEffect, useMemo, useRef, useState } from "react";
import InvoiceFilters from "./InvoiceFilters";

import EmptyInvoiceState from "@/components/EmptyInvoiceState";
import InvoicesTable from "./InvoicesTable";
import { cleanInvoiceFilters } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { PartnerTableSkeleton } from "@/components/PartnerTableSkeleton";
import InvoicePagination from "./InvoicePagination";
import { getInvoiceStats } from "@/components/ِApi/orderApi";
import TotalStatsInvoice from "./TotalStatsInvoice";

/* ================= DEBOUNCE HOOK ================= */
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function InvoicePage() {
  const { orders, fetchOrders, ordersLoading, pagination } = useOrders();

  const [searchParams, setSearchParams] = useSearchParams();
  const [totalStats, setTotalStats] = useState([]);
  const lastQueryRef = useRef(null);

  /* ================= URL → FILTERS ================= */
  const filters = useMemo(() => {
    return {
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
      search: searchParams.get("search") ?? "",
      paymentStatus: searchParams.get("paymentStatus") ?? "all",
      paymentMethod: searchParams.get("paymentMethod") ?? "all",
      sort: searchParams.get("sort") ?? "-createdAt",
    };
  }, [searchParams]);

  useEffect(() => {
    const fetchTotalStats = async () => {
      try {
        const stats = await getInvoiceStats();
        setTotalStats(stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalStats();
  }, []);

  console.log(totalStats);

  /* ================= DEBOUNCE SEARCH ONLY ================= */
  const debouncedSearch = useDebounce(filters.search, 500);

  /* ================= FINAL FILTERS ================= */
  const finalFilters = useMemo(() => {
    return {
      ...filters,
      search: debouncedSearch,
    };
  }, [filters, debouncedSearch]);

  /* ================= FETCH ================= */
  useEffect(() => {
    const query = cleanInvoiceFilters(finalFilters);

    const queryStr = JSON.stringify(query);

    if (lastQueryRef.current === queryStr) return;

    lastQueryRef.current = queryStr;

    fetchOrders(query);
  }, [finalFilters, fetchOrders]);

  /* ================= UPDATE FILTER ================= */
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // reset page except pagination
    if (key !== "page") {
      params.set("page", "1");
    }

    setSearchParams(params, { replace: true });
  };

  /* ================= RESET ================= */
  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  /* ================= INITIAL LOADING ================= */
  if (ordersLoading && orders.length === 0) {
    return <InvoiceSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div>
        <PageInfo
          head="Invoices"
          title="Track, review and manage all invoices"
        />
      </div>
      <TotalStatsInvoice stats={totalStats} />

      <div className="relative bg-white border p-4 rounded-xl space-y-4">
        {/* FILTERS + PAGINATION */}
        <div>
          <InvoiceFilters filters={filters} updateFilter={updateFilter} />

          <div className="flex mt-5 items-center gap-4 justify-end">
            <div className="flex items-center justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 hover:cursor-pointer text-sm border rounded-lg hover:bg-gray-50"
              >
                Reset Filters
              </button>
            </div>
            <div>
              <InvoicePagination
                filters={filters}
                updateFilter={updateFilter}
                fetchLoading={ordersLoading}
                pagination={pagination}
              />
            </div>
          </div>
        </div>

        {/* TABLE STATE */}
        {ordersLoading && orders?.length > 0 && <PartnerTableSkeleton />}

        {!ordersLoading && orders?.length === 0 ? (
          <EmptyInvoiceState />
        ) : (
          <InvoicesTable orders={orders} />
        )}
      </div>
    </div>
  );
}
