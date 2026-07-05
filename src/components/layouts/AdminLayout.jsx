import { Outlet } from "react-router-dom";
import { BottomNav } from "../BottomNav";
import TopNav from "../TopNav";
import React, { useState } from "react";
import ModalSearch from "../ModalSearch";

export default function AdminLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <section className="min-h-screen bg-gray-50 relative">
      {/* 🟢 z-20: Header */}
      <div className="fixed z-20 top-0 left-0 right-0 flex flex-col bg-white/95 backdrop-blur-sm shadow-sm">
        <TopNav onSearchClick={() => setIsSearchOpen(true)} />
        <BottomNav />
      </div>

      {/* 🟢 Page content */}
      <main className="pt-[140px] pb-[80px] px-4 sm:px-8 min-h-screen">
        <Outlet />
      </main>

      {/* 🚀 MODAL - z-[9999] ABOVE EVERYTHING */}
      <ModalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </section>
  );
}
