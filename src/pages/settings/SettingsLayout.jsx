"use client";

import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/utils";
import { createSetting } from "@/components/ِApi/settingsApi";
import { ModalCreateSetting } from "./ModalCreateSetting";

const TABS = [
  { key: "general", label: "General", path: "/admin/system-settings/general" },
  {
    key: "notifications",
    label: "Notifications",
    path: "/admin/system-settings/notifications",
  },
  {
    key: "shipping",
    label: "Shipping",
    path: "/admin/system-settings/shipping",
  },
];

export default function SettingsLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleCreateSetting = async (data) => {
    try {
      await createSetting(data);

      showToast({
        message: "Setting created successfully",
        type: "success",
      });

      setOpen(false);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Create failed",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP NAVBAR */}
      <div className="fixed px-8 top-[117px] left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex gap-6 items-center justify-between">
            {/* TABS */}
            <div className="flex gap-6">
              {TABS.map((tab) => {
                const active = isActive(tab.path);

                return (
                  <button
                    key={tab.key}
                    onClick={() => navigate(tab.path)}
                    className={`
                      relative hover:cursor-pointer py-4 text-sm font-medium transition
                      ${
                        active ? "text-black" : "text-gray-500 hover:text-black"
                      }
                    `}
                  >
                    {tab.label}

                    <span
                      className={`
                        absolute left-0 -bottom-[1px] h-[2px] w-full transition
                        ${active ? "bg-black" : "bg-transparent"}
                      `}
                    />
                  </button>
                );
              })}
            </div>

            {/* CREATE BUTTON */}
            <Button variant={'outline'} className="hover:bg-gray-100 hover:cursor-pointer" onClick={() => setOpen(true)}>
              Create Setting
            </Button>
          </div>

          <ModalCreateSetting
            open={open}
            onClose={() => setOpen(false)}
            onCreate={handleCreateSetting}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto mt-8 py-6">
        <Outlet />
      </div>
    </div>
  );
}
