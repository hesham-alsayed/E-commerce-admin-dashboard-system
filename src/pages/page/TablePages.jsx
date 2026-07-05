"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Pencil,
  Trash2,
  Search,
  Factory,
  View,
  Edit,
  Eye,
  Building,
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GrNew } from "react-icons/gr";

export default function TablePages({ pages = [], setEditPage, setIsOpen }) {
  const [search, setSearch] = useState("");

  const filteredPages = pages.filter(
    (page) =>
      page.title?.toLowerCase().includes(search.toLowerCase()) ||
      page.slug?.toLowerCase().includes(search.toLowerCase()),
  );
  const navigate = useNavigate();
  const statusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-700 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border p-4">
      {/* 🔍 Search */}
      <div className="relative mb-4 max-w-md">
        <Search className="absolute top-2 left-2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search pages by title or slug..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr className="text-left">
              <th className="py-3 px-2">Page Title</th>
              <th className="py-3 px-2">Slug</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Sections</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPages.map((page) => (
              <tr
                key={page._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Title */}
                <td className="py-4 px-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{page.title}</span>
                </td>

                {/* Slug */}
                <td className="py-4 px-2 text-gray-600">{page.slug}</td>
                {/* Status */}
                <td className="py-4 px-2">
                  <Badge className={statusStyle(page.status)}>
                    {page.status}
                  </Badge>
                </td>

                {/* Sections */}
                <td className="py-4 px-2 text-gray-600">
                  {page.sections?.length || 0} blocks
                </td>

                {/* Actions */}
                <td className="py-4 px-2">
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() =>
                        navigate(`/admin/pages/${page._id}/builder`)
                      }
                      className="hover:cursor-pointer"
                      variant="ghost"
                      size="icon"
                    >
                      <Building className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => navigate(`/admin/pages/${page._id}/view`)}
                      className={"hover:cursor-pointer "}
                      variant="ghost"
                      size="icon"
                    >
                      <Eye className="w-4 h-4 " />
                    </Button>
                    <Button
                      className={"hover:cursor-pointer "}
                      variant="ghost"
                      size="icon"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 hover:cursor-pointer" />
                    </Button>
                    <Button
                      onClick={() => {
                        setEditPage({ ...page }); // clone to force update
                        setIsOpen(true);
                      }}
                      variant="ghost"
                      size="icon"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredPages.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No pages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
