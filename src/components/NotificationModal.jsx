"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FiLink, FiUser, FiTag, FiClock, FiMail } from "react-icons/fi";

export default function NotificationModal({ selected, onClose }) {
  const open = !!selected;

  const user = selected?.user;

  const fullName =
    user && typeof user === "object"
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : user;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{selected?.title}</DialogTitle>
        </DialogHeader>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-4">{selected?.message}</p>

        {/* DETAILS */}
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <FiTag />
            <span className="text-gray-500">Type:</span>
            <span className="font-medium">{selected?.type}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FiUser />
            <span className="text-gray-500">Target:</span>
            <span className="font-medium">{selected?.target}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FiClock />
            <span className="text-gray-500">Created:</span>
            <span className="font-medium">
              {selected?.createdAt &&
                new Date(selected.createdAt).toLocaleString()}
            </span>
          </div>

          {/* USER */}
          {user && (
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <FiUser />
                <span className="text-gray-500">User:</span>
                <span className="font-medium">{fullName || "Unknown"}</span>
              </div>

              {user.email && (
                <div className="flex items-center gap-2 text-gray-700">
                  <FiMail />
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
              )}
            </div>
          )}

          {/* LINK */}
          {selected?.link && (
            <div className="flex items-center gap-2 text-blue-600">
              <FiLink />
              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Open link
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
