"use client";

import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/OTPInput";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/hooks/useAuth";
import { showToast } from "@/lib/utils";

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchVerifyEmailCode, fetchResendEmailCode } = useAuth();
  const email = searchParams.get("email");

  // ✅ VERIFY API
  const verifyOtp = async (otpValue) => {
    if (isVerifying) return; //  avoid duplicate requests
    try {
      setIsVerifying(true);
      setError("");
      const res = await fetchVerifyEmailCode(email, otpValue);
      console.log(res);

      if (res?.status === 200 || res.statusText === "ok") {
        setIsVerified(true);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid code");
    } finally {
      setIsVerifying(false);
    }
  };

  // ✅ WHEN OTP COMPLETE
  const handleOTPComplete = (otp) => {
    setCode(otp);
    verifyOtp(otp); // function call direct
  };

  // when click submit
  const handleVerify = () => {
    if (!code || code.length < 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    verifyOtp(code);
  };

  // ✅ RESEND API
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    try {
      setIsResending(true);

      await fetchResendEmailCode(email);
      setResendCooldown(60);

      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      showToast({ message: error.response.data.message, type: "error" });
    } finally {
      setIsResending(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (isVerified) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-3">
            Email Verified
          </h1>
          <p className="text-muted-foreground mb-8">
            Your email has been successfully verified. You can now continue to
            your account.
          </p>
          <Button
            className="w-full h-12 text-base font-medium"
            onClick={() => navigate("/auth/?mode=login")}
          >
            Continue to Login
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back */}
        <button
          onClick={() => navigate("/auth/?mode=login")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm">Back to login</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-3">
            Verify your email
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {"We've sent a 6-digit verification code to"}
          </p>
          <p className="font-medium text-foreground mt-1">{email}</p>
        </div>

        {/* OTP */}
        <div className="mb-8">
          <OTPInput
            length={6}
            onComplete={handleOTPComplete}
            disabled={isVerifying}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 text-center mt-2">{error}</p>
        )}

        {/* VERIFY BUTTON */}
        <Button
          onClick={handleVerify}
          className="w-full h-12 text-base bg-black font-medium mb-6"
          disabled={isVerifying}
        >
          {isVerifying ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Verifying...
            </span>
          ) : (
            "Verify Email"
          )}
        </Button>

        {/* RESEND */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {"Didn't receive the code?"}
          </p>
          <button
            onClick={handleResendCode}
            disabled={isResending || resendCooldown > 0}
            className=" hover:cursor-pointer hover:underline text-sm font-medium text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Sending...
              </span>
            ) : resendCooldown > 0 ? (
              `Resend code in ${resendCooldown}s`
            ) : (
              "Resend verification code"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            {
              "If you don't see the email, check your spam folder. The code will expire in 10 minutes."
            }
          </p>
        </div>
      </div>
    </main>
  );
}
