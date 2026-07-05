"use client";

export default function AuthLoader({
  title = "Checking your session...",
  subtitle = "Please wait while we verify your account",
}) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner Ring */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        {/* Skeleton UI */}
        <div className="w-64 space-y-3 mt-4">
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
