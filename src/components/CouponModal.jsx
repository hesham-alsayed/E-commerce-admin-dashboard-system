"use client";

import { useModalBehavior } from "@/CustomHooks/useModalBehavior";
import CouponForm from "./CouponForm";
import { X } from "lucide-react";

export default function CouponModal({
  open,
  setOpen,
  initialData,
  onSubmit,
  loading,
  partnerId,
  partner,
}) {
  const { overlayRef, handleOverlayClick } = useModalBehavior(open, setOpen);

  if (!open) return null;

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* OVERLAY */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="absolute inset-0 bg-black/40"
      />

      {/* MODAL */}
      <div className="relative z-10 w-[600px] max-w-[95vw] bg-white rounded-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in">
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 p-1 rounded hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Update Coupon" : "Create Coupon"}
        </h2>

        {/* FORM */}
        <CouponForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          partnerId={partnerId}
          partner={partner}
        />
      </div>
    </div>
  );
}