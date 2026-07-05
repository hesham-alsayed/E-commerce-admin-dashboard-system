"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageInfo from "@/components/PageInfo";
import {
  FiShoppingCart,
  FiCreditCard,
  FiUser,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiBell,
  FiEye,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";

import NotificationModal from "@/components/NotificationModal";
import NotificationsFilters from "./NotificationsFilter";
import NotificationsPageSkeleton from "@/components/NotificationsPageSkeleton";
import EmptyNotifications from "@/components/EmptyNotifications";
import { useNotifications } from "@/components/hooks/useNotifications";
import NotificationsPagination from "./NoftificationsPagination";
import { DeleteModal } from "@/components/DeleteModal";
import { showToast } from "@/lib/utils";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";
import NotificationsListSkeleton from "@/components/NotificationsListSkeleton";

const notificationIcons = {
  order_received: FiShoppingCart,
  order_shipped: FiPackage,
  order_delivered: FiCheckCircle,
  payment_processed: FiCreditCard,
  new_user_signup: FiUser,
  low_stock: FiAlertCircle,
  out_of_stock: FiAlertCircle,
  review_received: FiBell,
  site_announcement: FiBell,
  admin_custom: FiBell,
};

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markPageAsRead,
    markAsRead,
    removeNotification,
    pagination,
  } = useNotifications();
  const [actionLoading, setActionLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);

  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    read: "all",
    type: "all",
    target: "all",
    sort: "-createdAt",
  });

  // 🧹 clean filters
  const cleanFilters = useCallback((filters) => {
    const cleaned = {};

    if (filters.search?.trim()) {
      cleaned.search = filters.search.trim();
    }

    if (filters.read && filters.read !== "all") {
      cleaned.read = filters.read === "true";
    }

    if (filters.type && filters.type !== "all") {
      cleaned.type = filters.type;
    }

    if (filters.target && filters.target !== "all") {
      cleaned.target = filters.target;
    }

    if (filters.sort) cleaned.sort = filters.sort;
    if (filters.limit) cleaned.limit = filters.limit;
    if (filters.page) cleaned.page = filters.page;

    return cleaned;
  }, []);

  // 🔄 fetch data when filters change
  useEffect(() => {
    const query = cleanFilters(filters);
    fetchNotifications(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.page,
    filters.limit,
    filters.search,
    filters.read,
    filters.type,
    filters.target,
    filters.sort,
  ]);

  // ✅ Delete handler
  const onClickDelete = (n) => {
    setSelectedDelete(n);
    setOpenDeleteModal(true);
  };

  const handleDeleteNotification = async () => {
    try {
      setLoadingDelete(true);
      await removeNotification(selectedDelete._id);
      setOpenDeleteModal(false);
      setSelectedDelete(null);
      showToast({ message: "deleted successfully", type: "success" });
    } catch (error) {
      showToast({ message: error.response.data.message, type: "error" });
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      console.log("inside");

      setActionLoading(true);
      const ids = notifications.map((n) => n._id);
      await markPageAsRead(ids);
      showToast({ message: "read all success", type: "success" });
    } catch (error) {
      showToast({ message: error.response.data.message, type: "error" });
    } finally {
      setActionLoading(false);
    }
  };
  // 🧠 loading full page
  if (loading && notifications.length === 0) {
    return <NotificationsPageSkeleton />;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <PageInfo
            head="Notifications"
            title="Stay up to date with your latest alerts and messages"
          />
        </div>
        {unreadCount > 0 && (
          <Button
            disabled={actionLoading}
            onClick={handleMarkAllAsRead}
            variant="outline"
            className={"flex items-center gap-2 hover:cursor-pointer"}
          >
            {actionLoading && <LoaderSpinnerButton />}
            <FiCheck className="mr-2 h-4 w-4  " />
            Mark all as read ({unreadCount})
          </Button>
        )}
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl border shadow-sm p-5 space-y-5">
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h2 className="font-semibold text-lg">All Notifications</h2>
            {unreadCount > 0 && (
              <Badge className="bg-green-600 text-white">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          <div>
            <NotificationsPagination
              filters={filters}
              setFilters={setFilters}
              pagination={pagination}
            />
          </div>
        </div>

        {/* FILTERS */}
        <NotificationsFilters filters={filters} setFilters={setFilters} />

        {/* LIST */}
        <div className="space-y-3">
          {loading && notifications.length > 0 ? (
            <NotificationsListSkeleton rows={6} />
          ) : notifications.length === 0 ? (
            <EmptyNotifications />
          ) : (
            notifications.map((n) => {
              const Icon = notificationIcons[n.type] || FiBell;

              return (
                <div
                  key={n._id}
                  className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm
          ${n.read ? "bg-white border-gray-200" : "bg-green-50 border-green-200 shadow-sm"}`}
                >
                  {/* LEFT */}
                  <div className="flex gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0
              ${n.read ? "bg-gray-100" : "bg-green-100"}`}
                    >
                      <Icon
                        size={18}
                        className={n.read ? "text-gray-600" : "text-green-600"}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {n.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {n.message}
                      </p>
                      <span className="text-xs text-gray-400 block mt-1">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center  gap-2 flex-shrink-0">
                    {!n.read && (
                      <Button
                        size="sm"
                        onClick={() => markAsRead(n._id)}
                        className="h-8 w-8 p-0 bg-gray-100 text-black"
                      >
                        <FiCheck size={16} />
                      </Button>
                    )}

                    <Button
                      size="sm"
                      onClick={() => setSelected(n)}
                      className="h-8 w-8 p-0 bg-gray-100 text-black"
                    >
                      <FiEye size={16} />
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => onClickDelete(n)}
                      className="h-8 w-8 p-0 bg-red-50 text-red-600"
                    >
                      <FiTrash2 size={16} />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL */}
      <NotificationModal
        selected={selected}
        onClose={() => setSelected(null)}
      />
      <DeleteModal
        isLoadingDelete={loadingDelete}
        isOpen={openDeleteModal}
        loadingData={loading}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteNotification}
        itemTitle={selectedDelete?.type}
        title={"Notification"}
      />
    </div>
  );
}
