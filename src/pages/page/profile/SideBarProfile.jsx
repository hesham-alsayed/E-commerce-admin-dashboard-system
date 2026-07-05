import AvatarModal from "@/components/AvatarModal";
import { useAuth } from "@/components/hooks/useAuth";
import { formatDateTime } from "@/lib/utils";
import { Calendar, Mail, Phone, User, Upload } from "lucide-react";
import React, { useRef, useState } from "react";

export default function SideBarProfile() {
  const fileRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [hover, setHover] = useState(false);
  const { user: admin } = useAuth();

  const handlePick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setOpen(true);
  };

  const hasAvatar = admin?.avatar;

  return (
    <div>
      <div className="w-80 fixed top-29 left-0 bottom-0 bg-white border-r p-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div
            className="relative w-24 h-24 rounded-full border overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
            onClick={handlePick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {/* Image or default icon */}
            {hasAvatar ? (
              <img src={admin.avatar} className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}

            {/* Overlay upload icon */}
            {hover && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Upload className="text-white w-6 h-6" />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <h2 className="mt-4 text-lg font-bold">{admin.name}</h2>

          <span className="mt-1 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {admin.role}
          </span>
        </div>

        <div className="mt-6 space-y-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mail size={16} /> {admin.email}
          </div>

          {admin.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} /> {admin.phone}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar size={16} /> Joined {formatDateTime(admin.createdAt)}
          </div>
        </div>
      </div>

      {open && (
        <AvatarModal file={file} onClose={() => setOpen(false)} admin={admin} />
      )}
    </div>
  );
}
