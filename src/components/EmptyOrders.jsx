import { PackageX } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="p-4 rounded-full bg-gray-100">
        <PackageX className="w-8 h-8 text-gray-500" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-700">
        No Orders Found
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Try changing filters or search criteria
      </p>
    </div>
  );
}