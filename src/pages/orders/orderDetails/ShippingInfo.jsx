import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
function getStatusStyle(status) {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "shipped":
      return "bg-purple-100 text-purple-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
export default function ShippingInfo({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Info</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <Row label="Zone" value={order.shipping?.zoneName} />
        <Row label="City" value={order.shipping?.city} />
        <Row label="Price" value={`$${order.shipping?.price}`} />
        <Row
          label="Estimated Days"
          value={`${order.shipping?.estimatedDays} days`}
        />

        {/* STATUS BADGE */}
        <div className="pt-2 mt-10 border-t flex justify-between items-center">
          <span className="text-gray-500">Order Status</span>

          <Badge className={getStatusStyle(order.orderStatus)}>
            {order.orderStatus}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="capitalize">{value}</span>
    </div>
  );
}
