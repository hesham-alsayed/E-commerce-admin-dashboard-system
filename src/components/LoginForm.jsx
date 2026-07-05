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

import { Mail, Lock, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/lib/utils";

export function LoginForm({ onSignUpClick }) {
  // ✅ validation
  const validateEmail = (value) => {
    if (!value) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format";

    return true;
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return true;
  };

  const [showPassword, setShowPassword] = useState(false);

  const { fetchLogin, actionLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ================= LOGIN =================
  const onSubmit = async (data) => {
    try {
      const res = await fetchLogin(data);
      if (res) {
        navigate("/admin", { replace: true });
      }
      showToast({ message: "Login successfully", type: "success" });
    } catch (error) {
      showToast({ message: error.response.data.message, type: "error" });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to sign in
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  validate: validateEmail,
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
                placeholder="Enter password"
                autoComplete={"current-password"}
                className=" pl-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                {...register("password", {
                  validate: validatePassword,
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

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <Link to={'/forgot-password'}>
              <button
                type="button"
                className="text-sm text-black hover:cursor-pointer  hover:underline"
              >
                Forgot password?
              </button>
            </Link>
          </div>

          {/* SUBMIT */}

          <Button
            disabled={actionLoading || isSubmitting}
            type={"submit"}
            className="flex items-center justify-center gap-2 w-full hover:cursor-pointer hover:opacity-80"
          >
            {actionLoading || isSubmitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUpClick}
          className="text-black hover:underline hover:cursor-pointer ml-1"
        >
          Sign up
        </button>
      </CardFooter>
    </Card>
  );
}
