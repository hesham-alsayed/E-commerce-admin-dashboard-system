const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

function StatusBadge({ status }) {
  const style =
    statusStyles[status?.toLowerCase()] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${style}`}
    >
      {status}
    </span>
  );
}

export default function RecentProductOrders({ orders }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <h3 className="font-semibold mb-3">Recent Orders</h3>

      <div className="space-y-2">
        {orders.map((o) => (
          <div
            key={o._id}
            className="flex justify-between items-center text-sm border-b py-2"
          >
            <span className="font-medium">{o.orderNumber}</span>

            <span className="text-gray-700">${o.totalPrice}</span>

            <StatusBadge status={o.orderStatus} />
          </div>
        ))}
      </div>
    </div>
  );
}
