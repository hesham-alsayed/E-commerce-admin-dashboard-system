import { api } from ".";

const PREFIX = "/notifications";

// 📌 Get all notifications
export const getNotifications = async (params) => {
  const res = await api.get(PREFIX, { params });
  return res.data;
};

// 📌 Get single notification
export const getNotification = async (id) => {
  const res = await api.get(`${PREFIX}/${id}`);
  return res.data;
};

// 📌 Create notification
export const createNotification = async (data) => {
  const res = await api.post(PREFIX, data);
  return res.data;
};

// 📌 Update notification (mark as read / edit)
export const updateNotification = async (id, data) => {
  const res = await api.patch(`${PREFIX}/${id}`, data);
  return res.data;
};

// 📌 Delete single notification
export const deleteNotification = async (id) => {
  const res = await api.delete(`${PREFIX}/${id}`);
  return res.data;
};

// 📌 Delete all read notifications
export const deleteReadNotifications = async () => {
  const res = await api.delete(PREFIX);
  return res.data;
};

// 📌 Get unread count
export const getUnreadCount = async () => {
  const res = await api.get(`${PREFIX}/unread-count`);
  return res.data;
};

export const markManyAsRead = async (ids) => {
  const res = await api.patch("/notifications/mark-many-read", {
    ids,
  });

  return res.data;
};
