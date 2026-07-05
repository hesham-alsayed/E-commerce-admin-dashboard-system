"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion as _motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

export default function CollectionForm({
  isOpen,
  onClose,
  onSubmit,
  editingCollection,
  loading = false,
}) {
  const { overlayRef, handleOverlayClick } = useModalBehavior(isOpen, onClose);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "active",
      discount: {
        type: "percentage",
        value: 0,
        isActive: false,
        startDate: "",
        endDate: "",
      },
    },
  });

  const statusValue = watch("status");

  // ✅ FIX: watch nested fields separately (IMPORTANT)
  const discountIsActive = watch("discount.isActive");
  const discountType = watch("discount.type");

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };
  // ================= RESET FIX =================
  React.useEffect(() => {
    if (!isOpen) return;

    if (editingCollection) {
      reset({
        name: editingCollection.name || "",
        description: editingCollection.description || "",
        status: editingCollection.status || "active",
        discount: {
          type: editingCollection.discount?.type || "percentage",
          value: editingCollection.discount?.value || 0,
          isActive: editingCollection.discount?.isActive || false,
          startDate: formatDate(editingCollection?.discount?.startDate),
          endDate: formatDate(editingCollection?.discount?.endDate),
        },
      });
    } else {
      reset({
        name: "",
        description: "",
        status: "active",
        discount: {
          type: "percentage",
          value: 0,
          isActive: false,
          startDate: "",
          endDate: "",
        },
      });
    }
  }, [editingCollection, isOpen, reset]);

  const submit = (data) => {
    onSubmit(editingCollection ? { ...data, id: editingCollection._id } : data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <_motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        >
          <_motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-xl rounded-2xl shadow-xl max-h-[90vh] h-full flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-3 border-b">
              <h2 className="text-lg font-semibold">
                {editingCollection ? "Edit Collection" : "Create Collection"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(submit)}
              className="py-2 px-4 space-y-1"
            >
              {/* NAME */}
              <div className="space-y-1">
                <Label className="text-[15px] font-semibold text-gray-800">
                  Name:
                </Label>
                <Input
                  placeholder="Collection name"
                  {...register("name", { required: true })}
                  className="w-full border border-gray-100 focus:border-gray-400"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-1">
                <Label className="text-[15px] font-semibold text-gray-800">
                  Description:
                </Label>
                <Textarea
                  placeholder="Write description..."
                  {...register("description")}
                  className="w-full h-16 border border-gray-100 focus:border-gray-400 resize-none"
                />
              </div>

              {/* STATUS */}
              <div className="space-y-1">
                <Label className="text-[15px] font-semibold text-gray-800">
                  Status:
                </Label>
                <Select
                  value={statusValue}
                  onValueChange={(val) =>
                    setValue("status", val, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full border-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
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
                  {editingCollection ? "Save Changes" : "Create"}
                </Button>
              </div>
            </form>
          </_motion.div>
        </_motion.div>
      )}
    </AnimatePresence>
  );
}
