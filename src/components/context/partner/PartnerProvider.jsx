"use client";

import { useState, useCallback, useRef } from "react";
import { PartnerContext } from "./PartnerContext";
import {
  createPartner,
  deletePartner,
  getAllPartners,
  getPartnerById,
  updatePartner,
} from "@/components/ِApi/partnerApi";

export function PartnerProvider({ children }) {
  const [partners, setPartners] = useState([]);
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
  });
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [totalPartnerCoupons, setTotalPartnerCoupons] = useState(0);
  // 🔥 FIXED: Track last filters to avoid duplicate calls
  const lastFiltersRef = useRef(null);

  // 🔥 FIXED: Stable fetchPartners with duplicate check
  const fetchPartners = useCallback(async (params = {}) => {
    // 🔥 SKIP if same filters (NO LOOP!)
    const filtersStr = JSON.stringify(params);
    if (lastFiltersRef.current === filtersStr) {
      return;
    }
    lastFiltersRef.current = filtersStr;

    setFetchLoading(true);
    try {
      const data = await getAllPartners(params);
      console.log(data);

      console.log("✅ FETCH SUCCESS:", data);
      setPartners(data?.partners ?? []);
      setTotalPartnerCoupons(data.totalCoupons);
      setPagination({
        currentPage: data.pagination.currentPage,
        numberOfPages: data.pagination.numberOfPages,
      });
      return data;
    } catch (err) {
      console.error("❌ FETCH ERROR:", err?.response?.data || err.message);
      setPartners([]);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  // 🔥 Other functions (unchanged)
  const fetchPartnerById = async (id) => {
    setDetailsLoading(true);
    try {
      const res = await getPartnerById(id);
      const data = res?.data || res;
      setPartnerDetails(data?.partner || data);
      return data;
    } finally {
      setDetailsLoading(false);
    }
  };

  const addPartner = async (data) => {
    setCreateLoading(true);
    try {
      const res = await createPartner(data);
      const newPartner = res?.data?.partner;
      setPartners((prev) => [newPartner, ...prev]);
      return res;
    } finally {
      setCreateLoading(false);
    }
  };

  const editPartner = async (id, data) => {
    setUpdateLoading(true);
    try {
      const res = await updatePartner(id, data);
      const updated = res?.data?.partner;

      // ✅ تحديث مباشر للـ UI
      setPartnerDetails(updated);

      // ✅ تحديث الليست لو موجودة
      setPartners((prev) => prev.map((p) => (p._id === id ? updated : p)));

      return updated;
    } finally {
      setUpdateLoading(false);
    }
  };

  const removePartner = async (id) => {
    setDeleteLoading(true);
    try {
      await deletePartner(id);
      setPartners((prev) => prev.filter((p) => p._id !== id));
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <PartnerContext.Provider
      value={{
        partners,
        partnerDetails,
        fetchLoading,
        createLoading,
        updateLoading,
        deleteLoading,
        detailsLoading,
        fetchPartners, // ✅ Now stable + duplicate-proof
        fetchPartnerById,
        addPartner,
        editPartner,
        removePartner,
        totalPartnerCoupons,
        pagination,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
}
