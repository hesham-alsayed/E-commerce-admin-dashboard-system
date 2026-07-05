import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserX, ShoppingBag, BadgeCheck } from "lucide-react";

export default function CustomerStatsCard({ stats }) { 

   
  return (
    <main className="mb-10">
      <div className="mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* TOTAL CUSTOMERS */}
          <Card className="border-0 bg-card hover:border hover:border-gray-100 transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Customers
              </CardTitle>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.totalCustomers || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All registered users
              </p>
            </CardContent>
          </Card>

          {/* ACTIVE BUYERS (PAID) */}
          <Card className="border-0 bg-card hover:border hover:border-gray-100 transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Buyers
              </CardTitle>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <BadgeCheck className="h-5 w-5 text-emerald-500" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.customersWithPaidOrders || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Customers with paid orders
              </p>
            </CardContent>
          </Card>

          {/* CUSTOMERS WITH ORDERS */}
          <Card className="border-0 bg-card hover:border hover:border-gray-100 transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Customers With Orders
              </CardTitle>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.customersWithUnpaidOrders || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                At least one order placed
              </p>
            </CardContent>
          </Card>

          {/* NO ORDERS */}
          <Card className="border-0 bg-card hover:border hover:border-gray-100 transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                No Orders
              </CardTitle>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                <UserX className="h-5 w-5 text-rose-500" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.inactiveCustomers || stats?.noOrdersUsers || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Users with zero orders
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
