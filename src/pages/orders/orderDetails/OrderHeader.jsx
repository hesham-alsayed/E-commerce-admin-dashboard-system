import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Truck } from "lucide-react";

export default function OrderHeader({ order }) {
  const { orderNumber, contactEmail } = order;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 flex-wrap">
          Order #{order.orderNumber}
          <Badge>{order.orderStatus}</Badge>
        </h1>

        <p className="text-sm text-gray-500">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button
          className={"hover:cursor-pointer hover:opacity-75"}
          variant="outline"
          onClick={() =>
            navigate(`/admin/commerce/orders/order-invoice/${order._id}`)
          }
        >
          Invoice #{order.invoiceNumber}
        </Button>

        <Button
          onClick={() =>
            navigate(
              `/admin/order-track?orderNumber=${encodeURIComponent(
                orderNumber,
              )}&email=${encodeURIComponent(contactEmail)}`,
            )
          }
          className="cursor-pointer transition-all duration-200 hover:opacity-80"
        >
          <Truck className="w-4 h-4 mr-2" />
          Track
        </Button>
      </div>
    </div>
  );
}
