import { Button } from "@/components/ui/button";
import { Download, Loader2, Printer, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InvoiceActions({ onDownload, loading, onPrint }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-end gap-3 mt-6 px-4">
      <Button
        onClick={() => navigate("/admin/order-track")}
        className="cursor-pointer transition-all duration-200 hover:opacity-80"
      >
        <Truck className="w-4 h-4 mr-2" />
        Track
      </Button>

      <Button
        onClick={onPrint}
        variant="secondary"
        className="cursor-pointer transition-all duration-200 hover:opacity-80"
      >
        <Printer className="w-4 h-4 mr-2" />
        Print
      </Button>

      <Button
        onClick={onDownload}
        disabled={loading}
        className="cursor-pointer transition-all duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={14} className="mr-2" />
            Loading...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download
          </>
        )}
      </Button>
    </div>
  );
}
