export function CouponProgressBar({ used, limit }) {
  const percent = limit ? (used / limit) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span>{used} used</span>
        <span>{limit ? `${limit} limit` : "∞ limit"}</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
}

