import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Star,
  FolderTree,
  Layers,
  Settings,
  Bell,
  Shield,
  FileText,
  Ticket,
  Truck,
  Image,
  UserCog,
  Globe,
  ClipboardList,
} from "lucide-react";

export const adminSearchPages = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    desc: "Overview of sales users system analytics",
  },

  // 🛒 Commerce
  {
    name: "Products",
    path: "/admin/commerce/products",
    icon: ShoppingBag,
    desc: "Manage store products inventory pricing stock",
  },
  {
    name: "Create Product",
    path: "/admin/commerce/products/new",
    icon: Package,
    desc: "Add new product to your store",
  },
  {
    name: "Reviews",
    path: "/admin/commerce/reviews",
    icon: Star,
    desc: "Manage customer product reviews ratings feedback",
  },
  {
    name: "Customers",
    path: "/admin/commerce/customers",
    icon: Users,
    desc: "View and manage registered customers data",
  },
  {
    name: "Orders",
    path: "/admin/commerce/orders",
    icon: ClipboardList,
    desc: "Track and manage all customer orders",
  },
  {
    name: "Invoices",
    path: "/admin/commerce/invoices",
    icon: FileText,
    desc: "View and manage customer order invoices",
  },

  // 📦 Catalog
  {
    name: "Collections",
    path: "/admin/catalog-collection",
    icon: Layers,
    desc: "Organize product collections for store display",
  },
  {
    name: "Categories",
    path: "/admin/catalog-category",
    icon: FolderTree,
    desc: "Manage product categories structure hierarchy",
  },
  {
    name: "Subcategories",
    path: "/admin/catalog-subcategory",
    icon: FolderTree,
    desc: "Manage nested product subcategory structure",
  },

  // ⚙️ Settings
  {
    name: "General Settings",
    path: "/admin/settings-general",
    icon: Settings,
    desc: "Configure system general application settings",
  },
  {
    name: "Notifications Settings",
    path: "/admin/settings-notification",
    icon: Bell,
    desc: "Control system notification preferences rules",
  },
  {
    name: "Shipping Settings",
    path: "/admin/settings-shipping",
    icon: Truck,
    desc: "Configure shipping methods pricing zones",
  },
  {
    name: "Roles Management",
    path: "/admin/settings-roles",
    icon: UserCog,
    desc: "Manage admin roles permissions access control",
  },

  // ⚙️ System Settings Tabs
  {
    name: "System Settings",
    path: "/admin/system-settings",
    icon: Shield,
    desc: "Advanced system configuration management panel",
  },

  // 🎯 Marketing
  {
    name: "Coupons",
    path: "/admin/marketing-coupons",
    icon: Ticket,
    desc: "Create and manage discount coupon codes",
  },
  {
    name: "Partners",
    path: "/admin/marketing-partner",
    icon: Globe,
    desc: "Manage business partners affiliates integrations",
  },

  // 📄 Pages Builder
  {
    name: "Pages",
    path: "/admin/pages",
    icon: Image,
    desc: "Manage website pages content builder system",
  },

  // 👤 Profile
  {
    name: "Admin Profile",
    path: "/admin/profile",
    icon: Users,
    desc: "View and edit admin account profile",
  },

  // 🔔 System
  {
    name: "System Notifications",
    path: "/admin/system/notifications",
    icon: Bell,
    desc: "View system alerts notifications messages",
  },
  {
    name: "Users Management",
    path: "/admin/system/users",
    icon: Users,
    desc: "Manage system users accounts permissions",
  },
];