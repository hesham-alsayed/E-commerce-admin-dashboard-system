// components/user-details/InfoItem.jsx

export default function InfoItem({ icon, label, value }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-gray-500" />
      <div className="text-sm">
        <p className="text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
