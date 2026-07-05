"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Save, RefreshCw } from "lucide-react";
import Switch from "@mui/material/Switch";
import PageInfo from "@/components/PageInfo";

import { useShipping } from "@/components/hooks/useShipping";
import { showToast } from "@/lib/utils";

export default function ShippingZonesSettings() {
  const { zones, setZones, saveZones, saving } = useShipping();

  const [original, setOriginal] =
    useState(null); /* ================= STORE ORIGINAL ================= */
  useEffect(() => {
    const checkOriginal = () => {
      if (zones.length && !original) {
        setOriginal(JSON.stringify(zones));
      }
    };
    checkOriginal();
  }, [zones, original]);

  /* ================= CHANGE DETECTION ================= */
  const hasChanges = useMemo(() => {
    if (!original) return false;
    return JSON.stringify(zones) !== original;
  }, [
    zones,
    original,
  ]); /* ================= TOGGLE (LOCAL ONLY) ================= */
  const toggleZone = (id, value) => {
    setZones((prev) =>
      prev.map((z) => (z._id === id ? { ...z, isActive: value } : z)),
    );
  };
  /* ================= SAVE ALL (PROVIDER) ================= */
  const handleSave = async () => {
    try {
      {
        const data = await saveZones();
        setOriginal(JSON.stringify(data.zones));
        showToast({
          message: "Saved successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      showToast({ message: error.response.data.message, type: "error" });
    }
  };

  /* ================= RESET ================= */
  const handleReset = () => {
    if (original) {
      setZones(JSON.parse(original));
    }
  };

  return (
    <div className="p-6 space-y-6 container mx-auto">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <PageInfo
            head="Shipping Zones"
            title="Control shipping zones activation and pricing"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>

          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save"}
          </Button>

          {hasChanges && (
            <Badge className="bg-red-500 animate-pulse">Unsaved</Badge>
          )}
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map((zone) => (
          <Card
            key={zone._id}
            className={`border-0 shadow-sm rounded-xl bg-white ${
              !zone.isActive ? "opacity-60" : ""
            }`}
          >
            <CardContent className="p-4 space-y-4">
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base font-semibold">{zone.name}</Label>
                  <p className="text-xs text-muted-foreground">
                    Shipping zone control
                  </p>
                </div>

                {/* TOGGLE SINGLE ZONE */}
                <Switch
                  checked={zone.isActive}
                  onChange={(e) => toggleZone(zone._id, e.target.checked)}
                />
              </div>

              {/* STATUS */}
              <Badge className={zone.isActive ? "bg-green-500" : "bg-gray-400"}>
                {zone.isActive ? "Active" : "Disabled"}
              </Badge>

              {/* CITIES */}
              <div className="text-sm space-y-1">
                {zone.cities.map((c, idx) => (
                  <div key={idx} className="flex justify-between border-t pt-1">
                    <span>{c.city}</span>
                    <span>{c.price} EGP</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
