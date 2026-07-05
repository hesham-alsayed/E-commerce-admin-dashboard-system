"use client";

import { useState } from "react";
import { User, Lock, Bell, Mail, Phone, Calendar } from "lucide-react";
import ChangePasswordPage from "./ChangePasswordPage";
import GeneralInfoPage from "./GeneralInfoPage";
import SideBarProfile from "./SideBarProfile";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("general");

  const admin = {
    name: "Sarah Connor",
    role: "Super Admin",
    email: "sarah.admin@system.io",
    phone: "+1 (555) 123-4567",
    joined: "March 2024",
    avatar: "/avatar.png",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ================= LEFT SIDEBAR ================= */}
      <SideBarProfile admin={admin} />
      {/* ================= RIGHT CONTENT ================= */}
      <div className="flex-1 flex flex-col ml-72  w-full ">
        {/* ================= TOP TABS ================= */}
        <div className="bg-white border-b flex fixed top-29 left-80 right-0 w-full gap-6 px-6 pt-4">
          <button
            onClick={() => setActiveTab("general")}
            className={`flex text-sm items-center gap-2 pb-2 border-b-2 transition ${
              activeTab === "general"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            <User size={16} />
            General Info
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex text-sm items-center gap-2 pb-2 border-b-2 transition ${
              activeTab === "security"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            <Lock size={16} />
            Security
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-6 mt-4 space-y-6 text-sm">
          {/* ===== GENERAL ===== */}
          {activeTab === "general" && <GeneralInfoPage admin={admin} />}

          {/* ===== SECURITY ===== */}
          {activeTab === "security" && <ChangePasswordPage />}
        </div>
      </div>
    </div>
  );
}
