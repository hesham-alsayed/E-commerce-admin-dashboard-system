/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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

/* ================= ROLES ================= */
const ROLES = {
  ADMIN: "admin",
  USER: "user",
  CUSTOMER: "customer",
};

export function ChangeRoleModal({
  open,
  onClose,
  onSubmit,
  user,
  loadingUserId,
}) {
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  // ================= SET CURRENT ROLE =================
  useEffect(() => {
    if (open && user) {
      setRole((user?.role || "").toLowerCase());
      setError("");
    }
  }, [open, user]);

  const handleSubmit = async () => {
    if (!role) return;

    await onSubmit(user._id, {
      role: role.toLowerCase(), // DB format
    });
  };

  const isLoading = loadingUserId === user?._id;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Update user role and manage permissions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* NAME */}
          <div className="space-y-1">
            <Label>Name</Label>
            <p className="text-sm font-medium">{user?.firstName || "-"}</p>
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <Label>Email</Label>
            <p className="text-sm text-gray-600">{user?.email || "-"}</p>
          </div>

          {/* ROLE */}
          <div className="space-y-2">
            <Label>Role</Label>

            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value.toLowerCase());
                setError("");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
                <SelectItem value={ROLES.USER}>User</SelectItem>
                <SelectItem value={ROLES.CUSTOMER}>Customer</SelectItem>
              </SelectContent>
            </Select>

            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? "Updating..." : "Update Role"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
