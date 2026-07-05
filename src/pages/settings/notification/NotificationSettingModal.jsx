/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { X } from "lucide-react";

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// =========================
// BLACK SWITCH
// =========================
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

// =========================
// MODAL
// =========================
export function NotificationSettingModal({
  open,
  onClose,
  setting,
  onConfirm,
}) {
  // =========================
  // LOCAL CHANNEL STATE
  // =========================
  const [channels, setChannels] = useState([]);
  const [input, setInput] = useState("");
  const [channelError, setChannelError] = useState("");

  const isEdit = !!setting;

  // =========================
  // FORM
  // =========================
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      enabled: true,
    },
  });

  // =========================
  // INIT WHEN OPEN
  // =========================
  useEffect(() => {
    if (!open) return;

    reset({
      type: setting?.type || "",
      enabled: setting?.enabled ?? true,
    });

    setChannels(setting?.channel || []);
    setChannelError("");
    setInput("");
  }, [open, setting, reset]);

  // =========================
  // ADD CHANNEL
  // =========================
  const addChannel = () => {
    const v = input.trim().toLowerCase();

    if (!v) return;

    if (channels.includes(v)) return;

    setChannels((prev) => [...prev, v]);

    setInput("");
    setChannelError("");
  };

  // =========================
  // REMOVE CHANNEL
  // =========================
  const removeChannel = (ch) => {
    setChannels((prev) => prev.filter((c) => c !== ch));
  };

  // =========================
  // SUBMIT
  // =========================
  const onSubmit = (data) => {
    if (!channels || channels.length === 0) {
      setChannelError("At least one channel is required");
      return;
    }

    setChannelError("");

    // ================= CREATE =================
    if (!isEdit) {
      onConfirm({
        type: data.type.trim(),
        enabled: data.enabled,
        channel: channels,
      });
    }

    // ================= UPDATE =================
    else {
      // 🔥 TYPE NOT ALLOWED TO UPDATE
      onConfirm({
        enabled: data.enabled,
        channel: channels,
      });
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* MODAL BOX */}
      <div className="w-[520px] rounded-xl bg-white p-6 shadow-xl">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {setting ? "Edit Notification" : "Add Notification"}
          </h2>

          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TYPE */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Type</label>

            <Input
              placeholder="order_received"
              disabled={isEdit}
              {...register("type", {
                required: "Type is required",
              })}
            />

            {errors.type && (
              <p className="text-sm mt-3 text-red-500 bg-red-100 p-1 rounded-sm">
                {errors.type.message}
              </p>
            )}
          </div>

          {/* ENABLED */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium">Enabled</span>

            <Controller
              name="enabled"
              control={control}
              render={({ field }) => (
                <BlackSwitch
                  checked={field.value ?? false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </div>

          {/* CHANNELS */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Channels</label>

            {/* LIST */}
            <div className="mb-2 flex flex-wrap gap-2">
              {channels.map((ch) => (
                <button
                  type="button"
                  key={ch}
                  className="flex relative items-center gap-1 rounded-sm bg-gray-200 px-4"
                >
                  {ch}

                  <X
                    className="h-3 w-3 absolute top-0 right-0 cursor-pointer"
                    onClick={() => removeChannel(ch)}
                  />
                </button>
              ))}
            </div>

            {/* ADD */}
            <div className="flex gap-2">
              <Input
                value={input}
                placeholder="add channel"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChannel();
                  }
                }}
              />

              <Button type="button" variant="outline" onClick={addChannel}>
                Add
              </Button>
            </div>

            {channelError && (
              <p className="text-sm text-red-500 bg-red-100 p-1 mt-3 rounded-sm">
                {channelError}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">{setting ? "Save" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
