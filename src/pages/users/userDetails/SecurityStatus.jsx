import { Switch } from "@mui/material";

export default function SecurityStatus({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5 border border-gray-100">
      <h3 className="text-xs font-semibold text-gray-400 tracking-wide">
        SECURITY & STATUS
      </h3>

      {/* Active */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Active Account
        </span>

        <Switch
          checked={user?.isActive}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#000",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#000",
            },
          }}
        />
      </div>

      {/* Verified */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Email Verified
        </span>

        <Switch
          checked={user?.isVerified}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#000",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#000",
            },
          }}
        />
      </div>

      {/* Info */}
      <div className="text-xs text-gray-400 pt-4 border-t space-y-1">
        <div className="flex items-center justify-between text-sm ">
          <p className="text-gray-500"> Last Login:</p>
          <p className="text-gray-800">
            {user?.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm ">
          <p className="text-gray-500"> Login IP::</p>
          <p className="text-gray-800"> {user?.lastLoginIP || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
