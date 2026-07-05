import React from "react";

export default function EmptyInvoiceState() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
        <p className="text-lg font-medium">No invoices found</p>
        <p className="text-sm mt-1">Try changing filters or search keywords</p>
      </div>
    </div>
  );
}
