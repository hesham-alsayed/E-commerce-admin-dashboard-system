import { Link, useLocation } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const PATH_LABELS = {
  admin: "Dashboard",
  products: "Products",
  users: "Users",
  orders: "Orders",
  edit: "Edit",
  create: "Create",
};

const isId = (part) => {
  // MongoDB / numeric / uuid detection
  return /^[0-9a-fA-F]{24}$/.test(part) || /^\d+$/.test(part);
};

export function CurrentPath() {
  const location = useLocation();
  const pathname = location.pathname;

  const pathParts = pathname
    .split("/")
    .filter(Boolean)
    .filter((part) => part !== "admin"); // remove admin base

  const finalCrumbs = [
    { name: "Dashboard", path: "/admin" },
    ...pathParts
      .filter((part) => !isId(part)) // 🚀 remove IDs completely
      .map((part, idx, arr) => {
        const path = "/admin/" + arr.slice(0, idx + 1).join("/");

        return {
          name:
            PATH_LABELS[part] ||
            part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          path,
        };
      }),
  ];

  return (
    <nav className="text-sm text-gray-500 flex items-center gap-1">
      {finalCrumbs.map((crumb, idx) => (
        <span key={idx} className="flex items-center gap-1">
          {idx !== finalCrumbs.length - 1 ? (
            <>
              <span className=" hover:text-black">
                {crumb.name}
              </span>
              <MdOutlineArrowForwardIos className="w-2 h-2 mx-2" />
            </>
          ) : (
            <span className="font-medium text-gray-800">{crumb.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
