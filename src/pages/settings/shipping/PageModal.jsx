/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PageModal({
  open,
  onClose,
  onSubmit,
  mode = "create",
  initialData = null,
  loading = false,
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("draft");
  const [errors, setErrors] = useState({});

  // ================= RESET / INIT =================
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setSlug(initialData.slug || "");
      setStatus(initialData.status?.toLowerCase() || "draft");
    } else {
      setTitle("");
      setSlug("");
      setStatus("draft");
    }

    setErrors({});
  }, [open, initialData, mode]);

  // ================= AUTO SLUG (CREATE ONLY) =================
  useEffect(() => {
    if (mode !== "create") return;

    const generatedSlug =
      "/" +
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    setSlug(generatedSlug);
  }, [title, mode]);

  // ================= VALIDATION =================
  const validate = () => {
    const err = {};

    if (!title.trim()) err.title = "Title is required";
    if (!slug.trim()) err.slug = "Slug is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!validate()) return;

    await onSubmit({
      title: title.trim(),
      slug: slug.trim(),
      status: status.toLowerCase(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && !v && onClose()}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Page" : "Update Page"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* TITLE */}
          <div className="space-y-2">
            <Label>Page Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Home Page"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* SLUG */}
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="/home"
            />
            {errors.slug && (
              <p className="text-xs text-red-500">{errors.slug}</p>
            )}
          </div>

          {/* STATUS */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
