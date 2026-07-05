import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerInfo({ order }) {
  const shipping = order.shippingAddress;
  const billing = order.billingAddress;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* USER BASIC INFO */}
        <div>
          <p className="font-medium">
            {order.user?.firstName} {order.user?.lastName}
          </p>
          <p className="text-gray-500">{order.contactEmail}</p>
          <p className="text-gray-500">{order.user?.phoneNumber}</p>
        </div>

        {/* SHIPPING */}
        <div>
          <p className="font-medium">Shipping Address</p>
          <p className="text-gray-500">
            {shipping.street} <br />
            {shipping.city}, {shipping.country}
          </p>
        </div>

        {/* BILLING */}
        {!order.billingSameAsShipping && billing && (
          <div>
            <p className="font-medium">Billing Address</p>
            <p className="text-gray-500">
              {billing.street} <br />
              {billing.city}, {billing.country}
            </p>
          </div>
        )}

        {/* PAYMENT METHOD */}
        <div>
          <p className="font-medium">Payment Method</p>
          <p className="text-gray-500 capitalize">{order.paymentMethod}</p>
        </div>

        {/* PAYMENT STATUS */}
        <div>
          <p className="font-medium">Payment Status</p>
          <p className="text-gray-500 capitalize">{order.paymentStatus}</p>
        </div>
      </CardContent>
    </Card>
  );
}
