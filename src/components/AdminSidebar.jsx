export default function AdminSidebar({ admin }) {
  return (
    <div className="w-64 fixed left-0 top-0 h-full bg-white border-r p-4">

      <div className="flex flex-col items-center text-center">

        <img
          src={admin?.avatar || "/avatar.png"}
          className="w-20 h-20 rounded-full object-cover"
        />

        <h2 className="mt-3 font-bold">{admin?.name}</h2>

        <p className="text-sm text-gray-500">{admin?.role}</p>

      </div>

      <div className="mt-6 text-xs text-gray-500 space-y-2">

        <p>Email: {admin?.email}</p>
        <p>Phone: {admin?.phone || "-"}</p>
        <p>Last login: {admin?.lastLogin}</p>

      </div>

    </div>
  );
}