/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const BlackSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#000" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#000",
  },
  "& .MuiSwitch-track": { backgroundColor: "#d4d4d4" },
}));

export function CityModal({
  open,
  onClose,
  onSubmit,
  mode = "create",
  initialData = null,
  loading = false,
  zones = [],
  selectedZone,
  selectedZoneId,
}) {
  const [zoneId, setZoneId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState({});

  // ================= RESET SAFE =================
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setZoneId(initialData.zoneId || selectedZoneId || "");
      setName(initialData.city || "");
      setPrice(initialData.price || "");
      setEstimatedDays(initialData.estimatedDays || "");
      setIsActive(initialData.isActive ?? true);
    } else {
      setZoneId(selectedZoneId || "");
      setName("");
      setPrice("");
      setEstimatedDays("");
      setIsActive(true);
    }

    setErrors({});
  }, [open, mode, initialData, selectedZoneId]);

  // ================= VALIDATION =================
  const validate = () => {
    const err = {};

    if (mode === "create" && !zoneId) {
      err.zoneId = "Zone is required";
    }

    if (!name.trim()) err.name = "City name is required";
    if (!price || price <= 0) err.price = "Price must be > 0";
    if (!estimatedDays || estimatedDays <= 0)
      err.estimatedDays = "Days must be > 0";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!validate()) return;

    await onSubmit({
      zoneId: zoneId || selectedZoneId,
      city: name.trim(),
      price: Number(price),
      estimatedDays: Number(estimatedDays),
      isActive: Boolean(isActive),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && onClose(v)}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create City" : "Update City"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label>Zone</Label>

            {mode === "edit" ? (
              <div className="w-full border rounded-md p-2 bg-muted text-sm">
                {selectedZone || "Unknown Zone"}
              </div>
            ) : (
              <Select value={zoneId} onValueChange={setZoneId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Zone" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((z) => (
                    <SelectItem key={z._id} value={z._id}>
                      {z.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {errors.zoneId && (
              <p className="text-xs text-red-500">{errors.zoneId}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>City Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label>Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Estimated Days</Label>
            <Input
              type="number"
              value={estimatedDays}
              onChange={(e) => setEstimatedDays(e.target.value)}
            />
          </div>

          <div className="flex justify-between border p-3 rounded-lg">
            <span>Active</span>
            <BlackSwitch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
