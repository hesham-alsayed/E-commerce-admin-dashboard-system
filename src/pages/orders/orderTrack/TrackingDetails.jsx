import { Truck, Package, CheckCircle, Clock } from "lucide-react";

export default function TrackingDetails({ orderData }) {
  // 🔥 real tracking from DB
  const tracking = orderData?.tracking || [];

  // 🔥 current status from DB (SOURCE OF TRUTH)
  const currentStatus = orderData?.orderStatus;

  // 🔥 fixed flow (important)
  const statusFlow = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  // 🔥 detect current index correctly
  const currentIndex = statusFlow.indexOf(currentStatus);

  const getIcon = (status) => {
    switch (status) {
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

  const steps = statusFlow.map((statusKey, index) => {
    const trackItem = tracking.find((t) => t.status === statusKey);

    let statusType = "new";

    if (index < currentIndex) statusType = "completed";
    if (index === currentIndex) statusType = "current";

    return {
      title: statusKey,
      note: trackItem?.note || "No update yet",
      date: trackItem?.date,
      icon: getIcon(statusKey),
      statusType,
    };
  });

  const currentStep = steps[currentIndex] || steps[0];

  return (
    <div className="max-w-3xl mx-auto p-3 sm:p-4 md:p-6 space-y-6">
      {/* TOP CARD */}
      <div className="rounded-2xl border p-4 sm:p-6 shadow-sm bg-white">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6">
          {/* LEFT */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl
              ${
                currentStatus === "delivered"
                  ? "bg-green-100"
                  : currentStatus === "cancelled"
                    ? "bg-red-100"
                    : "bg-indigo-100"
              }`}
            >
              <Truck className="text-gray-700" size={22} />
            </div>

            <div>
              <p className="text-[10px] sm:text-xs text-gray-500">
                CURRENT STATUS
              </p>

              <h2 className="text-base sm:text-lg md:text-xl font-semibold capitalize">
                {currentStep?.title}
              </h2>

              {/* STATUS LABEL */}
              <span
                className={`text-xs mt-1 inline-block px-2 py-1 rounded-full
                ${
                  currentIndex === statusFlow.length - 1
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {currentIndex === statusFlow.length - 1
                  ? "Final Status"
                  : "In Progress"}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
            <div>
              <p className="text-[10px]">Estimated Delivery</p>
              <p className="font-medium text-black">
                {orderData?.shipping?.estimatedDays
                  ? `${orderData.shipping.estimatedDays} days`
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[10px]">Order ID</p>
              <p className="font-medium text-black">
                #{orderData?.orderNumber}
              </p>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-800 transition-all duration-500"
            style={{
              width:
                currentIndex <= 0
                  ? "10%"
                  : `${(currentIndex / (statusFlow.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* LABELS */}
        <div className="flex justify-between text-[10px] sm:text-xs mt-2 text-gray-400">
          {statusFlow.map((t, i) => (
            <span
              key={i}
              className={i === currentIndex ? "text-black font-semibold" : ""}
            >
              {t.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="rounded-2xl border p-4 sm:p-6 bg-white">
        <h3 className="font-semibold mb-6 text-sm sm:text-base">
          Tracking History
        </h3>

        <div className="relative">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="flex gap-3 sm:gap-4 mb-8 relative">
                {/* LINE */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-4 sm:left-5 top-10 w-[2px] h-full bg-gray-200" />
                )}

                {/* ICON */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border
                  ${
                    step.statusType === "completed"
                      ? "bg-gray-800 text-white"
                      : step.statusType === "current"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon size={16} />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <p className="font-medium text-sm sm:text-base capitalize">
                      {step.title}
                    </p>

                    <span className="text-[10px] sm:text-xs text-gray-400">
                      {step.date
                        ? new Date(step.date).toLocaleString()
                        : "Pending"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500">
                    {step.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
