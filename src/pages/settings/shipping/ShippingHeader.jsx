"use client";

import { Plus, MapPin, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const BlackSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#000",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#000",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#cfcfcf",
  },
}));

export function ShippingHeader({
  zones = [],
  onAddCity,
  onToggleAllZones,
  onCreateZone,
}) {
  // ================= STATS =================
  const totalZones = zones.length;
  const totalCities = zones.reduce(
    (acc, z) => acc + (z.cities?.length || 0),
    0,
  );

  const activeZones = zones.filter((z) => z.isActive).length;

  const allActive = zones.length > 0 && activeZones === zones.length;

  return (
    <Card className="mb-6 border-border">
      <CardHeader className="pb-4">
        {/* HEADER TOP */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>

            <div>
              <CardTitle className="text-xl">Shipping System</CardTitle>

              <p className="text-sm text-gray-500 mt-1">
                Manage all shipping zones, cities and delivery pricing.
              </p>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            {/* GLOBAL TOGGLE */}
            <div className="flex items-center gap-2 border rounded-lg px-3 py-1 bg-muted/50">
              <Power className="h-4 w-4 text-muted-foreground" />

              <BlackSwitch
                checked={zones.some((z) => z.isActive)}
                onChange={(e) => onToggleAllZones(e.target.checked)}
              />
            </div>

            {/* ACTIONS */}
            <Button onClick={onAddCity} className="gap-2">
              <Plus className="h-4 w-4" />
              Add City
            </Button>

            <Button onClick={onCreateZone} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Zone
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* STATS */}
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold text-black">{totalZones}</span> zones
          </div>

          <div>
            <span className="font-semibold text-black">{totalCities}</span>{" "}
            cities
          </div>

          <div>
            <span className="font-semibold text-black">{activeZones}</span>{" "}
            active zones
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs ${
              allActive ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
          >
            {allActive ? "All Active" : "Partial Active"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
