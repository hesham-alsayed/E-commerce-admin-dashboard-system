/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, AlertTriangle } from "lucide-react";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemTitle,
  isLoadingDelete,
  loadingData,
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const disabled = isLoadingDelete || loadingData;

  // ================= RESET WHEN OPEN =================
  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setError("");
    }
  }, [isOpen, itemTitle]);

  // ================= CLOSE =================
  const handleClose = () => {
    setInputValue("");
    setError("");
    onClose();
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) {
      setError("Please type the title to confirm.");
      return;
    }

    if (inputValue !== itemTitle) {
      setError("The title does not match.");
      return;
    }

    setError("");
    onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl bg-white">
        {/* ================= HEADER ================= */}
        <div className="relative p-5 border-b">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-50 border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {title || "Delete Item"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* CONFIRM TEXT */}
          <div className="text-sm text-gray-600">
            Type{" "}
            <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
              {itemTitle}
            </span>{" "}
            to confirm deletion.
          </div>

          {/* INPUT */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
            placeholder="Type here..."
            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* ================= FOOTER ================= */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={disabled}
              className="rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="rounded-xl bg-red-600 text-white hover:bg-red-700 px-5"
              disabled={disabled || !inputValue || inputValue !== itemTitle}
            >
              {isLoadingDelete ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
