import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

import { toast } from "sonner";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const showToast = ({ message, type = "success" }) => {
  let icon = null;
  let style = {};

  if (type === "success") {
    icon = React.createElement(AiOutlineCheck, {
      size: 20,
      className: "text-white", // أيقونة بيضاء
    });
    style = {
      background: "#000", // خلفية سوداء
      color: "#fff", // نص أبيض
      borderRadius: "10px",
      padding: "12px 20px",
      fontWeight: "500",
    };
  } else if (type === "error") {
    icon = React.createElement(AiOutlineClose, {
      size: 20,
      className: "text-white", // لازم تحدد لون الأيقونة
    });
    style = {
      background: "#b91c1c", // bg-red-800
      color: "#fff", // نص أبيض
      borderRadius: "10px",
      padding: "12px 20px",
      fontWeight: "500",
    };
  }

  toast(message, {
    icon,
    style,
    duration: 4000,
  });
};

export const cleanFilters = (filters) => {
  const cleaned = {};

  Object.keys(filters).forEach((key) => {
    const value = filters[key];

    if (
      value === "" ||
      value === "all" ||
      value === null ||
      value === undefined
    ) {
      return;
    }

    cleaned[key] = value;
  });

  return cleaned;
};

export const getCouponStatus = (coupon) => {
  const now = new Date();
  const start = new Date(coupon.startDate);
  const end = new Date(coupon.endDate);

  if (!coupon.active) return "Disabled";

  if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit)
    return "Limit Reached";

  if (now > end) return "Expired";

  if (now < start) return "Pending";

  return "Valid";
};

export const getUsageProgress = (used, limit) => {
  if (!limit || limit === 0) return 0;
  return Math.min((used / limit) * 100, 100);
};

export const formatDateTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const cleanCouponFilters = (filters) => {
  const cleaned = {};

  if (filters.search?.trim()) {
    cleaned.search = filters.search.trim();
  }

  if (filters.type && filters.type !== "all") {
    cleaned.type = filters.type;
  }

  if (filters.active !== "all") {
    cleaned.active = filters.active === "true";
  }

  if (filters.limit) {
    cleaned.limit = filters.limit;
  }

  if (filters.page) {
    cleaned.page = filters.page;
  }

  if (filters.sort) {
    cleaned.sort = filters.sort;
  }

  return cleaned;
};

export const cleanOrderFilters = (filters) => {
  const cleaned = {};

  // ================= SEARCH =================
  if (filters.search?.trim()) {
    cleaned.search = filters.search.trim();
  }

  // ================= ORDER STATUS =================
  if (filters.orderStatus && filters.orderStatus !== "all") {
    cleaned.orderStatus = filters.orderStatus;
  }

  // ================= PAYMENT STATUS =================
  if (filters.paymentStatus && filters.paymentStatus !== "all") {
    cleaned.paymentStatus = filters.paymentStatus;
  }

  // ================= PAYMENT METHOD =================
  if (filters.paymentMethod && filters.paymentMethod !== "all") {
    cleaned.paymentMethod = filters.paymentMethod;
  }

  // ================= COUPON =================
  if (filters.coupon && filters.coupon !== "all") {
    cleaned.coupon =
      filters.coupon === "true"
        ? true
        : filters.coupon === "false"
          ? false
          : undefined;
  }

  // ================= PAGINATION =================
  if (filters.limit) {
    cleaned.limit = Number(filters.limit);
  }

  if (filters.page) {
    cleaned.page = Number(filters.page);
  }

  // ================= SORT =================
  if (filters.sort) {
    cleaned.sort = filters.sort;
  }

  return cleaned;
};

