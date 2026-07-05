"use client";

import { usePages } from "@/components/hooks/usePages";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function MainPageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const { pages } = usePages();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP NAVBAR */}
      <div className="fixed px-8 top-29 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex gap-6">
            {pages.map((page) => {
              const active = isActive(`/admin/pages/${page.slug}`);
              return (
                <button
                  key={page._id}
                  onClick={() => navigate(`/admin/pages/${page.slug}`)}
                  className={`
                    relative hover:cursor-pointer py-4 text-sm font-medium transition
                    ${active ? "text-black" : "text-gray-500 hover:text-black"}
                  `}
                >
                  {page.slug.toUpperCase()}

                  {/* underline */}
                  <span
                    className={`
                      absolute left-0 -bottom-px h-0.5 w-full transition
                      ${active ? "bg-black" : "bg-transparent"}
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto mt-8 py-6">
        <Outlet />
      </div>
    </div>
  );
}
