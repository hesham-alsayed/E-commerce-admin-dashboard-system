"use client";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getCustomersStats,
  getCustomersSummary,
  getUser,
  getUsersStats,
  updateMe,
  updateUser,
} from "@/components/ِApi/userApi";

import { useCallback, useState } from "react";
import { UserContext } from "./UserContext";
import { showToast } from "@/lib/utils";
import { toast } from "sonner";

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
  });
  /* ================= GET USERS ================= */
  /* ================= GET USERS ================= */
  const fetchUsers = useCallback(async (filters = {}) => {
    try {
      setUsersLoading(true);

      const data = await getAllUsers(filters);

      setUsers(data.data || []);
      setPagination({
        currentPage: data.pagination?.currentPage || 1,
        numberOfPages: data.pagination?.numberOfPages || 1,
      });
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to fetch users",
        type: "error",
      });
    } finally {
      setUsersLoading(false);
    }
  }, []);

  /* ================= STATS FUNCTIONS - FIXED WITH useCallback ================= */
  /* ================= STATS ================= */
  const fetchUsersStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await getUsersStats();

      return data;
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchCustomersStats = useCallback(async () => {
    const data = await getCustomersStats();
    return data;
  }, []);

  const fetchCustomers = async (query) => {
    try {
      console.log("call provider");

      setCustomersLoading(true);
      const res = await getCustomersSummary(query);
      console.log(res);

      console.log(res.data);
      setCustomers(res.data.data);
      return res.data;
    } catch (err) {
      toast.error(err.response.data.message || "Error Fetch customers");
      console.error(err);
    } finally {
      setCustomersLoading(false);
    }
  };
  // Other functions remain the same...
  const updateUserHandler = async (id, payload) => {
    try {
      const res = await updateUser(id, payload);
      await fetchUsers(); // إعادة جلب المستخدمين بعد التحديث لضمان تحديث الحالة بأحدث البيانات
      const updatedUser = res.user;
      showToast({ message: "User updated success", type: "success" });
      return updatedUser;
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Update User failed",
        type: "error",
      });
      throw err;
    }
  };

  

  const createUserHandler = async (data) => {
    try {
      // const previousUsers = [...users]; // حفظ النسخة السابقة من المستخدمين
      setActionLoading(true);
      const res = await createUser(data);
      await fetchUsers(); // إعادة جلب المستخدمين بعد الإنشاء لضمان تحديث الحالة بأحدث البيانات
      const newUser = res.user;
      // setUsers(previousUsers.concat(newUser)); // استخدام النسخة السابقة لتحديث الحالة
      return newUser;
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Create failed",
        type: "error",
      });
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateMe = async (updatedData) => {
    const data = await updateMe(updatedData);
    return data;
  };

  const fetchDeleteUser = async (id) => {
    try {
      const data = await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user._id !== id));

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async (id) => {
    try {
      setActionLoading(true);
      const data = await getUser(id);
      return data;
    } catch (error) {
      toast.error(error.response.data.message || "Error fetch user");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        usersLoading,
        statsLoading,
        actionLoading,
        customersLoading,
        fetchUsers,
        fetchUsersStats,
        fetchCustomersStats,
        fetchCustomers,
        customers,
        pagination,
        setUsers,
        updateUserHandler,
        createUserHandler,
        handleUpdateMe,
        fetchDeleteUser,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
