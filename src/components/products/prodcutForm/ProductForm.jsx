"use client";

import React, { useEffect } from "react";

import { Plus } from "lucide-react";

import VariantCard from "./VariantCard";

import FormInput from "@/components/FormInput";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { validateVariants } from "@/lib/validation/variantValidation";
import { TYPE_OPTIONS } from "@/lib/productOptions";

export default function ProductForm({
  form,
  onSubmit,

  variants,
  variantHandlers,

  variantError,
  setVariantError,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
    setValue,
  } = form;

  // ================= WATCH =================
  const gender = watch("gender") || "men";

  const type = watch("type") || "";

  const availableTypes = TYPE_OPTIONS?.[gender] || [];

  useEffect(() => {
    setValue("gender", gender);
    setValue("type", type);
  }, [gender, type, setValue]);
  // ================= SUBMIT =================
  const submitHandler = async (data) => {
    const error = validateVariants(variants);
    if (error) {
      setVariantError(error);
      return;
    }

    setVariantError(null);

    const payload = {
      ...data,

      variants,
    };

    onSubmit(payload);
  };

  return (
    <form id="create-product-form" onSubmit={handleSubmit(submitHandler)}>
      <section className="flex flex-col space-y-4">
        {/* ================= TITLE ================= */}
        <FormInput
          label="title"
          name="title"
          register={register}
          errors={errors}
          placeholder="Enter product title"
          rules={{
            required: "Title is required",

            minLength: {
              value: 6,
              message: "Title must be at least 6 characters",
            },
          }}
        />

        {/* ================= DESCRIPTION ================= */}
        <div className="flex flex-col gap-2">
          <span className="text-[16px] capitalize">Description</span>

          <textarea
            placeholder="Product description"
            {...register("description", {
              required: "Description is required",
            })}
            className="h-24 w-full resize-none rounded border border-gray-200 p-3 focus:border-gray-400 focus:outline-none"
          />

          {errors.description && (
            <span className="text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* ================= OTHER INFO ================= */}
        <div className="flex items-center gap-3">
          <FormInput
            label="brand"
            name="brand"
            register={register}
            errors={errors}
            placeholder="Enter brand name"
            rules={{
              required: "Brand is required",

              minLength: {
                value: 3,
                message: "Brand must be at least 3 characters",
              },
            }}
          />

          <FormInput
            label="material"
            name="material"
            register={register}
            errors={errors}
            placeholder="Product material"
            rules={{
              minLength: {
                value: 3,
                message: "Material must be at least 3 characters",
              },
            }}
          />

          <FormInput
            label="price"
            name="price"
            type="number"
            register={register}
            errors={errors}
            placeholder="Enter price"
            rules={{
              required: "Price is required",

              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* GENDER */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>

            <Select
              value={gender}
              onValueChange={(value) => {
                setValue("gender", value);

                // reset type
                setValue("type", "");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="men">Men</SelectItem>

                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* TYPE */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>

            <Select
              value={type}
              onValueChange={(value) => setValue("type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                {availableTypes.map((item) => (
                  <SelectItem key={item} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* ================= VARIANTS ================= */}
        <div className="flex flex-col gap-4">
          {variants.map((variant, vIndex) => (
            <VariantCard
              key={vIndex}
              variant={{
                ...variant,
                sizes: variant.sizes || [],
                images: variant.images || [],
              }}
              vIndex={vIndex}
              handlers={variantHandlers}
              productGender={gender}
              productType={type}
            />
          ))}

          {variantError && (
            <span className="rounded bg-red-50 p-2 text-xs text-red-500">
              {variantError}
            </span>
          )}
        </div>

        {/* ================= ADD VARIANT ================= */}
        <Button
          type="button"
          className="max-w-44"
          onClick={variantHandlers.handleAddVariant}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </section>
    </form>
  );
}
