"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoleCardStats({ title, description, count, Icon }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>

        {/* ICON WRAPPER */}
        {Icon && (
          <div className="p-2 rounded-full bg-blue-100">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
        )}
      </CardHeader>

      <CardContent>
        {description && (
          <p className="text-sm text-gray-500 mb-2">{description}</p>
        )}

        <div className="text-3xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}
