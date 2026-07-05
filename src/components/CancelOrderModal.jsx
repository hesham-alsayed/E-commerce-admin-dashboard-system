/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export function CancelOrderModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  orderId,
  orderNumber,
  isLoading,
  loadingData,
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const disabled = isLoading || loadingData;

  // ================= RESET WHEN OPEN =================
  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setError("");
    }
  }, [isOpen]);

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
      setError("Please type the order ID to confirm.");
      return;
    }

    if (inputValue.trim() !== String(orderId).trim()) {
      setError("Order ID does not match.");
      return;
    }

    setError("");

    onConfirm({
      note: `Order #${orderNumber} cancelled by admin`,
    });
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
                {title || "Cancel Order"}
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
          <div className="text-sm text-gray-600 leading-6">
            Type this order ID to confirm cancellation:
          </div>

          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium break-all">
            {orderId}
          </div>

          {/* INPUT */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError("");
            }}
            disabled={disabled}
            placeholder="Enter order ID..."
            className="w-full border rounded-xl px-4 py-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-red-500"
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
            {/* CLOSE */}
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={disabled}
              className="rounded-xl"
            >
              Close
            </Button>

            {/* SUBMIT */}
            <Button
              type="submit"
              className="rounded-xl bg-red-600 text-white hover:bg-red-700 px-5"
              disabled={
                disabled ||
                !inputValue ||
                inputValue.trim() !== String(orderId).trim()
              }
            >
              {isLoading ? "Cancelling..." : "Cancel Order"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
