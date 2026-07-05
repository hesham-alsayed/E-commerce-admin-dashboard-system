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

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const BlackSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#000" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#000",
  },
  "& .MuiSwitch-track": { backgroundColor: "#d4d4d4" },
}));

export function ZoneModal({
  open,
  onClose,
  onSubmit,
  mode = "create",
  initialData = null,
  loading = false,
}) {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  // ================= RESET SAFE =================
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setName(initialData.name || "");
      setIsActive(!!initialData.isActive);
    } else {
      setName("");
      setIsActive(true);
    }

    setError("");
  }, [open, mode, initialData]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Zone name is required");
      return;
    }

    await onSubmit({
      ...(initialData || {}),
      name: name.trim(),
      isActive,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && onClose(v)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Zone" : "Update Zone"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label>Zone Name</Label>

            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-transparent"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <div className="flex items-center justify-between border rounded-lg p-3">
            <span className="text-sm font-medium">Active Status</span>

            <BlackSwitch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </div>
              ) : mode === "create" ? (
                "Create"
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
