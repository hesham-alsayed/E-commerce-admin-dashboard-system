"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { usePartners } from "./hooks/usePartners";
import PartnerPickerModal from "./PartnersPickerModal";

// ================= SWITCH =================
const BlackSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#000" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#000",
  },
  "& .MuiSwitch-track": { backgroundColor: "#d4d4d4" },
}));

export default function CouponForm({
  initialData,
  onSubmit,
  loading = false,
  partner,
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      type: "general",
      partner: "",
      discountType: "percentage",
      discountValue: 0,
      minPurchase: 0,
      startDate: "",
      endDate: "",
      usageLimit: 0,
      active: true,
    },
  });

  const type = watch("type");

  const { partners, fetchPartners } = usePartners();

  const [openPartnerModal, setOpenPartnerModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  // ================= LOCK LOGIC =================
  const isPartnerLocked = !!partner;
  const isPartnerType = type === "partner" || isPartnerLocked;

  // 👇 FIX: allow picking only in global coupon page
  const canPickPartner = type === "partner" && !isPartnerLocked;

  // ================= LOAD =================
  useEffect(() => {
    fetchPartners();
  }, []);

  // ================= PREFILL =================
  useEffect(() => {
    if (!initialData && !partner) return;

    const partnerObj =
      partner ||
      (typeof initialData?.partner === "object" ? initialData.partner : null);

    setSelectedPartner(partnerObj);

    reset({
      code: initialData?.code || "",
      type: partner ? "partner" : initialData?.type || "general",
      partner: partner?._id || partnerObj?._id || initialData?.partner || "",
      discountType: initialData?.discountType || "percentage",
      discountValue: Number(initialData?.discountValue) || 0,
      minPurchase: Number(initialData?.minPurchase) || 0,
      startDate: initialData?.startDate
        ? new Date(initialData.startDate).toISOString().split("T")[0]
        : "",
      endDate: initialData?.endDate
        ? new Date(initialData.endDate).toISOString().split("T")[0]
        : "",
      usageLimit: Number(initialData?.usageLimit) || 0,
      active: Boolean(initialData?.active),
    });
  }, [initialData, partner]);

  // ================= SELECT =================
  const handleSelectPartner = (p) => {
    setSelectedPartner(p);
    setValue("partner", p._id, { shouldValidate: true });
    setOpenPartnerModal(false);
  };

  // ================= SUBMIT =================
  const submitHandler = (data) => {
    onSubmit({
      ...data,
      type: isPartnerLocked ? "partner" : data.type,
      partner: partner?._id || data.partner,
      discountValue: Number(data.discountValue),
      minPurchase: Number(data.minPurchase),
      usageLimit: Number(data.usageLimit),
    });
  };

  const isEdit = !!initialData;

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-3 bg-white rounded-2xl"
      >
        {/* CODE */}
        <div className="flex items-center justify-between gap-4">
          <div className="w-full space-y-1">
            <Label>Code</Label>
            <Input {...register("code")} />
          </div>

          {/* TYPE */}
          <div className="w-full space-y-1">
            <Label>Type</Label>

            {isPartnerLocked ? (
              <Input value="Partner" disabled />
            ) : (
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isEdit}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            )}
          </div>
        </div>

        {/* PARTNER INPUT */}
        {isPartnerType && (
          <div className="space-y-1">
            <Label>Partner</Label>

            <Input
              value={selectedPartner?.name || partner?.name || ""}
              readOnly
              disabled={isPartnerLocked}
              onClick={() => {
                if (canPickPartner) {
                  setOpenPartnerModal(true);
                }
              }}
              className={
                canPickPartner ? "cursor-pointer" : "cursor-not-allowed"
              }
            />

            {errors.partner && (
              <p className="text-red-500 text-xs">{errors.partner.message}</p>
            )}
          </div>
        )}

        {/* DISCOUNT */}
        <div className="flex gap-4">
          <div className="w-full space-y-1">
            <Label>Discount Value</Label>
            <Input
              type="number"
              {...register("discountValue", { valueAsNumber: true })}
            />
          </div>

          <div className="w-full space-y-1">
            <Label>Min Purchase</Label>
            <Input
              type="number"
              {...register("minPurchase", { valueAsNumber: true })}
            />
          </div>

          <div className="w-full space-y-1">
            <Label>Usage Limit</Label>
            <Input
              type="number"
              {...register("usageLimit", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* DATES */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label>Start Date</Label>
            <Input type="date" {...register("startDate")} />
          </div>

          <div className="space-y-1">
            <Label>End Date</Label>
            <Input type="date" {...register("endDate")} />
          </div>
        </div>

        {/* ACTIVE */}
        <Controller
          control={control}
          name="active"
          render={({ field }) => (
            <div className="flex justify-between items-center border p-2 rounded-lg">
              <Label>Status</Label>
              <BlackSwitch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            </div>
          )}
        />

        {/* SUBMIT */}
        <Button disabled={loading}>
          {loading ? "Saving..." : "Save Coupon"}
        </Button>
      </form>

      {/* FIXED MODAL LOGIC */}
      {canPickPartner && (
        <PartnerPickerModal
          open={openPartnerModal}
          onClose={() => setOpenPartnerModal(false)}
          partners={partners}
          onSelect={handleSelectPartner}
        />
      )}
    </>
  );
}
