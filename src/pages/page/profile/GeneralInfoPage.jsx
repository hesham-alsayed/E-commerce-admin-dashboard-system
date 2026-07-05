"use client";

import { useAuth } from "@/components/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { showToast } from "@/lib/utils";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";
import { useUsers } from "@/components/hooks/useUsers";

export default function GeneralInfoPage() {
  const { user: admin } = useAuth(); 
  const {handleUpdateMe} = useUsers()
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (admin) {
      reset({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        phone: admin.phone,
      });
    }
  }, [admin, reset]);

  const onSubmit = async (formData) => {
    try {
      console.log(formData);
      setLoading(true);
      await handleUpdateMe(formData);
      showToast({ message: "updated success", type: "success" });
    } catch (error) {
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      showToast({ message: error?.response?.data?.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white p-6 rounded-lg border space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base">Personal Information</h2>

          <button
            type="submit"
            disabled={loading}
            className="bg-black flex items-center gap-3 hover:cursor-pointer hover:opacity-80 text-white px-4 py-2 rounded text-sm ml-auto block transition"
          >
            Save Changes {loading && <LoaderSpinnerButton />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-xs">First Name</label>
            <input
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 3,
                  message: "Min 3 characters",
                },
              })}
              className="border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-xs">Last Name</label>
            <input
              {...register("lastName", {
                required: "Last name is required",
              })}
              className="border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-gray-600 text-xs">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              className="border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-gray-600 text-xs">Phone</label>
            <input
              {...register("phone", {
                required: "Phone is required",
              })}
              className="border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
