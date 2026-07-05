import useOrders from "@/components/hooks/useOrders";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderHeader from "./OrderHeader";
import ItemsList from "./ItemsList";
import ShippingInfo from "./ShippingInfo";
import CustomerInfo from "./CustomerInfo";
import PaymentSummary from "./PaymentSummary";
import PaymentInfo from "./PaymentInfo";
import OrderDetailsSkeleton from "@/components/OrderDetailsSkeleton";
import CouponInfo from "./CouponInfo";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const { fetchOrderById, loading, currentOrder: order } = useOrders();

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]);

  if (loading || !order) {
    return <OrderDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen  p-1 ">
      {/* PAGE GRID */}
      <OrderHeader order={order} />
      <div className="grid grid-cols-1 mt-4 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE (Items + Summary + Tracking) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Items Ordered */}
          <ItemsList items={order.items} />

          {/* Order Summary + Tracking (2 columns on desktop, stacked on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ShippingInfo order={order} />
            <CustomerInfo order={order} />
          </div>
        </div>

        {/* RIGHT SIDE (Customer + Shipping + Payment) */}
        <div className="flex flex-col gap-6">
          <PaymentSummary order={order} />
          <PaymentInfo order={order} />
          <CouponInfo coupon={order.coupon} />
        </div>
      </div>
    </div>
  );
}
