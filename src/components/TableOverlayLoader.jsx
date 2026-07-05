"use client";

export default function TableOverlayLoader() {
  return (
    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
      <div className="w-7 h-7 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  );
}