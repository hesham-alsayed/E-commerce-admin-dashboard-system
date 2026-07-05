"use client";

import { Plus, Settings, Power, FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const TITLES = {
  general: "General Settings",
  notifications: "Notifications Settings",
};

export function SettingsHeader({
  type,
  settings,
  onAddNew,
  onToggleGlobal,
  onUpdateSetting,
}) {
  const title = TITLES[type] || "Settings";
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="mb-6 border-border">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
            </div>

            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="mt-1">
                {settings?.description}
              </CardDescription>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-3 justify-end">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4">
              <Power className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm font-medium text-muted-foreground">
                Global
              </span>

              <BlackSwitch
                checked={!!settings?.enabled}
                onChange={(e) => onToggleGlobal(e.target.checked)}
              />
            </div>

            <Button
              variant="outline"
              className="hover:bg-black hover:text-white hover:cursor-pointer transition-colors"
              onClick={onUpdateSetting}
            >
              <FilePenLine className="h-4 w-4" />
              Update Settings
            </Button>

            <Button
              className="hover:opacity-80 hover:cursor-pointer"
              onClick={onAddNew}
            >
              <Plus className="h-4 w-4" />
              Add new Value
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">{settings?.value?.length || 0}</span>{" "}
            items
          </div>

          <div className="hidden h-4 w-px bg-border sm:block" />
          <span
            className={` px-3  rounded-2xl ${settings?.enabled ? `bg-black text-white` : "bg-gray-200 text-black"}`}
          >
            {settings.enabled ? "active" : "inactive"}
          </span>
          <div>
            Last updated:{" "}
            <span className="font-medium">
              {settings?.updatedAt ? formatDate(settings?.updatedAt) : "-"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
