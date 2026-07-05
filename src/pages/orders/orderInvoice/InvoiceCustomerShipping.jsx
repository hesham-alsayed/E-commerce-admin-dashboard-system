import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin, Truck } from "lucide-react";

export default function InvoiceCustomerShipping({ order }) {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

        {/* CUSTOMER */}
        <div>
          <p className="font-bold flex items-center gap-2 mb-2">
            <User size={16} /> Customer
          </p>

          <p>{order?.user?.firstName} {order?.user?.lastName}</p>
          <p className="text-gray-500">{order?.contactEmail}</p>
          <p className="text-gray-500">{order?.user?.phoneNumber}</p>

          <div className="mt-3">
            <p className="font-semibold flex items-center gap-2">
              <MapPin size={16} /> Billing
            </p>
            <p>{order?.billingAddress?.street}</p>
            <p>{order?.billingAddress?.city}</p>
          </div>
        </div>

        {/* SHIPPING */}
        <div>
          <p className="font-bold flex items-center gap-2 mb-2">
            <Truck size={16} /> Shipping
          </p>

          <p>{order?.shippingAddress?.street}</p>
          <p>{order?.shippingAddress?.city}</p>

          <div className="mt-3 text-gray-700">
            <p>Zone: {order?.shipping?.zoneName}</p>
            <p>Price: ${order?.shipping?.price}</p>
            <p>ETA: {order?.shipping?.estimatedDays} days</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}