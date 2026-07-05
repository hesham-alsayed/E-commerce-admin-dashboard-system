import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentInfo({ order }) {
  const info = order.paymentInfo;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">

        <Row label="Provider" value={info?.provider} />
        <Row label="Transaction ID" value={info?.transactionId || "N/A"} />
        <Row label="PayPal Order ID" value={info?.paypalOrderId || "N/A"} />
        <Row label="Paid At" value={order.paidAt ? new Date(order.paidAt).toLocaleString() : "Not paid"} />

      </CardContent>
    </Card>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="break-all">{value}</span>
    </div>
  );
}