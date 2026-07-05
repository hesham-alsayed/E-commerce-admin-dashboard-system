import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSummary({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <Row label="Items Total" value={`$${order.itemsPrice}`} />

        {order.discountAmount > 0 && (
          <Row label="Discount" value={`- $${order.discountAmount}`} />
        )}

        <Row label="Shipping Fee" value={`$${order.shippingPrice}`} />

        <Row label="Coupon" value={order.coupon ? "Applied" : "None"} />

        <div className="border-t pt-2 flex justify-between font-bold text-lg">
          <span className="text-gray-800">Total</span>
          <span className="text-gray-800">
            ${order.totalPriceAfterDiscount}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}
