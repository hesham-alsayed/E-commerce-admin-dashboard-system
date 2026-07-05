"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/hooks/useAuth";
import { showToast } from "@/lib/utils";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // 🔥 مهم علشان validation يشتغل live
  });

  const [loading, setLoading] = useState(false);

  const newPassword = watch("newPassword");
  const confirmPassword = watch("passwordConfirm");

  const passwordsMatch = newPassword === confirmPassword;

  const { updateMyPassword, fetchLogout } = useAuth();

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);

      await updateMyPassword(data);
      showToast({
        message: "Password updated successfully",
        type: "success",
      });

      await fetchLogout();
      setTimeout(() => {
        window.location.replace("/auth?mode=login");
      }, 2000);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        window.location.replace("/auth?mode=login");
        return;
      }

      showToast({
        message: error?.response?.data?.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full">
      <div className="bg-white border rounded-lg p-6 space-y-6">
        <h1 className="text-lg font-semibold">Change Password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="w-full border p-2 rounded text-sm pr-10"
              />

              <button
                type="button"
                onClick={() => togglePassword("current")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.current ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.currentPassword && (
              <p className="text-red-500 text-xs">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) ||
                      "Must contain at least one uppercase letter",
                    hasSpecial: (v) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                      "Must contain at least one special character",
                  },
                })}
                className="w-full border p-2 rounded text-sm pr-10"
              />

              <button
                type="button"
                onClick={() => togglePassword("new")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.newPassword && (
              <p className="text-red-500 text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Confirm New Password
            </label>

            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                {...register("passwordConfirm", {
                  required: "Please confirm password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className="w-full border p-2 rounded text-sm pr-10"
              />

              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.confirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              disabled={
                loading || !passwordsMatch || Object.keys(errors).length > 0
              }
              type="submit"
              className={`bg-[#0f172a] flex items-center gap-4 text-white px-5 py-2 rounded-md transition
                ${
                  loading || !passwordsMatch || Object.keys(errors).length > 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90"
                }
              `}
            >
              Update Password
              {loading && <LoaderSpinnerButton />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
