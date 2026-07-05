"use client";

import { Pencil, Trash2, MoreHorizontal, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatSettingType(type) {
  if (!type || typeof type !== "string") return "-";

  return type
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

export function SettingsTable({
  type = "general",
  settings,
  globalEnabled,
  onEdit,
  onDelete,
}) {
  const isNotification = type === "notifications";

  const isEmpty = !settings || settings.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isNotification ? "Notifications" : "Settings"} Configuration
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Setting</TableHead>
                <TableHead>Status</TableHead>

                {isNotification && <TableHead>Channels</TableHead>}
                {!isNotification && <TableHead>Value</TableHead>}

                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* ================= EMPTY STATE ================= */}
              {isEmpty ? (
                <TableRow>
                  <TableCell
                    colSpan={isNotification ? 4 : 3}
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border bg-muted/40 shadow-sm">
                        <Inbox className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <p className="text-base font-semibold text-foreground">
                        No settings found
                      </p>

                      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                        There are no configuration items yet. Create a new
                        setting to start customizing system behavior.
                      </p>

                      <Button
                        variant="secondary"
                        className="mt-5"
                        onClick={() => onEdit?.(null)}
                      >
                        Add new setting
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                /* ================= DATA ================= */
                settings.map((setting, index) => (
                  <TableRow
                    key={setting?._id || index}
                    className={!globalEnabled ? "opacity-50" : ""}
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {formatSettingType(setting?.type)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {setting?.type}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={setting?.enabled ? "default" : "secondary"}
                      >
                        {setting?.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </TableCell>

                    {isNotification && (
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {setting?.channel?.map((ch) => (
                            <Badge key={ch} variant="outline">
                              {ch}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    )}

                    {!isNotification && (
                      <TableCell>
                        {setting?.value !== undefined ? (
                          <Badge variant="outline">{setting?.value}</Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    )}

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-40 p-2" align="end">
                          <DropdownMenuItem onClick={() => onEdit(setting)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => onDelete(setting)}
                            className="text-red-500"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
