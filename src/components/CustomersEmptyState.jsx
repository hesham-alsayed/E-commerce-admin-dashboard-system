"use client";

export default function CustomersEmptyState({
  title = "No data found",
  description = "There is no data to display.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border rounded-xl bg-muted/20">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">
        {description}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}