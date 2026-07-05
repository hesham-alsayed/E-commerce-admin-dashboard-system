export default function PartnerCouponCard({
  code,
  discount,
  type,
  minPurchase,
  validity,
  usage,
  maxUsage,
  status,
}) {
  const statusColor = {
    Valid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Expired: "bg-red-100 text-red-700",
    Disabled: "bg-gray-200 text-gray-600",
    "Limit Reached": "bg-orange-100 text-orange-700",
  };

  const safeUsage = usage || 0;
  const safeMax = maxUsage || 0;

  const progress = safeMax > 0 ? Math.min((safeUsage / safeMax) * 100, 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">
          {code}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusColor[status] || "bg-gray-100 text-gray-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* DISCOUNT */}
      <div>
        <h3 className="text-2xl font-bold">{discount}</h3>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {type}
        </p>
      </div>

      {/* DETAILS */}
      <div className="flex justify-between text-sm text-gray-500">
        <div>
          <p>Min Purchase</p>
          <p className="text-black">{minPurchase ?? "None"}</p>
        </div>

        <div>
          <p>Validity</p>
          <p className="text-black">{validity}</p>
        </div>
      </div>

      {/* USAGE */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Usage</span>
          <span>
            {safeUsage} {safeMax ? `/ ${safeMax}` : "/ ∞"}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>

  );
}
