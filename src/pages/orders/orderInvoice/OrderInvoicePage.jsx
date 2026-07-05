import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import OrderInvoiceSkeleton from "@/components/OrderInvoiceSkeleton";
import InvoiceActions from "./InvoiceActions";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceCustomerShipping from "./InvoiceCustomerShipping";
import InvoiceItems from "./InvoiceItems";
import InvoicePaymentSummary from "./InvoicePaymentSummary";
import useOrders from "@/components/hooks/useOrders";

export default function OrderInvoicePage() {
  const { orderId } = useParams();
  const { fetchOrderById, currentOrder: order } = useOrders();

  const InvoiceRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]);

  const downloadPDF = async () => {
    try {
      setLoading(true);

      const dataUrl = await toPng(InvoiceRef.current, {
        pixelRatio: 2,
        backgroundColor: "#fff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(dataUrl);
      const height = (imgProps.height * width) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdf.save(`invoice-${order?._id}.pdf`);

      toast.success("Downloaded");
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = InvoiceRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    window.location.reload(); // مهم عشان يرجع الصفحة زي ما كانت
  };
  if (!order) return <OrderInvoiceSkeleton />;

  return (
    <div className="max-w-6xl mx-auto ">
      <InvoiceActions
        onPrint={() => handlePrint()}
        onDownload={downloadPDF}
        loading={loading}
      />

      <div ref={InvoiceRef} className="space-y-6  p-4 ">
        <InvoiceHeader order={order} />

        <InvoiceCustomerShipping order={order} />

        <InvoiceItems items={order.items} />

        <InvoicePaymentSummary order={order} />
      </div>
    </div>
  );
}
