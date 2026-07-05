"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { User, Mail, Phone, ShieldCheck, CheckCircle } from "lucide-react";

export default function UpdateUserModal({
  open,
  setOpen,
  user,
  onConfirm,
  loading,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isActive: "true",
    isVerified: "false",
  });

  // ✅ THIS IS THE FIX
  useEffect(() => {
    const check = () => {
      if (user) {
        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          isActive: user.isActive ? "true" : "false",
          isVerified: user.isVerified ? "true" : "false",
        });
      }
    };
    check();
  }, [user]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onConfirm({
      ...form,
      isActive: form.isActive === "true",
      isVerified: form.isVerified === "true",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Update User Info
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* First Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="pl-9 w-full border-gray-200 focus-visible:ring-0"
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="pl-9 w-full border-gray-200 focus-visible:ring-0"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="pl-9 w-full border-gray-200 focus-visible:ring-0"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="pl-9 w-full border-gray-200 focus-visible:ring-0"
            />
          </div>

          {/* Active */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Account Status</label>

            <Select
              value={form.isActive}
              onValueChange={(val) => handleChange("isActive", val)}
            >
              <SelectTrigger className="w-full border-gray-200 focus:ring-0 ">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gray-400" />
                  <SelectValue placeholder="Select status" />
                </div>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Verified */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Email Verification</label>

            <Select
              value={form.isVerified}
              onValueChange={(val) => handleChange("isVerified", val)}
            >
              <SelectTrigger className="w-full border-gray-200 focus:ring-0 ">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <SelectValue placeholder="Select verification" />
                </div>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="true">Verified</SelectItem>
                <SelectItem value="false">Not Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
