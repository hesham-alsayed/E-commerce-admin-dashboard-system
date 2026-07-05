"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import { showToast } from "@/lib/utils";
import LoaderSpinnerButton from "./LoaderSpinnerButton";
import { useNavigate } from "react-router-dom";

export function SignupForm({ onLoginClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { loading, fetchSignUp } = useAuth();
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
      acceptTerms: false,
    },
  });

  const password = watch("password");

  const submitHandler = async (userData) => {
    try {
      const res = await fetchSignUp(userData);
      console.log(res);
      showToast({ message: "signUp successfully", type: "success" });
      const email = res.data.user.email;
      navigate(`/auth/verify-email/?email=${email}`);
    } catch (error) {
      console.log(error);
      showToast({ message: error.response.data.message, type: "error" });
    }
  };

  return (
    <div className="w-full -mt-5 max-w-md   rounded-md py-4">
      <div>
        <p className="text-2xl font-bold text-center">Create an account</p>
        <CardDescription className="text-center">
          Enter your information to get started
        </CardDescription>
      </div>

      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium">First Name</label>

            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <Input
                placeholder="John Doe"
                className="pl-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                {...register("firstName", {
                  required: "firstName is required",
                  minLength: {
                    value: 2,
                    message: "firstName must be at least 2 characters",
                  },
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
            <label className="text-sm font-medium">Last Name</label>

            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <Input
                placeholder="Mohamed.."
                className="pl-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                {...register("lastName", {
                  required: "lastName is required",
                  minLength: {
                    value: 2,
                    message: "lastName must be at least 2 characters",
                  },
                })}
              />
            </div>

            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <Input
                type="email"
                placeholder="name@example.com"
                autoComplete={"email"}
                className="pl-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
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
            <label className="text-sm font-medium">Password</label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                autoComplete={"new-password"}
                className="pl-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Min 8 characters",
                  },
                  validate: (value) => {
                    const hasUpper = /[A-Z]/.test(value);
                    const hasLower = /[a-z]/.test(value);
                    const hasNumber = /\d/.test(value);

                    if (!hasUpper || !hasLower || !hasNumber) {
                      return "Must contain upper, lower, number";
                    }
                    return true;
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
            <label className="text-sm font-medium">Confirm Password</label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                autoComplete={"confirm-new-password"}
                className="pl-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                {...register("passwordConfirm", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* TERMS */}
          <div className="flex items-center gap-2">
            <Checkbox onCheckedChange={(val) => setValue("acceptTerms", val)} />
            <span className="text-sm">I accept terms and conditions</span>
          </div>

          {errors.acceptTerms && (
            <p className="text-red-500 text-xs">You must accept terms</p>
          )}

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full flex gap-4"
            disabled={isSubmitting || loading}
          >
            Create Account
            {loading || (isSubmitting && <LoaderSpinnerButton />)}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-center mt-2 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLoginClick}
          className="text-black hover:cursor-pointer  ml-1"
        >
          Sign in
        </button>
      </CardFooter>
    </div>
  );
}
