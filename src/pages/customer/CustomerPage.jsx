"use client";

import CustomerFilters from "./CustomerFilters";
import { useEffect, useMemo, useRef, useState } from "react";
import { cleanCustomerFilters } from "@/lib/utils";
import { useUsers } from "@/components/hooks/useUsers";
import CustomersTable from "./CustomersTable";
import PageInfo from "@/components/PageInfo";
import CustomerStatsCard from "@/components/CustomerStatsCard";
import { toast } from "sonner";

import { CustomersStatsSkeleton } from "@/components/CustomersStatsSkeleton";
import CustomersEmptyState from "@/components/CustomersEmptyState";
import CustomersTableSkeleton from "@/components/CustomersTableSkeleton";
import CustomerPagination from "./CustomerPagination";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ================= DEBOUNCE ONLY FOR INPUTS ================= */
function useDebounce(value, delay = 600) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function CustomerPage() {
  const { fetchCustomers, customers, customersLoading, fetchCustomersStats } =
    useUsers();

  const [searchParams, setSearchParams] = useSearchParams();

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const lastQueryRef = useRef(null);

  // ================= URL FILTERS =================
  const filters = useMemo(() => {
    return {
      search: searchParams.get("search") ?? "",
      status: searchParams.get("status") ?? "all",
      revenueGte: searchParams.get("revenueGte") ?? "",
      revenueLte: searchParams.get("revenueLte") ?? "",
      ordersGte: searchParams.get("ordersGte") ?? "",
      ordersLte: searchParams.get("ordersLte") ?? "",
      sort: searchParams.get("sort") ?? "lastOrderDate",
      order: searchParams.get("order") ?? "desc",
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
    };
  }, [searchParams]);

  // ================= ONLY INPUTS DEBOUNCE =================
  const debouncedInputs = useDebounce(
    {
      search: filters.search,
      revenueGte: filters.revenueGte,
      revenueLte: filters.revenueLte,
      ordersGte: filters.ordersGte,
      ordersLte: filters.ordersLte,
    },
    600,
  );

  // merge final filters (selects instant + inputs debounced)
  const finalFilters = useMemo(() => {
    return {
      ...filters,
      ...debouncedInputs,
    };
  }, [filters, debouncedInputs]);

  // ================= FETCH =================
  useEffect(() => {
    const query = cleanCustomerFilters(finalFilters);
    const stringified = JSON.stringify(query);

    if (lastQueryRef.current === stringified) return;
    lastQueryRef.current = stringified;

    const load = async () => {
      try {
        const data = await fetchCustomers(query);
        setPagination(data.pagination);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    load();
  }, [finalFilters, fetchCustomers]);

  // ================= STATS =================
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchCustomersStats();
        setStats(res.data);
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, [fetchCustomersStats]);

  // ================= UPDATE FILTER =================
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value == null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    setSearchParams(params, { replace: true });
  };

  // ================= RESET =================
  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  if (customersLoading && customers.length === 0) {
    return (
      <div className="space-y-10">
        <CustomersStatsSkeleton />
        <CustomersTableSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <PageInfo head="Customers" title="Show summary for customers data" />
      </div>
      {loadingStats ? (
        <CustomersStatsSkeleton />
      ) : (
        <CustomerStatsCard stats={stats} />
      )}

      <div className="bg-white border rounded-2xl">
        <div className="p-4 rounded-xl">
          <CustomerFilters filters={filters} updateFilter={updateFilter} />

          <div className="flex justify-end gap-3 mt-4">
            <Button
            variant="outline"
              onClick={resetFilters}
              className="px-4 py-2 hover:cursor-pointer text-sm border rounded-lg hover:bg-gray-50"
            >
              Reset Filters
            </Button>

            <CustomerPagination
              pagination={pagination}
              filters={filters}
              updateFilter={updateFilter}
            />
          </div>
        </div>

        <div className="p-4">
          {customersLoading ? (
            <CustomersTableSkeleton />
          ) : customers?.length === 0 ? (
            <CustomersEmptyState
              title="No customers found"
              description="Try adjusting filters"
            />
          ) : (
            <CustomersTable data={customers} />
          )}
        </div>
      </div>
    </div>
  );
}
