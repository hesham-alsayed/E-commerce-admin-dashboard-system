"use client";

import DashboardSkeleton from "./DashboardSkeleton";
import useOrdersAnalyticsChart from "./hooks/useOrderAnalyticsChart";
import useOrderStatusSummary from "./hooks/useOrderStatusSummary";
import usePaymentCompareChart from "./hooks/usePaymentCompareChart";
import useProductRatingChart from "./hooks/useProductRatingChart";
import useStockAnalytics from "./hooks/useStockAnalytics";
import useTopProductsSales from "./hooks/useTopProductSales";
import useTotalSalesChart from "./hooks/useTotalSalesChart";
import useZoneAnalyticsChart from "./hooks/useZoneAnalyticsChart";

import OrdersAnalyticsChart from "./OrdersAnalyticsChart";
import OrderStatusSummary from "./OrderStatusSummary";
import PaymentCompareChart from "./PaymentCompareChart";
import ProductRatingChart from "./ProductRatingChart";
import StockAnalyticsChart from "./StockAnalyticsChart";
import TopProductsSales from "./TopProductsSales";
import TotalSalesChart from "./TotalSalesChart";
import ZoneAnalyticsChart from "./ZoneAnalyticsChart";

import { motion as _motion } from "framer-motion";

export default function DashboardPage() {
  const ordersChart = useOrdersAnalyticsChart();
  const ordersStatusSummary = useOrderStatusSummary();
  const totalSales = useTotalSalesChart();
  const productRating = useProductRatingChart();
  const paymentChart = usePaymentCompareChart();
  const zoneChart = useZoneAnalyticsChart();
  const topProductSales = useTopProductsSales();
  const stockAnalytics = useStockAnalytics();

  const dashboardLoading =
    ordersChart.loading &&
    ordersStatusSummary.loading &&
    totalSales.loading &&
    productRating.loading &&
    paymentChart.loading &&
    zoneChart.loading &&
    topProductSales.loading &&
    stockAnalytics.loading;

  if (dashboardLoading) return <DashboardSkeleton />;

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const transition = {
    duration: 0.5,
    ease: "easeOut",
  };

  const viewport = {
    once: true, // يظهر مرة واحدة فقط
    amount: 0.2, // لما 20% من العنصر يدخل الشاشة
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen container mx-auto">
      {/* ROW 1 */}
      <_motion.div
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={transition}
        className="w-full bg-white rounded-2xl border p-4 flex flex-col lg:flex-row gap-4"
      >
        <div className="w-full lg:w-[70%]">
          <OrdersAnalyticsChart {...ordersChart} />
        </div>

        <div className="w-full lg:w-[30%]">
          <OrderStatusSummary {...ordersStatusSummary} />
        </div>
      </_motion.div>

      {/* ROW 2 */}
      <_motion.div
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={transition}
        className="w-full bg-white rounded-2xl border p-4 flex flex-col lg:flex-row gap-4"
      >
        <div className="w-full lg:w-[60%]">
          <TotalSalesChart {...totalSales} />
        </div>

        <div className="w-full lg:w-[40%]">
          <ProductRatingChart {...productRating} />
        </div>
      </_motion.div>

      {/* ROW 3 */}
      <_motion.div
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={transition}
      >
        <PaymentCompareChart {...paymentChart} />
      </_motion.div>

      {/* ROW 4 */}
      <_motion.div
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={transition}
        className="mt-10 w-full bg-white rounded-2xl border p-4 flex flex-col lg:flex-row gap-4"
      >
        <div className="w-full lg:w-[40%]">
          <ZoneAnalyticsChart {...zoneChart} />
        </div>

        <div className="w-full lg:w-[60%]">
          <TopProductsSales {...topProductSales} />
        </div>
      </_motion.div>
      <_motion.div
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={transition}
      >
        <StockAnalyticsChart {...stockAnalytics} />
      </_motion.div>
    </div>
  );
}
