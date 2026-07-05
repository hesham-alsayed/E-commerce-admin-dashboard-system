import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderItem from "./OrderItem";

export default function ItemsList({ items }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Items Ordered</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((item, i) => (
          <OrderItem key={i} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}
