// app/(dashboard)/users/[id]/page.jsx

import PageInfo from "@/components/PageInfo";
import UserHeader from "./UserHeader";
import SecurityStatus from "./SecurityStatus";
import UserInfoCard from "./UserInfoCard";
import AddressList from "./AddressList";
import UserWishlist from "./UserWishlist";
import { useEffect, useState } from "react";
import { useUsers } from "@/components/hooks/useUsers";
import { useParams } from "react-router-dom";
import UserDetailsSkeleton from "@/components/UserDetailsSkeleton";
import { Button } from "@/components/ui/button";
import UpdateUserModal from "@/components/UpdateUserModal";

export default function UserDetailsPage() {
  const { id } = useParams();
  const { fetchUser, actionLoading, updateUserHandler } = useUsers();

  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleFetchUser = async () => {
      const res = await fetchUser(id);
      setUser(res.data);
    };
    handleFetchUser();
  }, [id]);

  // ✅ HANDLE UPDATE هنا
  const handleUpdateUser = async (formData) => {
    const previousUser = user; // keep backup for rollback

    try {
      setLoading(true);

      // 1️⃣ optimistic update (update UI immediately)
      setUser((prev) => ({
        ...prev,
        ...formData,
      }));

      // 2️⃣ call API
      const data = await updateUserHandler(id, formData);
      console.log(data);
      
      // 3️⃣ sync with server response (optional but recommended)
      setUser(data);
    } catch (err) {
      console.error(err);

      // ❌ rollback if failed
      setUser(previousUser);
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  if (actionLoading && !user) return <UserDetailsSkeleton />;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageInfo head="User Details" title="Manage user profile and data" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <UserHeader user={user} onClickUpdate={() => setOpenModal(true)} />
          <SecurityStatus user={user} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <UserInfoCard user={user} />
          <AddressList user={user} />
          <UserWishlist user={user} />
        </div>
      </div>

      <UpdateUserModal
        open={openModal}
        setOpen={setOpenModal}
        user={user}
        onConfirm={handleUpdateUser}
        loading={loading}
      />
    </div>
  );
}
