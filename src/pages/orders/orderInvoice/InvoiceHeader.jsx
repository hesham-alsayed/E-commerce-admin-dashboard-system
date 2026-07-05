import { Card, CardContent } from "@/components/ui/card";
import Logo from "../../../assets/logo kazary.webp";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { statusStyle } from "@/lib/utils";

export default function InvoiceHeader({ order }) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* LEFT */}
          <div className="flex-1">
            <h1 className="font-bold text-lg flex items-center gap-2 justify-center sm:justify-start">
              <FileText size={18} /> Invoice
            </h1>
            <p className="text-gray-500">Kazary Store</p>
          </div>

          {/* CENTER */}
          <img src={Logo} className="w-24 sm:w-28 object-contain" />

          {/* RIGHT */}
          {/* RIGHT */}
          <div className="flex-1 flex flex-col items-end text-right">
            <p className="font-bold">#{order?.invoiceNumber}</p>

            <p className="text-sm text-gray-500">
              {new Date(order?.createdAt).toLocaleDateString()}
            </p>

            <Badge className={`${statusStyle(order?.orderStatus)} mt-2`}>
              {order?.orderStatus}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
