"use client";

import { AnimatePresence, motion as _motion } from "framer-motion";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { IoIosArrowDown } from "react-icons/io";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";

export default function CategoryForm({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
  collections = [],
  loading = false,
}) {
  const { overlayRef, handleOverlayClick } = useModalBehavior(isOpen, onClose);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      collection: "",
      name: "",
      status: "active",
      description: "",
      discount: {
        type: "percentage",
        value: 0,
        isActive: false,
        startDate: "",
        endDate: "",
      },
    },
  });

  // ================= WATCH =================
  const collectionValue = watch("collection");
  const statusValue = watch("status");

  const discountIsActive = watch("discount.isActive");
  const discountType = watch("discount.type");

  // ================= SELECTED COLLECTION =================
  const selectedCollection = collections.find(
    (c) => String(c._id) === String(collectionValue),
  );

  // ================= DATE FIX =================
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // ================= RESET =================
  useEffect(() => {
    if (!isOpen) return;

    const data = editingCategory;

    reset({
      collection: data?.collection?._id ? String(data.collection._id) : "",
      name: data?.name || "",
      status: data?.status || "active",
      description: data?.description || "",
      discount: {
        type: data?.discount?.type || "percentage",
        value: data?.discount?.value || 0,
        isActive: !!data?.discount?.isActive,
        startDate: formatDate(data?.discount?.startDate),
        endDate: formatDate(data?.discount?.endDate),
      },
    });
  }, [isOpen, editingCategory, reset]);

  // ================= SUBMIT =================
  const submit = (data) => {
    onSubmit(editingCategory ? { ...data, id: editingCategory._id } : data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <_motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <_motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-h-screen w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200"
          >
            {/* HEADER */}
            <div className="sticky top-0 px-4 py-2 border-b">
              <div className="flex justify-between">
                <h2 className="text-[18px] font-bold">
                  {editingCategory ? "Edit Category" : "Create Category"}
                </h2>

                <button onClick={onClose}>✕</button>
              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(submit)}
              className="py-2 px-4 space-y-2"
            >
              {/* COLLECTION */}
              <div className="space-y-1">
                <Label>Collection:</Label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex justify-between"
                    >
                      {selectedCollection?.name || "Select collection..."}

                      <IoIosArrowDown />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-white p-2 border">
                    {collections.map((c) => (
                      <DropdownMenuItem
                        key={c._id}
                        onClick={() => setValue("collection", String(c._id))}
                      >
                        {c.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* NAME */}
              <div className="space-y-1">
                <Label>Name:</Label>

                <input
                  className="w-full border p-2 rounded-sm border-gray-100"
                  {...register("name")}
                />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-1">
                <Label>Description:</Label>

                <textarea
                  className="w-full h-16 border p-2 rounded-sm border-gray-100"
                  {...register("description")}
                />
              </div>

              {/* STATUS */}
              <div className="space-y-1">
                <Label>Status:</Label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between"
                    >
                      {statusValue}
                      <IoIosArrowDown />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-white p-2 border">
                    <DropdownMenuItem
                      onClick={() => setValue("status", "active")}
                    >
                      Active
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setValue("status", "draft")}
                    >
                      Draft
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* DISCOUNT */}
              <div className="border rounded-sm p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={discountIsActive}
                    onCheckedChange={(val) =>
                      setValue("discount.isActive", val)
                    }
                  />

                  <Label>Enable Discount</Label>
                </div>

                <_motion.div
                  initial={false}
                  animate={{
                    height: discountIsActive ? "auto" : 0,
                    opacity: discountIsActive ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {/* TYPE */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex justify-between"
                        >
                          {discountType}

                          <IoIosArrowDown />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-white p-2 border">
                        <DropdownMenuItem
                          onClick={() =>
                            setValue("discount.type", "percentage")
                          }
                        >
                          Percentage
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setValue("discount.type", "fixed")}
                        >
                          Fixed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* VALUE */}
                    <Input type="number" {...register("discount.value")} />

                    {/* START */}
                    <Input type="date" {...register("discount.startDate")} />

                    {/* END */}
                    <Input type="date" {...register("discount.endDate")} />
                  </div>
                </_motion.div>
              </div>

              {/* BUTTONS */}
              <div className="flex w-full gap-2 mt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-black border border-gray-100 hover:opacity-80"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-black text-white hover:opacity-80"
                >
                  {loading && <LoaderSpinnerButton />}

                  {editingCategory ? "Save Changes" : "Create"}
                </Button>
              </div>
            </form>
          </_motion.div>
        </_motion.div>
      )}
    </AnimatePresence>
  );
}
