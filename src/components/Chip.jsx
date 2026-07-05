import { Copy, Check } from "lucide-react";

export function Chip({ label, value, onCopy, copied }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100 border text-xs text-gray-600 hover:bg-gray-200 transition">
      
      <span className="font-medium">{label}:</span>

      <span className="text-gray-700">{value || "N/A"}</span>

      <button
        type="button"
        onClick={onCopy}
        className="ml-1 hover:scale-110 transition cursor-pointer"
      >
        {copied ? (
          <Check size={14} className="text-green-600" />
        ) : (
          <Copy size={14} className="text-gray-500" />
        )}
      </button>

    </div>
  );
}