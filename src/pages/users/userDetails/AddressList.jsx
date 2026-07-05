import { MapPin, Building2, Globe, Home, CheckCircle2 } from "lucide-react";

export default function AddressList({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="font-semibold text-gray-700 mb-4">
        Saved Addresses ({user?.addresses?.length || 0})
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {user?.addresses?.map((addr, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 border transition hover:shadow-sm ${
              addr.isDefault
                ? "bg-blue-50 border-blue-300"
                : "bg-white border-gray-100"
            }`}
          >
            {/* STREET */}
            <div className="flex items-start gap-2 mb-2">
              <Home className="w-4 h-4 text-gray-500 mt-0.5" />
              <p className="font-medium text-gray-800">{addr.street}</p>
            </div>

            {/* CITY + GOVERNORATE */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Building2 className="w-4 h-4" />
              <span>
                {addr.city}, {addr.governorate}
              </span>
            </div>

            {/* COUNTRY */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Globe className="w-4 h-4" />
              <span>{addr.country}</span>
            </div>

            {/* DEFAULT BADGE */}
            {addr.isDefault && (
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600">
                <CheckCircle2 className="w-4 h-4" />
                DEFAULT
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
