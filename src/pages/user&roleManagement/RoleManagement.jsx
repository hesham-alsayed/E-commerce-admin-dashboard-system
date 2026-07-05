/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import { Shield, Users, Lock, UserRound, UserPlus } from "lucide-react";

import RoleCardStats from "./RoleCardStats";
import PageInfo from "@/components/PageInfo";
import { Button } from "@/components/ui/button";
import RoleTable from "./RoleTable";
import { ChangeRoleModal } from "./ChangeRoleModal";
import { useUsers } from "@/components/hooks/useUsers";
import { cleanFilters, showToast } from "@/lib/utils";
import { CreateUserModal } from "@/components/CreateUserModal";
import { RolePageSkeleton } from "@/components/RolePageSkelton";
import UserRoleFilters from "@/components/UserRoleFilters";
import { useLateSearch } from "@/components/hooks/useLateSearch";
import { TableRoleSkeleton } from "@/components/TableRoleSkelton";
import RolePagination from "./RolePagination";
import PartnerPagination from "../partner/PartnerPagination";
import { useSearchParams } from "react-router-dom";
import { changeUserRole } from "@/components/ِApi/userApi";

export default function RolesPage() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // ================= FILTERS =================
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    isActive: "",
    sort: "desc",
    page: 1,
    limit: 10,
  });

  const debouncedSearch = useLateSearch(filters.search, 1000);

  const { users, fetchUsers, createUserHandler, usersLoading, pagination } =
    useUsers();

  const { users: usersData, stats } = users;
  const [loading, setLoading] = useState(false);
  const roles = [
    {
      title: "All Users",
      description: "Total registered users",
      count: stats?.totalUsers,
      Icon: UserRound,
    },
    {
      title: "Customers",
      description: "All customers accounts",
      count: stats?.totalNormalUsers,
      Icon: Users,
    },
    {
      title: "Admins",
      description: "System administrators",
      count: stats?.totalAdmins,
      Icon: Shield,
    },
  ];

  // ================= INIT FROM URL (ONE TIME) =================
  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      role: searchParams.get("role") || "",
      isActive: searchParams.get("isActive") || "",
      sort: searchParams.get("sort") || "desc",
      page: Number(searchParams.get("page") || 1),
      limit: Number(searchParams.get("limit") || 10),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================= FILTERS -> URL SYNC =================
  useEffect(() => {
    const cleaned = cleanFilters(filters);

    const params = new URLSearchParams();

    Object.keys(cleaned).forEach((key) => {
      params.set(key, cleaned[key]);
    });

    setSearchParams(params);
  }, [filters]);

  // ================= FETCH USERS =================
  useEffect(() => {
    const query = {
      role: filters.role,
      isActive: filters.isActive,
      page: filters.page,
      limit: filters.limit,
      search: debouncedSearch?.trim(),
      sort: filters.sort === "asc" ? "createdAt" : "-createdAt",
    };

    fetchUsers(cleanFilters(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.limit,
    filters.page,
    filters.role,
    filters.isActive,
    filters.sort,
    debouncedSearch,
  ]);

  // ================= RESET PAGE ON FILTER CHANGE =================
  useEffect(() => {
    setFilters((prev) => {
      if (prev.page === 1) return prev;

      return {
        ...prev,
        page: 1,
      };
    });
  }, [filters.role, filters.isActive, filters.sort, debouncedSearch]);

  // ================= MODAL =================
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleChangeRole = async (userId, data) => {
    try {
      console.log(data);
      setLoading(true);
      await changeUserRole(userId, data.role);
      await fetchUsers();
      showToast({
        message: "Role updated successfully",
        type: "success",
      });

      setOpen(false);
      setSelectedUser(null);
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Error",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmCreateUser = async (data) => {
    try {
      await createUserHandler(data);

      showToast({
        message: "User created successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Error",
        type: "error",
      });
    }
  };

  // ================= LOADING =================
  if (usersLoading && usersData?.length === 0) return <RolePageSkeleton />;

  return (
    <div className="container mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <PageInfo
            head="User & Role Management"
            title="Manage users, roles and permissions"
          />
        </div>

        <Button onClick={() => setOpenModal(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button>

        <CreateUserModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onCreateUser={confirmCreateUser}
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <RoleCardStats key={role.title} {...role} />
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="bg-white rounded-sm border border-gray-300 space-y-6 p-4">
        {/* PAGINATION */}
        <div className="flex items-end">
          <PartnerPagination
            fetchLoading={usersLoading}
            filters={filters}
            setFilters={setFilters}
            pagination={pagination}
          />
        </div>

        {/* FILTERS */}
        <UserRoleFilters filters={filters} setFilters={setFilters} />

        {/* TABLE */}
        {usersLoading && usersData?.length > 0 ? (
          <TableRoleSkeleton />
        ) : (
          <RoleTable users={usersData} onChangeRole={handleOpenModal} />
        )}
      </div>

      {/* MODAL */}
      <ChangeRoleModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleChangeRole}
        user={selectedUser}
        loading={loading}
      />
    </div>
  );
}
