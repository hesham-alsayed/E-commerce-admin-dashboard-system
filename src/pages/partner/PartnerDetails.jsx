"use client";

import PartnerHeader from "@/components/PartnerHeader";
import PartnerInfo from "@/components/PartnerInfo";
import PartnerStatsDetails from "@/components/PartnerStatsDetails";
import PartnerCouponsSection from "@/components/PartnerCouponsSection";
import PartnerDetailsSkeleton from "@/components/PartnerDetailsSkeleton";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePartners } from "@/components/hooks/usePartners";
import { showToast } from "@/lib/utils";

import { Percent, DollarSign, TrendingUp, Ticket } from "lucide-react";
import { PartnerModal } from "@/components/PartnerModal";
import { useCoupons } from "@/components/hooks/useCoupons";
import CouponModal from "@/components/CouponModal";

export default function PartnerDetails() {
  const {
    fetchPartnerById,
    partnerDetails,
    detailsLoading,
    updateLoading,
    editPartner,
  } = usePartners();

  const { addCoupon, actionLoading } = useCoupons();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [openCreateCoupon, setOpenCreateCoupon] = useState(false);

  // ✅ fetch once when id changes
  useEffect(() => {
    if (!id) return;
    fetchPartnerById(id);
  }, [id]);

  console.log(partnerDetails);

  // ================= UPDATE =================
  const handleUpdatePartner = async (data) => {
    try {
      await editPartner(id, data);

      // ✅ ضمان تحديث من السيرفر
      await fetchPartnerById(id);

      showToast({
        message: "Partner updated successfully",
        type: "success",
      });

      setIsOpen(false);
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Update failed",
        type: "error",
      });
    }
  };

  // ================= TOGGLE =================
  const togglePartnerStatus = async () => {
    try {
      const newStatus = !partnerDetails?.active;

      await editPartner(id, { active: newStatus });

      // ✅ refresh
      await fetchPartnerById(id);
      showToast({
        message: newStatus ? "Partner activated" : "Partner deactivated",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Update failed",
        type: "error",
      });
    }
  };

  // ================= CREATE COUPON =================
  const handleCreateCoupon = async (data) => {
    try {
      await addCoupon(data);

      // ✅ refresh after create
      await fetchPartnerById(id);

      showToast({
        message: "Coupon created successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Error",
        type: "error",
      });
    } finally {
      setOpenCreateCoupon(false);
    }
  };

  // ================= STATS =================
  const statsData = [
    {
      title: "Commission Rate",
      value: `${partnerDetails?.commissionRate || 0}%`,
      icon: Percent,
      subtitle: "Partner commission percentage",
    },

    {
      title: "Generated Sales",
      value: `$${partnerDetails?.stats?.totalSales || 0}`,
      icon: TrendingUp,
      subtitle: "Total sales from partner coupons",
      color: "text-blue-600",
    },

    {
      title: "Commission Earnings",
      value: `$${partnerDetails?.stats?.totalEarnings || 0}`,
      icon: DollarSign,
      subtitle: "Total earned from commissions",
      color: "text-green-600",
    },

    {
      title: "Total Coupons",
      value: partnerDetails?.stats?.totalCoupons || 0,
      icon: Ticket,
      subtitle: "All created coupons",
    },

    {
      title: "Active Coupons",
      value: partnerDetails?.stats?.activeCoupons || 0,
      icon: Ticket,
      subtitle: "Currently active coupons",
    },

    {
      title: "Coupon Usage",
      value: partnerDetails?.stats?.totalUsedCount || 0,
      icon: TrendingUp,
      subtitle: "Total coupon usages",
    },
  ];

  // ================= LOADING =================
  if (detailsLoading || !partnerDetails) {
    return <PartnerDetailsSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <PartnerHeader
        active={partnerDetails.active}
        updateLoading={updateLoading}
        deactivate={togglePartnerStatus}
        onEdit={() => setIsOpen(true)}
      />

      {/* INFO */}
      <PartnerInfo
        name={partnerDetails.name}
        email={partnerDetails.email}
        active={partnerDetails.active}
        joinedAt={partnerDetails.createdAt}
      />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statsData.map((item, index) => (
          <PartnerStatsDetails
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      {/* COUPONS */}
      <PartnerCouponsSection
        coupons={partnerDetails?.coupons || []}
        onCreate={() => setOpenCreateCoupon(true)}
      />

      {/* MODALS */}
      <PartnerModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        initialData={partnerDetails}
        updateLoading={updateLoading}
        onSubmit={handleUpdatePartner}
        mode="edit"
      />

      <CouponModal
        loading={actionLoading}
        open={openCreateCoupon}
        setOpen={setOpenCreateCoupon}
        onSubmit={handleCreateCoupon}
        partnerId={id}
        partner={partnerDetails}
      />
    </div>
  );
}
