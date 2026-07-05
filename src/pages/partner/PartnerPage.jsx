/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { usePartners } from "@/components/hooks/usePartners";
import PartnerStatsCard from "./PartnerStatsCard";
import PartnerPageSkeleton from "@/components/PartnerPageSkeleton";
import PartnerTable from "./PartnerTable";
import PageInfo from "@/components/PageInfo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PartnerModal } from "@/components/PartnerModal";
import { useEffect, useState, useMemo } from "react";
import { showToast } from "@/lib/utils";
import PartnerFilters from "./PartnerFilters";
import { PartnerTableSkeleton } from "@/components/PartnerTableSkeleton";
import PartnerPagination from "./PartnerPagination";
import { useSearchParams } from "react-router-dom";

export default function PartnerPage() {
  const {
    partners,
    fetchLoading,
    addPartner,
    editPartner,
    createLoading,
    updateLoading,
    fetchPartners,
    pagination,
    totalPartnerCoupons,
  } = usePartners();

  const [isOpen, setIsOpen] = useState(false);
  const [selectEditPartner, setSelectEditPartner] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // ================= URL AS SOURCE OF TRUTH =================
  const filters = useMemo(() => {
    return {
      page: Number(searchParams.get("page") || 1),
      limit: Number(searchParams.get("limit") || 10),
      search: searchParams.get("search") || "",
      active: searchParams.get("active") || "all",
      sort: searchParams.get("sort") || "-createdAt",
    };
  }, [searchParams]);

  // ================= UPDATE URL =================
  const updateFilter = (key, value) => {
    const url = new URLSearchParams(searchParams);

    if (value === "" || value === "all" || value == null) {
      url.delete(key);
    } else {
      url.set(key, String(value));
    }

    if (key !== "page") {
      url.set("page", "1");
    }

    setSearchParams(url);
  };

  // ================= DEBOUNCE SEARCH =================
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 400);

    return () => clearTimeout(t);
  }, [filters.search]);

  // ================= CLEAN QUERY =================
  const query = useMemo(() => {
    const q = {
      page: filters.page,
      limit: filters.limit,
      sort: filters.sort,
    };

    if (debouncedSearch?.trim()) q.search = debouncedSearch.trim();
    if (filters.active !== "all") q.active = filters.active;

    return q;
  }, [filters, debouncedSearch]);

  // ================= FETCH =================
  useEffect(() => {
    fetchPartners(query);
  }, [query]);

  // ================= ACTIONS =================
  const onCreate = () => {
    setSelectEditPartner(null);
    setIsOpen(true);
  };

  const onEdit = (partner) => {
    setSelectEditPartner(partner);
    setIsOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectEditPartner) {
        await editPartner(selectEditPartner._id, data);
        showToast({ message: "Updated", type: "success" });
      } else {
        await addPartner(data);
        showToast({ message: "Created", type: "success" });
      }
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Error",
        type: "error",
      });
    } finally {
      setIsOpen(false);
      setSelectEditPartner(null);
    }
  };

  if (fetchLoading && partners.length === 0) {
    return <PartnerPageSkeleton />;
  }

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <PageInfo
            head="Manage Partners"
            title="control partners to assign by coupons"
          />
        </div>

        <Button onClick={onCreate}>
          <Plus className="mr-2" />
          create partner
        </Button>
      </div>

      <PartnerStatsCard
        stats={{
          total: partners.length,
          active: partners.filter((p) => p.active).length,
          inactive: partners.filter((p) => !p.active).length,
          totalCoupons: totalPartnerCoupons,
        }}
      />

      <div className="bg-white p-6 rounded-xl space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <PartnerFilters filters={filters} updateFilter={updateFilter} />
          </div>

          <div className="w-full lg:w-auto">
            <PartnerPagination
              filters={filters}
              fetchLoading={fetchLoading}
              pagination={pagination}
              updateFilter={updateFilter}
            />
          </div>
        </div>

        {fetchLoading ? (
          <PartnerTableSkeleton />
        ) : (
          <PartnerTable partners={partners} onEdit={onEdit} />
        )}
      </div>

      <PartnerModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectEditPartner}
        mode={selectEditPartner ? "edit" : "create"}
        createLoading={createLoading}
        updateLoading={updateLoading}
      />
    </div>
  );
}
