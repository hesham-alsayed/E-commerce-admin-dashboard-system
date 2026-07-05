import { Card, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function EmptyState() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="flex flex-col items-center justify-center py-10 sm:py-12 text-center px-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-lg">
          <Car />
        </div>

        <h2 className="font-semibold text-base sm:text-lg">Ready to track?</h2>

        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm">
          Use the form above with your order ID and email to see exactly where
          your package is.
        </p>
      </CardContent>
    </Card>
  );
}
