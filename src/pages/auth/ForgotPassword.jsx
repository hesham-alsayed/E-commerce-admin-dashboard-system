"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";
import { Mail, ShieldCheck, KeyRound } from "lucide-react";

// ✅ API
import { forgotPassword } from "@/components/ِApi/authApi";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ⏱️ TIMER STATE
  const [timer, setTimer] = useState(0);

  // ⭐ store email for resend
  const [email, setEmail] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // ⭐ save email
      setEmail(data.email);

      // 🔥 REAL API CALL
      await forgotPassword(data.email);

      setSuccess(true);

      // ⏱️ start cooldown (60s)
      setTimer(60);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ⏱️ countdown logic
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔁 resend (FIXED)
  const handleResend = async () => {
    if (!email || timer > 0) return;

    setLoading(true);

    try {
      await forgotPassword(email);

      setTimer(60);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-6 space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
              <KeyRound size={18} />
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-800">
            Reset Your Password
          </h1>

          <p className="text-sm text-gray-500">
            We’ll send you a secure link to reset your password
          </p>
        </div>

        {/* STEPS */}
        <div className="bg-gray-50 border rounded-xl p-3 space-y-2 text-xs text-gray-600">
          <p className="flex items-center gap-2">
            <Mail size={14} /> 1. Enter your email address
          </p>
          <p className="flex items-center gap-2">
            <ShieldCheck size={14} /> 2. We verify your account
          </p>
          <p className="flex items-center gap-2">
            <KeyRound size={14} /> 3. You receive reset link
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-black/10 transition"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}

          <button
            type="submit"
            disabled={loading || timer > 0}
            className="w-full bg-black text-white py-2.5 rounded-lg text-sm flex items-center justify-center hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? (
              <LoaderSpinnerButton />
            ) : timer > 0 ? (
              `Wait ${timer}s`
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* SUCCESS + RESEND UI */}
        {success && (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg text-center">
              ✔ Reset link has been sent. Check your email inbox or spam folder.
            </div>

            {/* RESEND SECTION */}
            <div className="text-center">
              {timer > 0 ? (
                <p className="text-xs text-gray-500">
                  You can resend in{" "}
                  <span className="font-semibold">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-sm text-black underline hover:text-gray-700"
                >
                  Resend Email
                </button>
              )}
            </div>
          </div>
        )}

        {/* SECURITY NOTE */}
        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          For security reasons, reset links expire after 10 minutes. If you
          don’t receive an email, try again or contact support.
        </p>
      </div>
    </div>
  );
}