export const cleanInvoiceFilters = (filters = {}) => {
  const query = {};

  // ================= SEARCH (SAFE) =================
  if (typeof filters.search === "string" && filters.search.trim().length > 0) {
    query.search = filters.search.trim();
  }

  // ================= PAYMENT STATUS =================
  if (filters.paymentStatus && filters.paymentStatus !== "all") {
    query.paymentStatus = filters.paymentStatus;
  }

  // ================= PAYMENT METHOD =================
  if (filters.paymentMethod && filters.paymentMethod !== "all") {
    query.paymentMethod = filters.paymentMethod;
  }

  // ================= LIMIT =================
  if (filters.limit != null && filters.limit !== "") {
    query.limit = Number(filters.limit);
  }

  // ================= PAGE =================
  if (filters.page != null && filters.page !== "") {
    query.page = Number(filters.page);
  }

  // ================= SORT =================
  if (filters.sort) {
    query.sort = filters.sort;
  }

  return query;
};

export const cleanReviewFilters = (filters = {}) => {
  const query = {};

  // ================= SEARCH =================
  if (typeof filters.search === "string" && filters.search.trim()) {
    query.search = filters.search.trim();
  }

  // ================= RATING =================
  if (filters.rating && filters.rating !== "all") {
    query.rating = Number(filters.rating);
  }

  // ================= PRODUCT =================
  if (filters.product && filters.product !== "all") {
    query.product = filters.product;
  }

  // ================= LIMIT =================
  if (filters.limit) {
    query.limit = Number(filters.limit);
  }

  // ================= PAGE =================
  if (filters.page) {
    query.page = Number(filters.page);
  }

  // ================= SORT =================
  if (filters.sort) {
    query.sort = filters.sort;
  }

  return query;
};

export const buildPageFormData = (sections) => {
  const formData = new FormData();

  // ================= JSON =================
  formData.append(
    "sections",
    JSON.stringify(
      sections.map((sec) => ({
        ...sec,
        props: {
          ...sec.props,
          _file: undefined,
        },
      })),
    ),
  );

  // ================= FILES =================
  sections.forEach((sec, index) => {
    if (sec.props?._file) {
      formData.append(`image_${index}`, sec.props._file);
    }
  });

  return formData;
};

export const validateProduct = ({
  selectedCollection,
  selectedCategory,
  selectedSubcategory,
  variants,
}) => {
  const errors = {};

  if (!selectedCollection?._id) {
    errors.collection = "Select collection";
  }

  if (!selectedCategory?._id) {
    errors.category = "Select category";
  }

  if (!selectedSubcategory?._id) {
    errors.subcategory = "Select subcategory";
  }

  if (!variants || variants.length === 0) {
    errors.variants = "At least one variant required";
  }

  // validate each variant
  variants.forEach((v, i) => {
    if (!v.color) {
      errors[`variant-${i}`] = "Color is required";
    }

    if (!v.images || v.images.length === 0) {
      errors[`variant-${i}-images`] = "At least one image required";
    }

    if (!v.sizes || v.sizes.length === 0) {
      errors[`variant-${i}-sizes`] = "At least one size required";
    }
  });

  return errors;
};

// utils.js

export const normalizeVariants = (variants) => {
  return variants.map((v) => ({
    ...v,

    // ✅ images (بدون تغيير منطقك)
    images: (v.images || []).map((url) => ({
      url,
      preview: url,
    })),

    // ✅ FIX: normalize sizes
    sizes: Array.isArray(v.sizes)
      ? v.sizes.map((s) => ({
          size: String(s.size || ""),
          stock: Number(s.stock || 0),
        }))
      : [],
  }));
};
export const validateSectionsBeforeSave = (sections) => {
  for (const sec of sections) {
    // ================= BANNER =================
    if (sec.type === "banner") {
      const img = sec.props?.image;

      const hasImage =
        img?.url?.trim() || img?.preview?.trim() || img?.file instanceof File;

      if (!hasImage) {
        showToast({
          message: "Banner must include image",
          type: "error",
        });
        return false;
      }
    }

    // ================= TEXT =================
    if (sec.type === "text") {
      const hasContent = sec.props?.description?.trim();

      if (!hasContent) {
        showToast({
          message: "Text must include content",
          type: "error",
        });
        return false;
      }
    }

    // ================= PRODUCTS (FIXED) =================
    if (sec.type === "products") {
      const products = sec.props?.products;

      if (!Array.isArray(products) || products.length === 0) {
        showToast({
          message: "Products section must include at least one product",
          type: "error",
        });
        return false;
      }
    }
  }

  return true;
};

