"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { X } from "lucide-react";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";

const BlackSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#000" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#000",
  },
  "& .MuiSwitch-track": { backgroundColor: "#d4d4d4" },
}));

export function PartnerModal({
  open,
  onClose,
  onSubmit,
  mode = "create",
  initialData = null,
  createLoading = false,
  updateLoading = false,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [commissionType, setCommissionType] = useState("general");
  const [commissionRate, setCommissionRate] = useState("");

  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState({});
  const { overlayRef, handleOverlayClick } = useModalBehavior(open, onClose); // ================= INIT =================
  useEffect(() => {
    const check = () => {
      if (mode === "edit" && initialData) {
        setName(initialData.name || "");
        setEmail(initialData.email || "");
        setIsActive(initialData.active ?? true);

        if (initialData.commissionRate != null) {
          setCommissionType("custom");
          setCommissionRate(initialData.commissionRate);
        } else {
          setCommissionType("general");
          setCommissionRate("");
        }
      }

      if (mode === "create") {
        setName("");
        setEmail("");
        setCommissionType("general");
        setCommissionRate("");
        setIsActive(true);
      }

      setErrors({});
    };
    check();
  }, [mode, initialData, open]);

  const validate = () => {
    const err = {};

    if (!name.trim()) err.name = "Name is required";

    if (!email.trim()) {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      err.email = "Invalid email";
    }

    if (commissionType === "custom") {
      if (commissionRate === "" || commissionRate < 0) {
        err.commissionRate = "Valid commission required";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      active: Boolean(isActive),
    };

    if (commissionType === "custom") {
      payload.commissionRate = Number(commissionRate);
    }

    await onSubmit(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center">
      {/* ================= OVERLAY ================= */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="absolute inset-0 bg-black/40"
      />

      {/* ================= MODAL ================= */}
      <div
        className="relative w-full max-w-xl bg-white rounded-xl shadow-lg p-6 z-10 animate-in fade-in zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4">
          {mode === "create" ? "Create Partner" : "Update Partner"}
        </h2>

        <div className="space-y-5">
          {/* NAME */}
          <div className="space-y-2">
            <Label>Partner Name</Label>
            <Input
              placeholder="Enter partner name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="Enter partner mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* COMMISSION TYPE */}
          <div className="space-y-2">
            <Label>Commission Type</Label>

            <Select value={commissionType} onValueChange={setCommissionType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="general">General (from settings)</SelectItem>
                <SelectItem value="custom">Custom (manual)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* COMMISSION INPUT */}
          {commissionType === "custom" && (
            <div className="space-y-2">
              <Label>Commission Rate (%)</Label>
              <Input
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
              />
              {errors.commissionRate && (
                <p className="text-xs text-red-500">{errors.commissionRate}</p>
              )}
            </div>
          )}

          {/* ACTIVE */}
          <div className="flex justify-between border p-3 rounded-lg">
            <span>Status (Active)</span>
            <BlackSwitch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={createLoading || updateLoading}
            >
              {createLoading || updateLoading
                ? "Saving..."
                : mode === "create"
                  ? "Create"
                  : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
