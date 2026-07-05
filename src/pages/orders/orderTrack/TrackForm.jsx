import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function TrackForm({ onTrack, loading }) {
  const [searchParams] = useSearchParams();

  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  // 🔥 sync with URL (IMPORTANT)
  useEffect(() => {
    const check = () => {
      setOrderNumber(searchParams.get("orderNumber") || "");
      setEmail(searchParams.get("email") || "");
    };
    check();
  }, [searchParams]);

  const handleSubmit = () => {
    if (!orderNumber || !email) return;
    onTrack(orderNumber, email);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 w-full max-w-2xl">
      {/* ORDER NUMBER */}
      <div className="relative w-full">
        <Package
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <Input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Order Number (e.g. ORD-123)"
          className="
            pl-10
            text-gray-900
            caret-black
            bg-white
            border border-gray-200
            focus-visible:ring-0
            focus-visible:ring-gray-300
            focus-visible:outline-none
          "
        />
      </div>

      {/* EMAIL */}
      <div className="relative w-full">
        <Mail
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="
            pl-10
            text-gray-900
            caret-black
            bg-white
            border border-gray-200
            focus-visible:ring-0
            focus-visible:ring-gray-300
            focus-visible:outline-none
          "
        />
      </div>

      {/* BUTTON */}
      <Button
        disabled={loading}
        onClick={handleSubmit}
        className="w-full sm:w-auto flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            Tracking...
          </>
        ) : (
          "Track"
        )}
      </Button>
    </div>
  );
}
