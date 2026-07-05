import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ShoppingCart, Package, Users, FileText } from "lucide-react";
import { SlArrowDown } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsCollection } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import { Link } from "react-router-dom";
import { BsQuestionCircle } from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import { MdOutlineReviews } from "react-icons/md";
import { VscCollection } from "react-icons/vsc";
import { RiCouponLine, RiPageSeparator } from "react-icons/ri";
import { SiCoinmarketcap } from "react-icons/si";
import { IoHomeOutline } from "react-icons/io5";
import { FaBorderStyle } from "react-icons/fa";

export function BottomNav() {
  const menuItems = [
    {
      title: "Commerce",
      children: [
        {
          title: "Orders",
          path: "/admin/commerce/orders",
          icon: ShoppingCart,
        },
        {
          title: "Products",
          path: "/admin/commerce/products",
          icon: Package,
        },
        {
          title: "Customers",
          path: "/admin/commerce/customers",
          icon: Users,
        },
        {
          title: "Invoices",
          path: "/admin/commerce/invoices",
          icon: FileText,
        },
        {
          title: "Reviews",
          path: "/admin/commerce/reviews",
          icon: MdOutlineReviews,
        },
      ],
    },
    {
      title: "Settings",
      children: [
        {
          icon: IoSettingsOutline,
          title: "General",
          path: "/admin/settings-general",
        },
        {
          icon: IoMdNotificationsOutline,
          title: "Notification",
          path: "/admin/settings-notification",
        },
        {
          icon: MdOutlineLocalShipping,
          title: "Shipping",
          path: "/admin/settings-shipping",
        },
        {
          icon: MdOutlineVerifiedUser,
          title: "Users & Roles",
          path: "/admin/settings-Roles",
        },
      ],
    },
    {
      title: "Catalog",
      children: [
        {
          title: "Collections",
          path: "/admin/catalog-collection",
          icon: BsCollection,
        },
        {
          title: "Categories",
          path: "/admin/catalog-category",
          icon: TbCategory,
        },
        {
          title: "Subcategories",
          path: "/admin/catalog-subcategory",
          icon: VscCollection,
        },
      ],
    },
    {
      title: "Marketing",
      children: [
        {
          title: "Coupons",
          path: "/admin/marketing-coupons",
          icon: RiCouponLine,
        },
        {
          title: "Partner",
          path: "/admin/marketing-partner",
          icon: SiCoinmarketcap,
        },
      ],
    },
    {
      title: "System",
      children: [
        {
          title: "Users",
          path: "/admin/system/users",
          icon: MdOutlineVerifiedUser,
        },
        {
          title: "Settings",
          path: "/admin/system-settings",
          icon: IoSettingsOutline,
        },
        {
          title: "Notifications",
          path: "/admin/system/notifications",
          icon: IoMdNotificationsOutline,
        },
      ],
    },
  ];
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 text-sm text-gray-600">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2">
        <Link
          className="flex p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 hover:text-black transition-all"
          to={"/admin/dashboard"}
        >
          Dashboard
          <SiSimpleanalytics />
        </Link>

        {menuItems
          .filter((item) => item.title !== "System")
          .map((item, index) => (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-sm hover:bg-gray-100 hover:text-black transition-colors">
                  {item.title}
                  <SlArrowDown size={10} className="ml-1 mt-1" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-50 bg-white rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none"
              >
                {item.children.map((child, idx) => {
                  const Icon = child.icon;
                  return (
                    <Link key={idx} to={child.path}>
                      <DropdownMenuItem className="flex p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all">
                        {Icon && <Icon className="w-4 h-4" />}
                        {child.title}
                      </DropdownMenuItem>
                    </Link>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

        <Link
          className="flex p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 hover:text-black transition-all"
          to={"/admin/pages"}
        >
          Pages
          <RiPageSeparator />
        </Link>
      </div>

      {/* RIGHT SIDE - System menu */}
      <div className="flex items-center gap-2 ">
        {menuItems
          .filter((item) => item.title === "System")
          .map((item, index) => (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-sm hover:bg-gray-100 hover:text-black transition-colors">
                  {item.title}
                  <SlArrowDown size={10} className="ml-1 mt-1" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56  bg-white rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none"
              >
                {item.children.map((child, idx) => {
                  const Icon = child.icon;
                  return (
                    <Link key={idx} to={child.path}>
                      <DropdownMenuItem className="flex p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all">
                        {Icon && <Icon className="w-4 h-4" />}
                        {child.title}
                      </DropdownMenuItem>
                    </Link>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
      </div>
    </div>
  );
}
