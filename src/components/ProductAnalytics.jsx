export default function ProductAnalytics({
  analytics,
  variantAnalytics,
}) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h3 className="font-semibold mb-3">
        Analytics
      </h3>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <p>Sold</p>
          <p className="font-bold">
            {analytics.totalSold}
          </p>
        </div>

        <div>
          <p>Orders</p>
          <p className="font-bold">
            {analytics.totalOrders}
          </p>
        </div>

        <div>
          <p>Revenue</p>
          <p className="font-bold">
            ${analytics.totalRevenue}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {variantAnalytics.map((v, i) => (
          <div
            key={i}
            className="border p-2 rounded text-sm"
          >
            <p className="font-medium capitalize">
              {v.color}
            </p>
            <p>
              Sold: {v.totalSold} | $
              {v.totalRevenue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}