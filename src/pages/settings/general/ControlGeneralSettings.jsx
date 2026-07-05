"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Switch from "@mui/material/Switch";
import PageInfo from "@/components/PageInfo";
import { useSettings } from "@/components/hooks/useSettings";
import { showToast } from "@/lib/utils";
import { updateSettingValue } from "@/components/ِApi/settingsApi";
import SettingsSkeleton from "@/components/SettingsSkelton";

export default function ControlGeneralSettings() {
  const [settings, setSettings] = useState(null);
  const [original, setOriginal] = useState("");
  const [loading, setLoading] = useState(false);

  const { fetchSettingByKey } = useSettings();

  /* ================= FETCH ================= */

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await fetchSettingByKey("general_settings");
      const setting = res.data.setting;
      console.log(setting);

      setSettings(setting);
      setOriginal(JSON.stringify(setting.value)); // we compare by value array not all object setting
    } catch {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSettings();
  }, []);

  /* ================= HELPERS ================= */

  const hasChanges = settings && JSON.stringify(settings.value) !== original;

  /* ================= UPDATE ================= */
  const updateSetting = (key, newData) => {
    setSettings((prev) => ({
      ...prev,
      value: prev.value.map((item) =>
        item.type === key ? { ...item, ...newData } : item,
      ),
    }));
  };

  /* ================= SAVE ================= */
  const handleSaveChange = async () => {
    try {
      console.log(settings.key, settings.value);
      const data = await updateSettingValue(settings.key, settings.value);
      console.log(data);
      setOriginal(JSON.stringify(settings.value));
      showToast({ message: "settings updated success", type: "success" });
    } catch (error) {
      console.log(error);
      showToast({ message: error.response.data.message, type: "error" });
    }
  };

  console.log(settings?.value);

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
          <PageInfo head="General Settings" title="Manage and Control General system settings" />
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>

          <Button onClick={handleSaveChange} disabled={!hasChanges || loading}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3  gap-4">
        {settings.value.map((item) => (
          <Card key={item._id} className="shadow-sm">
            <CardContent className="flex justify-between items-center p-4">
              <Label className="capitalize">{item.type}</Label>

              {typeof item.value === "number" ? (
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    className="w-24"
                    disabled={!item.enabled}
                    value={item.value || 0}
                    onChange={(e) =>
                      updateSetting(item.type, {
                        value: Number(e.target.value),
                      })
                    }
                  />

                  <Switch
                    checked={item.enabled}
                    onChange={(e) =>
                      updateSetting(item.type, {
                        enabled: e.target.checked,
                      })
                    }
                  />
                </div>
              ) : (
                <Switch
                  checked={item.enabled}
                  onChange={(e) =>
                    updateSetting(item.type, {
                      enabled: e.target.checked,
                    })
                  }
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
