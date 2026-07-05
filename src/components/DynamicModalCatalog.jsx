"use client";

import { AnimatePresence, motion as _motion } from "framer-motion";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import LoaderSpinnerButton from "./LoaderSpinnerButton";

export default function DynamicModalCatalog({
  isOpen,
  onClose,
  initialData,
  title = "Create Item",
  fields = [],
  onSubmit: handleFormSubmit,
  isLoading,
}) {
  const { overlayRef, handleOverlayClick } = useModalBehavior(isOpen, onClose);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onSubmit",
  });

  // ================= RESET (CREATE + EDIT SAFE) =================
  useEffect(() => {
    if (isOpen) {
      const defaults = {};

      fields.forEach((f) => {
        const value = initialData?.[f.name] ?? f.default ?? "";

        defaults[f.name] = value;
      });

      reset(defaults);
    }
  }, [isOpen, initialData, fields, reset]);

  // ================= GET LABEL FOR SELECT =================
  const getSelectedLabel = (field) => {
    const value = watch(field.name);

    const found = field.options?.find((opt) => opt.value === value);

    return found?.label || field.defaultLabel || "Select...";
  };

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    await handleFormSubmit(data);
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <_motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <_motion.div
            key={initialData?._id || "create"}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white backdrop-blur-xl max-h-screen w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200"
          >
            {/* HEADER */}
            <div className="sticky top-0 px-4 py-2 border-b border-gray-100 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-black bg-clip-text">
                  {initialData ? `Edit ${title}` : `Create ${title}`}
                </h2>

                <button
                  onClick={onClose}
                  className="px-2 py-1 hover:bg-gray-100 hover:cursor-pointer rounded-xl transition-all hover:scale-110"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="py-2 px-4 space-y-1"
            >
              {fields.map((f) => (
                <div key={f.name} className="space-y-1">
                  <Label
                    htmlFor={f.name}
                    className="text-[15px] font-semibold text-gray-800"
                  >
                    {f.label}:
                  </Label>

                  {/* TEXT */}
                  {f.type === "text" && (
                    <input
                      id={f.name}
                      placeholder={f.placeholder || ""}
                      className="w-full border p-2 rounded-sm border-gray-100 focus:outline-none focus:border-gray-400"
                      {...register(f.name, f.validation)}
                    />
                  )}

                  {/* TEXTAREA */}
                  {f.type === "textarea" && (
                    <textarea
                      id={f.name}
                      placeholder={f.placeholder || ""}
                      className="w-full h-16 border p-2 rounded-sm border-gray-100 focus:outline-none focus:border-gray-400 resize-none"
                      {...register(f.name, f.validation)}
                    />
                  )}

                  {/* SELECT */}
                  {f.type === "select" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full flex items-center justify-between text-sm font-medium border-gray-200 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          <span className="capitalize mr-2">
                            {getSelectedLabel(f)}
                          </span>
                          <IoIosArrowDown />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-white max-h-75 rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none">
                        {f.options.map((opt, index) => (
                          <DropdownMenuItem
                            key={`${opt.value}-${index}`}
                            onClick={() =>
                              setValue(f.name, opt.value, {
                                shouldValidate: true,
                                shouldDirty: true,
                                shouldTouch: true,
                              })
                            }
                            className="flex capitalize p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all"
                          >
                            {opt.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  {/* ERROR */}
                  {errors[f.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[f.name].message}
                    </p>
                  )}
                </div>
              ))}

              {/* BUTTONS */}
              <div className="flex w-full gap-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 border border-gray-100 px-4 py-2 rounded-sm hover:opacity-80 hover:cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-4 bg-black text-white px-4 py-2 rounded-sm hover:opacity-80 hover:cursor-pointer"
                >
                  {isLoading && <LoaderSpinnerButton />}
                  {!isLoading && "Save"}
                </button>
              </div>
            </form>
          </_motion.div>
        </_motion.div>
      )}
    </AnimatePresence>
  );
}
