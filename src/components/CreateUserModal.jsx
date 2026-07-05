import React, { useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { User, Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import { useModalBehavior } from "@/CustomHooks/useModalBehavior";

export const CreateUserModal = ({
  isOpen,
  onClose,
  onCreateUser,
  loadingCreate,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "user",
      isVerified: "false",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await onCreateUser({
        ...data,
        isVerified: data.isVerified === "true",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const { handleOverlayClick, overlayRef } = useModalBehavior(isOpen, onClose);
  const inputStyle =
    "pl-10 w-full focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <_motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 bottom-0 inset-0 bg-black/40 z-50"
            onClick={handleOverlayClick || onClose} // ✅ بدل onClose
            ref={overlayRef}
          />

          {/* Modal */}
          <_motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-125 bg-white rounded-lg border shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="py-2 px-6 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Create User</h2>
                  <p className="text-sm text-gray-500">Add new user account</p>
                </div>

                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-gray-100 transition"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 py-4 space-y-3"
              >
                {/* NAME */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        placeholder={"hisham.."}
                        className={inputStyle}
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Last Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        placeholder={"al sayed.."}
                        className={inputStyle}
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <Label>Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder={".....@gmail.com"}
                      className={inputStyle}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <Label>Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      placeholder={"password.."}
                      type={showPassword ? "text" : "password"}
                      className={`${inputStyle} pr-10`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Min 6 chars",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <Label>Confirm Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      placeholder={"password confirm.."}
                      type={showConfirmPassword ? "text" : "password"}
                      className={`${inputStyle} pr-10`}
                      {...register("passwordConfirm", {
                        required: "Confirm password is required",
                        validate: (v) =>
                          v === password || "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                  {errors.passwordConfirm && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </div>

                {/* SELECTS */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select
                      defaultValue="user"
                      onValueChange={(v) => setValue("role", v)}
                    >
                      <SelectTrigger className="w-full focus:ring-0 focus:outline-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>isVerified</Label>
                    <Select
                      defaultValue="false"
                      onValueChange={(v) => setValue("isVerified", v)}
                    >
                      <SelectTrigger className="w-full focus:ring-0 focus:outline-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Verified</SelectItem>
                        <SelectItem value="false">Unverified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting || loadingCreate}
                  >
                    {isSubmitting ? "Creating..." : "Create User"}
                  </Button>
                </div>
              </form>
            </div>
          </_motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
