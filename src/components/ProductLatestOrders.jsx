export default function ProductLatestOrders({
  orders,
}) {
  return (
    <div className="p-4 rounded-xl border bg-white">
      <h3 className="font-semibold mb-3">
        Latest Orders
      </h3>

      <div className="space-y-2">
        {orders.map((o) => (
          <div
            key={o._id}
            className="text-sm border p-2 rounded"
          >
            <p className="font-medium">
              #{o.orderNumber}
            </p>

            <p className="text-gray-500">
              ${o.totalPrice} • {o.orderStatus}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}