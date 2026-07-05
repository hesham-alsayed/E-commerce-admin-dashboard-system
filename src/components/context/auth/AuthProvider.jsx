"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  changePassword,
  getMe,
  login,
  logout,
  reSendEmailCode,
  signup,
  verifyEmailCode,
} from "@/components/ِApi/authApi";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  // undefined = checking, null = not logged, object = logged

  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSignUp = async (accountData) => {
    try {
      setLoading(true);
      return await signup(accountData);
    } finally {
      setLoading(false);
    }
  };

  // ================= INIT AUTH =================
  const fetchMe = useCallback(async () => {
    try {
      const res = await getMe();
      const userData = res?.data?.user || res?.user || null;
      setUser(userData);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const check = () => {
      fetchMe();
    };
    check();
  }, [fetchMe]);

  // ================= LOGIN =================
  const fetchLogin = async (data) => {
    try {
      setActionLoading(true);

      const res = await login(data);
      const userData = res?.data?.user || res?.user;
      setUser(userData || null);
      return userData;
    } finally {
      setActionLoading(false);
    }
  };

  // ================= LOGOUT =================
  const fetchLogout = async () => {
    try {
      setActionLoading(true);
      await logout();
      setUser(null);
    } finally {
      setActionLoading(false);
    }
  };

  const fetchVerifyEmailCode = async (email, code) => {
    return await verifyEmailCode(email, code);
  };

  const fetchResendEmailCode = async (email) => {
    return await reSendEmailCode(email);
  };

  const updateMyPassword = async (updatedData) => {
    const data = await changePassword(updatedData);
    return data;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        fetchLogin,
        fetchLogout,
        fetchSignUp,
        actionLoading,
        updateMyPassword,
        fetchVerifyEmailCode,
        fetchResendEmailCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
