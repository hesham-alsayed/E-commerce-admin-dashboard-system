import AdminLayout from "@/components/layouts/AdminLayout";
import AdminGuard from "@/pages/auth/AdminGuard";
import AuthGuard from "@/pages/auth/AuthGuard";
import AuthPage from "@/pages/auth/AuthPage";
import UnAuthorizedPage from "@/pages/auth/UnAuthorizedPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import CategoryPage from "@/pages/category/CategoryPage";
import CollectionPage from "@/pages/collection/CollectionPage";
import CreateProduct from "@/pages/product/CreateProduct";
import ProductsPage from "@/pages/product/ProductsPage";
import ReviewPage from "@/pages/review/ReviewPage";
import SubCategoryPage from "@/pages/subcategory/SubcategoryPage";
import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import CustomerPage from "@/pages/customer/CustomerPage";
import ControlGeneralSettings from "@/pages/settings/general/ControlGeneralSettings";
import ControlNotificationSettings from "@/pages/settings/notification/ControlNotificationSettings";
import ControlShippingSettings from "@/pages/settings/shipping/ControlShippingSettings";
import SettingsLayout from "@/pages/settings/SettingsLayout";
import GeneralSettings from "@/pages/settings/general/GeneralSettings";
import NotificationSettings from "@/pages/settings/notification/NotificationSettings";
import ShippingSettings from "@/pages/settings/shipping/ShippingSettings";
import RoleManagement from "@/pages/user&roleManagement/RoleManagement";
import CouponPage from "@/pages/coupon/CouponPage";
import PartnerPage from "@/pages/partner/PartnerPage";
import PartnerDetails from "@/pages/partner/PartnerDetails";
import MainPage from "@/pages/page/MainPage";
import BannerSectionEditor from "@/pages/page/sections/BannerSectionEditor";
import ProductsSectionEditor from "@/pages/page/sections/ProductsSectionEditor";
import TextSectionEditor from "@/pages/page/sections/TextSectionEditor";
import PageBuilderLayout from "@/pages/page/PageBuilderLayout";
import PageRender from "@/pages/page/render/PageRender";
import AdminProfilePage from "@/pages/page/profile/AdminProfilePage";
import NotificationsPage from "@/pages/notification/NotificationsPage";
import UsersPage from "@/pages/users/UsersPage";
import OrdersPage from "@/pages/orders/OrdersPage";
import OrderDetailsPage from "@/pages/orders/orderDetails/OrderDetailsPage";
import OrderInvoicePage from "@/pages/orders/orderInvoice/OrderInvoicePage";
import OrderTrackingPage from "@/pages/orders/orderTrack/OrderTrackingPage";
import InvoicePage from "@/pages/Invoice/InvoicePage";
import UserDetailsPage from "@/pages/users/userDetails/UserDetailsPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPasseord";
import ProtectedGuard from "@/pages/auth/ProtectedGuard";
import PublicGuard from "@/pages/auth/PublicGuard";
import RootRedirect from "./RootRedirect";
import ProductDetailsPage from "@/pages/product/ProductDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC (ONLY GUESTS) ================= */}
      <Route path="/" element={<RootRedirect />} />

      <Route element={<PublicGuard />}>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* ================= PROTECTED ================= */}
      <Route element={<ProtectedGuard />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="commerce/products" element={<ProductsPage />} />
          <Route path="commerce/products/new" element={<CreateProduct />} />
          <Route
            path="commerce/products/update/:id"
            element={<CreateProduct />}
          />
          <Route
            path="commerce/product-details/:id"
            element={<ProductDetailsPage />}
          />

          <Route path="commerce/reviews" element={<ReviewPage />} />
          <Route path="commerce/customers" element={<CustomerPage />} />

          <Route path="commerce/orders" element={<OrdersPage />} />
          <Route
            path="commerce/orders/order-details/:orderId"
            element={<OrderDetailsPage />}
          />
          <Route
            path="commerce/orders/order-invoice/:orderId"
            element={<OrderInvoicePage />}
          />
          <Route path="order-track" element={<OrderTrackingPage />} />

          <Route path="commerce/invoices" element={<InvoicePage />} />

          <Route path="catalog-collection" element={<CollectionPage />} />
          <Route path="catalog-category" element={<CategoryPage />} />
          <Route path="catalog-subcategory" element={<SubCategoryPage />} />

          <Route path="settings-general" element={<ControlGeneralSettings />} />
          <Route
            path="settings-notification"
            element={<ControlNotificationSettings />}
          />
          <Route
            path="settings-shipping"
            element={<ControlShippingSettings />}
          />

          <Route path="settings-roles" element={<RoleManagement />} />

          <Route path="system-settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<GeneralSettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="shipping" element={<ShippingSettings />} />
          </Route>

          <Route path="marketing-coupons" element={<CouponPage />} />
          <Route path="marketing-partner" element={<PartnerPage />} />
          <Route path="marketing-partner/:id" element={<PartnerDetails />} />

          <Route path="pages" element={<MainPage />} />
          <Route path="pages/:pageId/builder" element={<PageBuilderLayout />} />
          <Route path="pages/:pageId/view" element={<PageRender />} />

          <Route path="profile" element={<AdminProfilePage />} />

          <Route path="system/notifications" element={<NotificationsPage />} />
          <Route path="system/users" element={<UsersPage />} />
          <Route
            path="system/users/user-details/:id"
            element={<UserDetailsPage />}
          />
        </Route>
      </Route>

      {/* ================= ERRORS ================= */}
      <Route path="/unauthorized" element={<UnAuthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
