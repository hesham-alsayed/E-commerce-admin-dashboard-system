import { useContext } from "react";
import { NotificationsContext } from "../context/notifications/NotificationsContext";

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within notifications Provider",
    );
  }
  return context;
};
