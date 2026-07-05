import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Receipt, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { statusStyle } from "@/lib/utils";

export default function InvoicePaymentSummary({ order }) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* PAYMENT */}
        <div className="space-y-3">
          <p className="font-semibold flex items-center gap-2 text-gray-800">
            <CreditCard size={16} className="text-gray-500" />
            Payment Details
          </p>

          <div className="text-gray-600 space-y-1">
            <p>
              <span className="text-gray-500">Method:</span>{" "}
              <span className="font-medium text-gray-800 capitalize">
                {order?.paymentMethod}
              </span>
            </p>

            <p>
              <span className="text-gray-500">Transaction:</span>{" "}
              <span className="font-mono text-gray-700 break-all">
                {order?.paymentInfo?.transactionId || "N/A"}
              </span>
            </p>
          </div>

          <Badge
            className={`${statusStyle(order?.paymentStatus)} px-3 py-1 rounded-md`}
          >
            {order?.paymentStatus}
          </Badge>
        </div>

        {/* SUMMARY */}
        <div className="space-y-3">
          <p className="font-semibold flex items-center gap-2 text-gray-800">
            <Receipt size={16} className="text-gray-500" />
            Order Summary
          </p>

          <div className="space-y-2 text-gray-600">
            <Row label="Subtotal" value={`$${order?.itemsPrice}`} />
            <Row label="Shipping" value={`$${order?.shippingPrice}`} />

            <Row label="Discount" value={`- $${order?.discountAmount}`} muted />

            <div className="border-t pt-2 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span className="flex items-center gap-1">
                <DollarSign size={14} />
                {order?.totalPriceAfterDiscount}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* SMALL CLEAN ROW */
function Row({ label, value, muted }) {
  return (
    <div className="flex justify-between">
      <span className={`text-gray-500 ${muted ? "opacity-70" : ""}`}>
        {label}
      </span>
      <span className="text-gray-700 font-medium">{value}</span>
    </div>
  );
}
