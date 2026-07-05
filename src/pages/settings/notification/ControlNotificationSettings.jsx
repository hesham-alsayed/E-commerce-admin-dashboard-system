"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Save, RefreshCw } from "lucide-react";
import Switch from "@mui/material/Switch";

import PageInfo from "@/components/PageInfo";
import SettingsSkeleton from "@/components/SettingsSkelton";

import { useSettings } from "@/components/hooks/useSettings";
import { updateSettingValue } from "@/components/ِApi/settingsApi";
import { showToast } from "@/lib/utils";

export default function ControlNotificationSettings() {
  const [settings, setSettings] = useState(null);
  const [original, setOriginal] = useState("");
  const [loading, setLoading] = useState(false);

  const { fetchSettingByKey } = useSettings();

  /* ================= FETCH ================= */
  const loadSettings = async () => {
    try {
      setLoading(true);

      const res = await fetchSettingByKey("notifications_settings");

      const setting = res.data.setting;

      setSettings(setting);
      setOriginal(JSON.stringify(setting.value));
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Failed to load",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  /* ================= HELPERS ================= */
  const hasChanges = settings && JSON.stringify(settings.value) !== original;

  const toggleEnabled = (type, value) => {
    setSettings((prev) => ({
      ...prev,
      value: prev.value.map((item) =>
        item.type === type ? { ...item, enabled: value } : item,
      ),
    }));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      setLoading(true);

      await updateSettingValue(settings.key, settings.value);

      setOriginal(JSON.stringify(settings.value));

      showToast({
        message: "Settings updated successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Save failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET ================= */
  const handleReset = () => {
    loadSettings();
  };

  if (!settings) return <SettingsSkeleton />;

  return (
    <div className="p-6 space-y-6 container mx-auto">
      {/* HEADER */}
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-center">
        <div>
          <PageInfo
            head="Notification Settings"
            title="Enable or disable system notifications"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges || loading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>

          <Button onClick={handleSave} disabled={!hasChanges || loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save"}
          </Button>

          {hasChanges && (
            <Badge className="bg-red-500 text-white animate-pulse">
              Unsaved
            </Badge>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {settings.value.map((item) => (
          <Card key={item._id} className="rounded-xl border shadow-sm">
            <CardContent className="p-5 space-y-4">
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <div>
                  {/* NO CONFIG → REAL TYPE */}
                  <Label className="font-semibold text-sm">{item.type}</Label>

                  <div className="text-xs text-muted-foreground">
                    Notification event
                  </div>
                </div>

                <Switch
                  checked={item.enabled}
                  onChange={(e) => toggleEnabled(item.type, e.target.checked)}
                />
              </div>

              {/* CHANNELS (READ ONLY) */}
              <div className="flex flex-wrap gap-2">
                {item.channel?.map((ch) => (
                  <span
                    key={ch}
                    className="px-2 py-1 text-xs rounded-md bg-gray-100 border"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