export const isDiscountValid = (discount) => {
  if (!discount) return false;

  const { isActive, value, startDate, endDate } = discount;

  if (!isActive || !value) return false;

  const now = Date.now();

  if (startDate && new Date(startDate).getTime() > now) return false;
  if (endDate && new Date(endDate).getTime() < now) return false;

  return true;
};

export const getFinalPrice = (price, discount) => {
  if (!isDiscountValid(discount)) return price;

  if (discount.type === "percentage") {
    return price - (price * discount.value) / 100;
  }

  if (discount.type === "fixed") {
    return price - discount.value;
  }

  return price;
};

export const resolveDiscount = (product) => {
  const sub = product?.subcategory?.discount;
  if (sub && isDiscountValid(sub)) {
    return { ...sub, source: "subcategory" };
  }

  const cat = product?.category?.discount;
  if (cat && isDiscountValid(cat)) {
    return { ...cat, source: "category" };
  }

  const col = product?.collection?.discount;
  if (col && isDiscountValid(col)) {
    return { ...col, source: "collection" };
  }

  return null;
};

export const statusStyle = (status) => {
  const map = {
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    processing: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    returned: "bg-orange-100 text-orange-700",
  };

  return map?.[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
};

export const cleanCustomerFilters = (filters) => {
  const cleaned = {};

  // 🔍 search
  if (filters.search?.trim()) {
    cleaned.search = filters.search.trim();
  }

  if (filters.status && filters.status !== "all") {
    cleaned.status = filters.status; // سيبها string
  }

  // sort
  if (filters.sort) cleaned.sort = filters.sort;
  if (filters.order) cleaned.order = filters.order;

  // pagination
  if (filters.limit) cleaned.limit = filters.limit;
  if (filters.page) cleaned.page = filters.page;

  // revenue
  if (filters.revenueGte) cleaned.revenueGte = Number(filters.revenueGte);
  if (filters.revenueLte) cleaned.revenueLte = Number(filters.revenueLte);

  // orders
  if (filters.ordersGte) cleaned.ordersGte = Number(filters.ordersGte);
  if (filters.ordersLte) cleaned.ordersLte = Number(filters.ordersLte);

  return cleaned;
};

export const calculateInvoiceStats = (orders = []) => {
  let totalRevenue = 0;
  let pendingPayments = 0;
  let failedPayments = 0;
  let cancelledLoss = 0;
  let totalInvoices = orders.length;

  orders.forEach((order) => {
    const amount = order.totalPrice || 0;

    // 💳 PAID
    if (order.paymentStatus === "paid") {
      totalRevenue += amount;
    }

    // ⏳ PENDING
    if (order.paymentStatus === "pending") {
      pendingPayments += amount;
    }

    // ❌ FAILED
    if (order.paymentStatus === "failed") {
      failedPayments += amount;
    }

    // 🚫 CANCELLED LOSS
    if (order.orderStatus === "cancelled") {
      cancelledLoss += amount;
    }
  });

  return [
    {
      label: "Total Revenue",
      value: totalRevenue,
      type: "money",
    },
    {
      label: "Pending Payments",
      value: pendingPayments,
      type: "money",
    },
    {
      label: "Failed Payments",
      value: failedPayments,
      type: "money",
    },
    {
      label: "Cancelled Loss",
      value: cancelledLoss,
      type: "money",
    },
    {
      label: "Total Invoices",
      value: totalInvoices,
      type: "count",
    },
  ];
};

export const isCouponActive = (c) => {
  const now = new Date();

  return (
    c.active === true &&
    now >= new Date(c.startDate) &&
    now <= new Date(c.endDate) &&
    (c.usageLimit === 0 || c.usedCount < c.usageLimit)
  );
};
