import { usePages } from "@/components/hooks/usePages";
import PageInfo from "@/components/PageInfo";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageModal } from "../settings/shipping/PageModal";
import { showToast } from "@/lib/utils";
import TablePages from "./TablePages";
import { PartnerTableSkeleton } from "@/components/PartnerTableSkeleton";

export default function MainPage() {
  const { pages, loading, createNewPage, updatePageMetaById } = usePages();

  const [isOpen, setIsOpen] = useState(false);
  const [editPage, setEditPage] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    setEditPage(null);
  };

  const handleSubmit = async (data) => {
    console.log(data);
    try {
      if (editPage) {
        await updatePageMetaById(editPage._id, {
          title: data.title,
          slug: data.slug,
          status: data.status,
        });
        showToast({ message: "page updated success", type: "success" });
        handleClose();
        return;
      }

      const res = await createNewPage(data);

      showToast({ message: "page created success", type: "success" });

      handleClose();

      setTimeout(() => {
        navigate(`/admin/pages/${res.page._id}/builder`);
      }, 500);
    } catch (error) {
      showToast({
        message: error.response?.data?.message,
        type: "error",
      });
    }
  };

  if (!pages || loading) return <PartnerTableSkeleton />;

  return (
    <div>
      <div className="flex justify-between mb-10">
        <div>
          <PageInfo head="Website Pages" title="Manage your store layout" />
        </div>
        <Button
          onClick={() => {
            setEditPage(null);
            setIsOpen(true);
          }}
        >
          Create New Page
        </Button>
      </div>

      {/* MODAL */}
      <PageModal
        open={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={loading}
        initialData={editPage}
        mode={editPage ? "edit" : "create"} // 🔥 IMPORTANT FIX
      />

      {/* TABLE */}
      <TablePages
        pages={pages}
        setEditPage={setEditPage}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
