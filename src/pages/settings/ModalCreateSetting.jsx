/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function ModalCreateSetting({
  open,
  onClose,
  onCreate,
  initialData = null,
}) {
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const isUpdate = !!initialData;

  // =========================
  // RESET WHEN OPEN OR DATA CHANGE
  // =========================
  useEffect(() => {
    if (open) {
      setKey(initialData?.key ?? "");
      setDescription(initialData?.description ?? "");
      setLoading(false);
    }
  }, [open, initialData]);

  // =========================
  // CLOSE HANDLER
  // =========================
  const handleClose = () => {
    if (loading) return;
    setKey("");
    setDescription("");
    setLoading(false);
    onClose();
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    if (!key.trim() || loading) return;

    try {
      setLoading(true);

      await onCreate({
        key: key.trim(),
        description: description.trim(),
      });

      setKey("");
      setDescription("");

      // مهم: نخلي القفل بعد انتهاء render cycle
      setTimeout(() => {
        onClose();
      }, 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Update Setting" : "Create Setting"}
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="space-y-4">
          {/* KEY */}
          <div className="space-y-4">
            <label className="text-sm font-medium mb-3">Setting Key</label>

            <Input
              placeholder="e.g. notifications_settings"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={loading}
              className="mt-3"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Description</label>

            <Input
              placeholder="Add description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="mt-3"
            />
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={loading || !key.trim()}>
            {loading
              ? isUpdate
                ? "Updating..."
                : "Creating..."
              : isUpdate
                ? "Update"
                : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
