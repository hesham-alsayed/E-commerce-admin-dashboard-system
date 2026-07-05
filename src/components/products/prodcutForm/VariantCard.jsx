"use client";

import { Plus, Trash2, Upload, X } from "lucide-react";
import namer from "color-namer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { SIZE_OPTIONS } from "@/lib/productOptions";

export default function VariantCard({
  variant,
  vIndex,
  handlers,
  productGender,
  productType,
}) {
  const {
    handleVariantChange,
    handleRemoveVariant,
    handleImageUpload,
    handleRemoveImage,
    handleSizeChange,
    handleRemoveSize,
    handleAddSize,
  } = handlers;

  // ================= SAFE VALUES =================
  const gender = productGender?.toLowerCase() || "men";
  const type = productType?.toLowerCase() || "";

  // ================= NORMALIZE AVAILABLE SIZES =================
  const availableSizes = (SIZE_OPTIONS?.[gender]?.[type] || []).map((s) =>
    String(s).toUpperCase(),
  );

  // ================= SAFE IMAGES =================
  const images = Array.isArray(variant?.images) ? variant.images : [];

  // ================= SAFE + NORMALIZED SIZES =================
  const sizes = (variant?.sizes || []).map((s) => {
    if (typeof s === "string") {
      return {
        size: String(s).toUpperCase(),
        stock: 0,
      };
    }

    return {
      size: String(s?.size ?? "").toUpperCase(),
      stock: Number(s?.stock ?? 0),
    };
  });

  // ================= COLOR =================
  const handleColorChange = (e) => {
    const colorCode = e.target.value;
    const colorName = namer(colorCode).basic?.[0]?.name || "";

    handleVariantChange(vIndex, "color", colorName);
    handleVariantChange(vIndex, "colorCode", colorCode);
  };

  return (
    <div className="space-y-4 rounded-xl border bg-white p-4 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Variant #{vIndex + 1}</h3>

          <p className="text-sm text-muted-foreground capitalize">
            {gender} / {type}
          </p>
        </div>

        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={() => handleRemoveVariant(vIndex)}
        >
          <X size={16} />
        </Button>
      </div>

      {/* COLOR */}
      <div className="flex items-center gap-3">
        <Input
          value={variant?.color || ""}
          onChange={(e) => handleVariantChange(vIndex, "color", e.target.value)}
          placeholder="Color name"
        />

        <Input
          type="color"
          value={variant?.colorCode || "#000000"}
          onChange={handleColorChange}
          className="h-11 w-14 cursor-pointer p-1"
        />
      </div>

      {/* IMAGES */}
      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div
            key={`${vIndex}-img-${i}`}
            className="group relative h-24 w-24 overflow-hidden rounded-lg border"
          >
            <img
              src={img?.preview || img?.url}
              className="h-full w-full object-cover"
              alt=""
            />

            <Button
              type="button"
              size="icon"
              className="absolute left-8 top-8 bg-red-600 opacity-0 group-hover:opacity-100"
              onClick={() => handleRemoveImage(vIndex, i)}
            >
              <X size={14} />
            </Button>
          </div>
        ))}
      </div>

      {/* UPLOAD */}
      <label className="flex cursor-pointer items-center justify-between rounded-lg border border-dashed p-3">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Upload Images</span>
        </div>

        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length) handleImageUpload(vIndex, files);
          }}
        />
      </label>

      {/* ADD SIZE */}
      <Button
        type="button"
        variant="outline"
        disabled={!productType}
        onClick={() => handleAddSize(vIndex)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Size
      </Button>

      {/* SIZE LIST */}
      {sizes.map((row, index) => {
        const selectedSizes = sizes
          .filter((_, i) => i !== index)
          .map((s) => String(s.size).toUpperCase());

        const filteredSizes = availableSizes.filter((size) => {
          const s = String(size).toUpperCase();
          const isUsed = selectedSizes.includes(s);
          const isCurrent = s === String(row.size);

          return !isUsed || isCurrent;
        });

        return (
          <div
            key={`${vIndex}-${index}-${row.size}`}
            className="flex items-center gap-2 rounded-lg bg-gray-50 p-2"
          >
            {/* SIZE SELECT (FIXED CASE SAFE) */}
            <Select
              value={String(row.size || "").toUpperCase()}
              onValueChange={(value) =>
                handleSizeChange(vIndex, index, "size", value.toUpperCase())
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>

              <SelectContent>
                {filteredSizes.map((size) => (
                  <SelectItem key={size} value={String(size).toUpperCase()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* STOCK */}
            <Input
              type="number"
              min={0}
              value={row.stock ?? 0}
              onChange={(e) =>
                handleSizeChange(vIndex, index, "stock", Number(e.target.value))
              }
              className="w-24"
            />

            {/* DELETE */}
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveSize(vIndex, index)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
