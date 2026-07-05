/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useUsers } from "@/components/hooks/useUsers";
import PageInfo from "@/components/PageInfo";
import UsersPageSkeleton from "@/components/UsersPageSkeleton";

import UsersStatsCards from "./UsersStatsCards";
import UserFilters from "./UsersFilter";
import UsersTable from "./UsersTable";

import UsersTableSkeleton from "@/components/UsersTableSkeleton";
import UsersStatsCardsSkeleton from "@/components/UsersStatsCardsSkeleton";
import UsersPagination from "./UsersPagination";
import ControlUserModal from "@/components/ControlUserModal";
import { showToast } from "@/lib/utils";
import { DeleteModal } from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateUserModal } from "@/components/CreateUserModal";

export default function UsersPage() {
  const {
    fetchUsersStats,
    fetchUsers,
    users,
    usersLoading,
    pagination,
    fetchDeleteUser,
    createUserHandler,
  } = useUsers();

  const { users: usersData } = users;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [userDeleting, setUserDeleting] = useState(null);
  const [userEdit, setUserEdit] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [statsData, setStatsData] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    role: "all",
    isActive: "all",
    isVerified: "all",
    sort: "-createdAt",
  });

  // ================= INIT FROM URL =================
  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page") || 1),
      limit: Number(searchParams.get("limit") || 10),
      search: searchParams.get("search") || "",
      role: searchParams.get("role") || "all",
      isActive: searchParams.get("isActive") || "all",
      isVerified: searchParams.get("isVerified") || "all",
      sort: searchParams.get("sort") || "-createdAt",
    });
  }, []);

  // ================= SYNC FILTERS → URL =================
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);

    if (filters.role && filters.role !== "all")
      params.set("role", filters.role);

    if (filters.isActive && filters.isActive !== "all")
      params.set("isActive", filters.isActive);

    if (filters.isVerified && filters.isVerified !== "all")
      params.set("isVerified", filters.isVerified);

    if (filters.sort) params.set("sort", filters.sort);

    if (filters.page && filters.page !== 1)
      params.set("page", String(filters.page));

    if (filters.limit && filters.limit !== 10)
      params.set("limit", String(filters.limit));

    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);

  // ================= CLEAN QUERY =================
  const finalQuery = useMemo(() => {
    const cleaned = {};

    if (filters.search?.trim()) cleaned.search = filters.search;
    if (filters.role && filters.role !== "all") cleaned.role = filters.role;
    if (filters.isActive && filters.isActive !== "all")
      cleaned.isActive = filters.isActive;
    if (filters.isVerified && filters.isVerified !== "all")
      cleaned.isVerified = filters.isVerified;

    cleaned.page = filters.page;
    cleaned.limit = filters.limit;
    cleaned.sort = filters.sort;

    return cleaned;
  }, [filters]);

  // ================= FETCH USERS =================
  useEffect(() => {
    fetchUsers(finalQuery);
  }, [finalQuery, fetchUsers]);

  // ================= STATS =================
  useEffect(() => {
    const load = async () => {
      const res = await fetchUsersStats();
      setStatsData(res.data);
    };

    load();
  }, [fetchUsersStats]);

  // ================= ACTIONS =================
  const onClickDelete = (user) => {
    setUserDeleting(user);
    setOpenDelete(true);
  };

  const onClickEdit = (user) => {
    setUserEdit(user);
    setOpenEdit(true);
  };

  const handleDeleteUser = async () => {
    try {
      setLoadingDelete(true);
      await fetchDeleteUser(userDeleting._id);
      showToast({ message: "User UnActivated", type: "success" });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message,
        type: "error",
      });
    } finally {
      setLoadingDelete(false);
      setOpenDelete(false);
      setUserDeleting(null);
    }
  };

  const handleCreateUser = async (payload) => {
    try {
      setLoadingCreate(true);
      await createUserHandler(payload);
      showToast({ message: "User Created success", type: "success" });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message,
        type: "error",
      });
    } finally {
      setLoadingCreate(false);
      setOpenCreate(false);
    }
  };

  if (usersLoading && !usersData?.length) return <UsersPageSkeleton />;

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <PageInfo
            head="All Users"
            title="Show and Control of All users with different roles"
          />
        </div>

        <Button
          onClick={() => setOpenCreate(true)}
          className="hover:cursor-pointer hover:opacity-85"
        >
          <Plus /> Add new user
        </Button>
      </div>

      {/* STATS */}
      {statsData ? (
        <UsersStatsCards data={statsData} />
      ) : (
        <UsersStatsCardsSkeleton />
      )}

      {/* TABLE SECTION */}
      <div className="space-y-5 rounded-xl mt-10 bg-white p-4">
        <UserFilters filters={filters} setFilters={setFilters} />

        <div className="flex items-end justify-end">
          <UsersPagination
            filters={filters}
            pagination={pagination}
            fetchLoading={usersLoading}
            setFilters={setFilters}
          />
        </div>

        {usersLoading ? (
          <UsersTableSkeleton />
        ) : (
          <UsersTable
            onClickDelete={onClickDelete}
            onClickEdit={onClickEdit}
            users={usersData}
          />
        )}
      </div>

      {/* MODALS */}
      <ControlUserModal open={openEdit} setOpen={setOpenEdit} user={userEdit} />

      <DeleteModal
        isLoadingDelete={loadingDelete}
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        loadingData={usersLoading}
        onConfirm={handleDeleteUser}
        itemTitle={userDeleting?._id}
        title={"User"}
      />

      <CreateUserModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreateUser={handleCreateUser}
        loadingCreate={loadingCreate}
      />
    </div>
  );
}
