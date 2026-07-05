"use client";

import { useCallback, useState } from "react";
import { NotificationsContext } from "./NotificationsContext";
import {
  deleteNotification,
  getNotifications,
  getUnreadCount,
  markManyAsRead,
  updateNotification,
} from "@/components/ِApi/notificationsApi";

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
  });
  // 🔄 fetch all notifications
  const fetchNotifications = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const data = await getNotifications(params);
      setNotifications(data.notifications || []);
      setPagination({
        currentPage: data.pagination.currentPage,
        numberOfPages: data.pagination.numberOfPages,
      });
      // Update unread count from fetched data
      const unread = (data.notifications || []).filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Fetch notifications error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔄 fetch unread count separately
  const fetchUnreadCount = useCallback(async () => {
    try {
      const data = await getUnreadCount();
      setUnreadCount(data.count || 0);
    } catch (err) {
      console.error("Fetch unread count error:", err);
    }
  }, []);

  const removeNotification = useCallback(async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => {
        const newNotifications = prev.filter((n) => n._id !== id);
        // Update unread count
        const newUnreadCount = newNotifications.filter((n) => !n.read).length;
        setUnreadCount(newUnreadCount);
        return newNotifications;
      });
    } catch (err) {
      console.error("Delete notification error:", err);
    }
  }, []);

  // ✅ mark as read
  const markAsRead = useCallback(async (id) => {
    try {
      await updateNotification(id, { read: true });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
      // Update unread count
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  }, []);

  // ✅ mark all as read
  const markPageAsRead = async (ids) => {
    try {
      await markManyAsRead(ids);
      setNotifications((prev) =>
        prev.map((n) => (ids.includes(n._id) ? { ...n, read: true } : n)),
      );

      setUnreadCount((prev) => Math.max(0, prev - ids.length));
    } catch (err) {
      console.error("Mark many as read error:", err);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        fetchUnreadCount,
        removeNotification,
        markAsRead,
        markPageAsRead,
        pagination,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
