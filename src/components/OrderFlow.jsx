import { Clock, Package, Truck, CheckCircle } from "lucide-react";

const ORDER_FLOW = ["pending", "processing", "shipped", "delivered"];

const getStepIndex = (status) => ORDER_FLOW.indexOf(status);

const getIcon = (step) => {
  switch (step) {
    case "pending":
      return Clock;
    case "processing":
      return Package;
    case "shipped":
      return Truck;
    case "delivered":
      return CheckCircle;
    default:
      return Clock;
  }
};

export default function OrderFlow({ order }) {
  // ================= NORMALIZE STATUS =================
  const currentRaw = order?.orderStatus?.toLowerCase();

  const normalizedCurrent =
    ORDER_FLOW.includes(currentRaw) && currentRaw ? currentRaw : "pending";

  const currentIndex = getStepIndex(normalizedCurrent);

  // ================= PROGRESS =================
  const progress =
    normalizedCurrent === "cancelled"
      ? 100
      : currentIndex === 0
        ? 20 // 🔥 FIX: pending visible progress
        : (currentIndex / (ORDER_FLOW.length - 1)) * 100;

  // ================= NEXT STEP =================
  const nextStep =
    currentIndex >= ORDER_FLOW.length - 1 ? null : ORDER_FLOW[currentIndex + 1];

  return (
    <div className="space-y-3">
      {/* ================= PROGRESS ================= */}
      <div>
        <div className="flex justify-between text-sm mb-2 text-gray-600">
          <span className="font-medium">Order Progress</span>
          <span className="text-gray-500">{Math.round(progress)}%</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gray-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ================= STEPPER ================= */}
      <div className="flex justify-between items-center text-xs">
        {ORDER_FLOW.map((step, index) => {
          const Icon = getIcon(step);

          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <Icon
                size={18}
                className={`
                  transition-all
                  ${
                    isDone
                      ? "text-gray-500"
                      : isCurrent
                        ? "text-gray-700"
                        : "text-gray-300"
                  }
                `}
              />

              <span
                className={`mt-1 capitalize ${
                  isCurrent ? "text-gray-700 font-medium" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* ================= CURRENT / NEXT ================= */}
      <div className="text-sm space-y-1 border-t pt-4 text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Current:</span>{" "}
          {normalizedCurrent}
        </p>

        <p>
          <span className="font-medium text-gray-700">Next:</span>{" "}
          {nextStep || "Completed"}
        </p>
      </div>

      {/* ================= TRACKING HISTORY ================= */}
      <div className="border-t pt-4 space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Tracking History</h4>

        {order?.tracking?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {order.tracking.map((t, i) => (
              <div key={i} className="flex gap-3">
                {/* LINE + DOT */}
                <div className="relative flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />

                  {i !== order.tracking.length - 1 && (
                    <div className="w-px h-full bg-gray-300 mt-1" />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 capitalize">
                    {t.status}
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.note || "No note"}
                  </p>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {t.date ? new Date(t.date).toLocaleString() : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xs">No tracking history</p>
        )}
      </div>
    </div>
  );
}
