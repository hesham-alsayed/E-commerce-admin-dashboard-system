import { Mail, Phone, Shield, User2 } from "lucide-react";
import InfoItem from "./InfoItem";
import { Button } from "@/components/ui/button";

export default function UserHeader({ user, onClickUpdate }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex items-center gap-4">
        <img
          src={user?.avatar || "/default-user.jpg"}
          className="w-16 h-16 rounded-xl object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-gray-500">User ID: {user?._id}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <InfoItem label="Email" value={user?.email} icon={Mail} />
        <InfoItem label="Phone" value={user?.phone || "N/A"} icon={Phone} />
        <InfoItem label="Role" value={user?.role} icon={Shield} />
      </div>
      <div className="flex items-end justify-end">
        <Button
          onClick={onClickUpdate}
          className={"hover:cursor-pointer border "}
          variant={"outline"}
        >
          Change Info <User2 />
        </Button>
      </div>
    </div>
  );
}
