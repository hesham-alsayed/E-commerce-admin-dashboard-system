"use client";

import ButtonAdd from "@/components/ButtonAdd";
import { CurrentPath } from "@/components/CurrentPath";
import React, {  useState } from "react";
import DataTable from "../../components/DataTable";
import { DeleteModal } from "@/components/DeleteModal";
import PageInfo from "@/components/PageInfo";
import { motion as _motion } from "framer-motion";

export default function ProductsPage() {
  const [deleteItem, setDeleteItem] = useState(null);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <_motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between"
      >
        <div className="flex flex-col gap-2">
          <PageInfo
            head={"Products"}
            title={"Browse and manage your products"}
          />
        </div>
        <ButtonAdd
          title="add product"
          navigate={"/admin/commerce/products/new"}
        />
      </_motion.div>

      {/* DATA TABLE */}
      <div className="py-2 ">
        <DataTable  />
        <DeleteModal
          isOpen={!!deleteItem}
          onClose={() => setDeleteItem(null)}
          // onConfirm={confirmDelete}
          title="Delete Product"
          itemTitle={deleteItem?.title}
        />
      </div>
    </div>
  );
}
