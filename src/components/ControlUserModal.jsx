"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { useUsers } from "@/components/hooks/useUsers";
import { Loader2 } from "lucide-react";
import { showToast } from "@/lib/utils";

export default function ControlUserModal({ open, setOpen, user }) {
  const { updateUserHandler } = useUsers();

  const [form, setForm] = useState({
    role: "",
    isActive: "",
    isVerified: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        role: user.role || "user",
        isActive: String(user.isActive),
        isVerified: String(user.isVerified),
      });
    }
  }, [user]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateUserHandler(user._id, {
        role: form.role,
        isActive: form.isActive === "true",
        isVerified: form.isVerified === "true",
      });

      setOpen(false);
      showToast({ message: "User Updated Success", type: "success" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    "w-full border-1 shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>User Control</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* ROLE */}
          <div>
            <p className="text-sm mb-1">Role</p>
            <Select
              value={form.role}
              onValueChange={(val) => handleChange("role", val)}
            >
              <SelectTrigger className={selectClass}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ACTIVE */}
          <div>
            <p className="text-sm mb-1">Active</p>
            <Select
              value={form.isActive}
              onValueChange={(val) => handleChange("isActive", val)}
            >
              <SelectTrigger className={selectClass}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* VERIFIED */}
          <div>
            <p className="text-sm mb-1">Verified</p>
            <Select
              value={form.isVerified}
              onValueChange={(val) => handleChange("isVerified", val)}
            >
              <SelectTrigger className={selectClass}>
                <SelectValue placeholder="Select verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Verified</SelectItem>
                <SelectItem value="false">Not Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="flex gap-2">
          {/* CANCEL */}
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          {/* SAVE */}
          <Button
            onClick={handleSave}
            disabled={loading}
            className="min-w-[120px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
