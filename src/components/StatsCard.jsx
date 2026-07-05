export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2">
      <span className="text-gray-500 text-sm">{title}</span>

      <h2 className="text-3xl font-bold text-gray-900">
        {typeof value === "number" ? value.toLocaleString() : value}
      </h2>
    </div>
  );
}