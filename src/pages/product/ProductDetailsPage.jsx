/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAdminProductAnalytics } from "@/components/ِApi/productsApi";
import { showToast } from "@/lib/utils";
import ProductDetailsSkeleton from "@/components/ui/ProductDetailsSkeleton";
import ProductHeader from "@/components/ProductHeader";
import ProductStatsCards from "@/components/ProductStatsCards";
import ProductOverview from "@/components/ProductOverview";
import VariantSalesChart from "@/components/VariantSalesChart";
import VariantDetailedTable from "@/components/VariantDetailedTable";
import ProductClassification from "@/components/ProductClassification";
import RecentProductOrders from "@/components/RecentProductOrders";

// UI COMPONENTS

export default function ProductDetailsPage() {
  const { id } = useParams();

  // ================= STATE =================
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);

  // ================= FETCH =================
  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);

      const res = await getAdminProductAnalytics(productId);

      // IMPORTANT: normalize response
      setProductData(res.data || res);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to load product",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    if (id) fetchProductDetails(id);
  }, [id]);

  // ================= LOADING =================
  if (loading || !productData) {
    return <ProductDetailsSkeleton />;
  }

  const { product, analytics, variantAnalytics, latestOrders } = productData;
  console.log(productData);

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* HEADER */}
      <ProductHeader product={product} />

      {/* TOP STATS */}
      <ProductStatsCards analytics={analytics} />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <ProductOverview product={product} />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <ProductClassification product={product} />

          <RecentProductOrders orders={latestOrders} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VariantSalesChart data={variantAnalytics} />

        <VariantDetailedTable data={variantAnalytics} />
      </div>
    </div>
  );
}
