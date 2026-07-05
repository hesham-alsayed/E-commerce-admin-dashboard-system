"use client";

import { Pencil, Trash2, MoreHorizontal, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BlackSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#000",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#000",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#d4d4d4",
  },
}));

export function ShippingZonesTable({
  zones = [],
  onEditZone,
  onDeleteZone,
  onEditCity,
  onDeleteCity,
  onToggleZone,
}) {
  console.log(zones);

  return (
    <Card className="shadow-sm border-none">
      <CardHeader>
        <CardTitle>Shipping Zones</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {zones?.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            No zones found
          </div>
        )}

        {zones?.map((zone) => {
          // ✅ SAFE cities fallback (FIX MAIN BUG)
          const cities = Array.isArray(zone?.cities) ? zone.cities : [];
          console.log(cities);

          return (
            <div
              key={zone._id}
              className="rounded-xl border bg-white overflow-hidden"
            >
              {/* ================= ZONE HEADER ================= */}
              <div className="flex items-center justify-between p-4 bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{zone?.name}</span>

                  <Badge variant={zone?.isActive ? "default" : "secondary"}>
                    {zone?.isActive ? "Active" : "Inactive"}
                  </Badge>

                  {/* COUNTS */}
                  <span className="text-xs text-muted-foreground">
                    {cities.length} cities
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* SWITCH */}
                  <div className="flex items-center gap-2">
                    <Power className="h-4 w-4 text-muted-foreground" />
                    <BlackSwitch
                      checked={!!zone?.isActive}
                      onChange={(e) => onToggleZone?.(zone, e.target.checked)}
                    />
                  </div>

                  {/* MENU */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditZone?.(zone)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Zone
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onDeleteZone?.(zone)}
                        className="text-red-500"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Zone
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* ================= CITIES ================= */}
              <div className="divide-y">
                {cities.length === 0 ? (
                  <div className="px-6 py-3 text-sm text-muted-foreground">
                    No cities in this zone
                  </div>
                ) : (
                  cities.map((city) => (
                    <div
                      key={city._id}
                      className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition"
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-4 pl-4 border-l-2 border-gray-200">
                        <span className="font-medium text-sm">{city.city}</span>

                        <Badge variant="outline" className="text-xs">
                          {city.isActive ? "Active" : "Inactive"}
                        </Badge>

                        {/* PRICE */}
                        <span className="text-xs bg-black text-white px-2 py-0.5 rounded-md">
                          {city.price || 0} EGP
                        </span>

                        {/* DAYS */}
                        <span className="text-xs text-muted-foreground">
                          {city.estimatedDays || "-"} days
                        </span>
                      </div>

                      {/* ACTIONS */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onEditCity?.(city, zone)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit City
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => onDeleteCity?.(city, zone)}
                            className="text-red-500"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete City
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
