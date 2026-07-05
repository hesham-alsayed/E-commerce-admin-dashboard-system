import React, { useState } from "react";
import { uploadAvatar } from "./ِApi/userApi";

export default function AvatarModal({ file, onClose }) {
  const [loading, setLoading] = useState(false);

  const preview = file ? URL.createObjectURL(file) : null;

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      await uploadAvatar(formData);

      onClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-center mb-4">
          Update Avatar
        </h2>

        {/* Preview */}
        {preview && (
          <div className="flex justify-center mb-5">
            <img
              src={preview}
              className="w-42 h-42 border-gray-500 rounded-full object-cover border"
              alt="avatar preview"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-900 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
