import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function ButtonAdd({
  title,
  bgColor = "#000000",
  colorText = "#ffffff",
  navigate,
}) {
  return (
    <Link to={navigate}>
      <button
        style={{
          backgroundColor: bgColor,
          color: colorText,
        }}
        className=" z-10  py-2 px-3 capitalize hover:cursor-pointer flex items-center justify-center text-[13px] rounded-xl hover:opacity-80 transition-all"
      >
        <Plus className="w-4 h-4 mr-1" />
        {title}
      </button>
    </Link>
  );
}
