import { Card, CardContent } from "@/components/ui/card";

export default function InvoiceItems({ items }) {
  return (
    <Card>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm min-w-125">
          <thead>
            <tr className="bg-gray-100 capitalize text-center">
              <th className="p-3 text-start">Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {items?.map((item, i) => (
              <tr key={i} className="border-t text-center">
                <td className="p-3 capitalize text-start">{item.title}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
