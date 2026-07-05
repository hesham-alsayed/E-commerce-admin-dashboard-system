import React from "react";
import logo from '../assets/logo kazary.webp'
import NotificationsMenu from "./NotificationsMenu";
import AvatarMenu from "./AvatarMenu";
import ButtonAdd from "./ButtonAdd";
import SearchTrigger from "./SearchTrigger";

export default function TopNav({ onSearchClick }) {
  // ✅ Accept callback from parent

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img className="w-10 h-10" src={logo} alt="logo" />
          </div>

          {/* Search - ✅ FIXED onClick */}
          <SearchTrigger onClick={onSearchClick} />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <ButtonAdd title={"create order"} />
          <div className="w-px h-8 bg-gray-300 mx-2"></div>

          <NotificationsMenu />
          <AvatarMenu />
        </div>
      </div>
    </div>
  );
}
