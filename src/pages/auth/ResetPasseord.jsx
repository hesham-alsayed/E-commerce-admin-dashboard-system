"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";
import { KeyRound, CheckCircle, XCircle } from "lucide-react";
import { resetPassword } from "@/components/ِApi/authApi";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState(false);

  // 🔥 NEW STATE
  const [isExpired, setIsExpired] = useState(false);

  // PASSWORD RULES
  const hasMinLength = password?.length >= 8;
  const hasUpperLower =
    /[a-z]/.test(password || "") && /[A-Z]/.test(password || "");
  const hasNumberOrSymbol =
    /[0-9]/.test(password || "") || /[^A-Za-z]/.test(password || "");

  const allValid = hasMinLength && hasUpperLower && hasNumberOrSymbol;

  // MATCH CHECK
  useEffect(() => {
    if (!passwordConfirm) return setMatch(false);
    setMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  // SUBMIT
  const onSubmit = async (data) => {
    if (!allValid || !match) return;

    setLoading(true);
    setSuccess(false);

    try {
      await resetPassword(token, data.password, data.passwordConfirm);

      setSuccess(true);

      setTimeout(() => {
        navigate("/auth?mode=login");
      }, 2000);
    } catch (err) {
      const message = err?.response?.data?.message;

      // 🚨 TOKEN EXPIRED HANDLING
      if (
        err?.response?.status === 401 ||
        message?.toLowerCase().includes("expired") ||
        message?.toLowerCase().includes("invalid")
      ) {
        setIsExpired(true);
        return;
      }

      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const RuleItem = ({ ok, text }) => (
    <div className="flex items-center gap-2 text-xs">
      {ok ? (
        <CheckCircle size={14} className="text-green-500" />
      ) : (
        <XCircle size={14} className="text-gray-400" />
      )}
      <p className={ok ? "text-green-600" : "text-gray-500"}>{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* ❌ EXPIRED STATE UI */}
      {isExpired ? (
        <div className="w-full max-w-md bg-white border border-red-200 rounded-2xl shadow-sm p-6 space-y-4 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <XCircle />
          </div>

          <h1 className="text-sm font-bold text-red-600">Link Expired</h1>

          <p className="text-sm text-gray-600">
            This reset password link is no longer valid. Please request a new
            one.
          </p>

          <button
            onClick={() => navigate("/forgot-password")}
            className="w-full bg-red-600 text-white py-2.5 rounded-lg text-sm hover:bg-red-700"
          >
            Request New Link
          </button>
        </div>
      ) : (
        /* NORMAL UI */
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-6 space-y-6">
          {/* HEADER */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                <KeyRound size={18} />
              </div>
            </div>

            <h1 className="text-xl font-bold text-gray-800">
              Create New Password
            </h1>

            <p className="text-sm text-gray-500">
              Secure your account with a strong password
            </p>
          </div>

          {/* RULES */}
          <div className="bg-gray-50 border rounded-xl p-3 space-y-2">
            <p className="text-xs font-semibold text-gray-600 mb-1">
              Password requirements:
            </p>

            <RuleItem ok={hasMinLength} text="At least 8 characters" />
            <RuleItem ok={hasUpperLower} text="Uppercase & lowercase letters" />
            <RuleItem
              ok={hasNumberOrSymbol}
              text="Number or special character"
            />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              {...register("passwordConfirm", {
                required: "Confirm your password",
              })}
            />

            {/* MATCH */}
            {passwordConfirm && (
              <div className="flex items-center gap-2 text-xs">
                {match ? (
                  <>
                    <CheckCircle size={14} className="text-green-500" />
                    <p className="text-green-600">Passwords match</p>
                  </>
                ) : (
                  <>
                    <XCircle size={14} className="text-red-500" />
                    <p className="text-red-500">Passwords do not match</p>
                  </>
                )}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || !allValid || !match}
              className="w-full bg-black text-white py-2.5 rounded-lg text-sm flex items-center justify-center hover:bg-gray-800 transition disabled:opacity-60"
            >
              {loading ? <LoaderSpinnerButton /> : "Reset Password"}
            </button>
          </form>

          {/* SUCCESS */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg text-center">
              ✔ Password updated successfully. Redirecting...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
