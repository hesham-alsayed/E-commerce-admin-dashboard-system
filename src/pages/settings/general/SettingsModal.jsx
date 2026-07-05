/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

// 🔥 BLACK SWITCH STYLE
const BlackSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#000",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#000",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#ccc",
  },
}));

export function SettingDialog({ open, onOpenChange, setting, onConfirm }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      enabled: false,
      value: "",
    },
  });

  // ================= LOCAL LOADING + ERROR =================
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isEdit = !!setting;

  // ================= RESET WHEN OPEN =================
  useEffect(() => {
    if (!open) return;

    setSubmitError("");

    reset(
      setting
        ? {
            type: setting.type,
            enabled: setting.enabled,
            value: setting.value ?? "",
          }
        : {
            type: "",
            enabled: false,
            value: "",
          },
    );
  }, [setting, open, reset]);

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    setSubmitError("");
    setLoading(true);

    try {
      // 🔥 CREATE
      if (!isEdit) {
        await onConfirm({
          type: data.type.trim(),
          enabled: data.enabled,
          channel: ["system"],
          value:
            data.value !== "" && data.value !== undefined
              ? Number(data.value)
              : undefined,
        });
      }

      // 🔥 UPDATE
      else {
        await onConfirm({
          enabled: data.enabled,
          channel: ["system"],
        });
      }
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || err?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {setting ? "Edit Setting" : "Add New Setting"}
          </DialogTitle>

          <DialogDescription>Create or update system setting</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="py-4 space-y-4">
            {/* TYPE */}
            <Field>
              <FieldLabel>Type</FieldLabel>

              <Input
                placeholder="allowLogin"
                disabled={loading || isEdit}
                {...register("type", {
                  required: "Type is required",
                })}
              />

              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </Field>

            {/* SWITCH */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Enabled</FieldLabel>

                <Controller
                  name="enabled"
                  control={control}
                  render={({ field }) => (
                    <BlackSwitch
                      checked={field.value}
                      disabled={loading}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </Field>

            {/* VALUE */}
            <Field>
              <FieldLabel>Value (Number)</FieldLabel>

              <Input
                type="number"
                placeholder="e.g. 10"
                disabled={loading || isEdit}
                {...register("value")}
              />
            </Field>

            {/* GLOBAL ERROR */}
            {submitError && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {submitError}
              </div>
            )}
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading
                ? setting
                  ? "Saving..."
                  : "Creating..."
                : setting
                  ? "Save Changes"
                  : "Add Setting"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
