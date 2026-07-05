import AuthProvider from "./auth/AuthProvider";
import CategoriesProvider from "./category/CategoryProvider";
import CollectionsProvider from "./collection/CollectionsProvider";
import { CouponProvider } from "./coupon/CouponProvider";
import { NotificationProvider } from "./notifications/NotificationsProvider";
import { OrdersProvider } from "./orders/OrdersProvider";
import PageProvider from "./page/PageProvider";
import { PartnerProvider } from "./partner/PartnerProvider";
import ProductsProvider from "./products/ProductsProvider";
import ReviewProvider from "./review/ReviewProvider";
import SettingsProvider from "./settings/SettingsProvider";
import { ShippingProvider } from "./shipping/ShippingProvider";
import SubCategoryProvider from "./subcategory/SubCategoryProvider";
import { UserProvider } from "./user/UserProvider";

export default function AppProviders({ children }) {
  return (
    <ProductsProvider>
      <CollectionsProvider>
        <CategoriesProvider>
          <SubCategoryProvider>
            <AuthProvider>
              <ReviewProvider>
                <SettingsProvider>
                  <ShippingProvider>
                    <UserProvider>
                      <CouponProvider>
                        <PartnerProvider>
                          <PageProvider>
                            <NotificationProvider>
                              <OrdersProvider>{children}</OrdersProvider>
                            </NotificationProvider>
                          </PageProvider>
                        </PartnerProvider>
                      </CouponProvider>
                    </UserProvider>
                  </ShippingProvider>
                </SettingsProvider>
              </ReviewProvider>
            </AuthProvider>
          </SubCategoryProvider>
        </CategoriesProvider>
      </CollectionsProvider>
    </ProductsProvider>
  );
}
