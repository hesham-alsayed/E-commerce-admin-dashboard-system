import { useContext } from "react";
import { UserContext } from "../context/user/UserContext";

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UsersProvider");
  }
  return context;
};
