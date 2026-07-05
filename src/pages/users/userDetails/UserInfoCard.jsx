import { Calendar, CheckCircle, Lock } from "lucide-react";

export default function UserInfoCard({ user  }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center gap-3">
        <Calendar />
        <div>
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="font-medium">
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <CheckCircle />
        <div>
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="font-medium">
            {new Date(user?.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Lock />
        <div>
          <p className="text-sm text-gray-500">Password Changed</p>
          <p className="font-medium">
            {user?.passwordChangedAt
              ? new Date(user?.passwordChangedAt).toLocaleDateString()
              : "Never"}
          </p>
        </div>
      </div>
    </div>
  );
}
