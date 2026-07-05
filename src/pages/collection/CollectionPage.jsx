"use client";

import ButtonAdd from "@/components/ButtonAdd";
import PageInfo from "@/components/PageInfo";
import React, { useEffect, useState, useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteModal } from "@/components/DeleteModal";
import DynamicModalCatalog from "@/components/DynamicModalCatalog";
import { motion as _motion } from "framer-motion";

import {
  createCollection,
  deleteCollection,
  getAllCollections,
  updateCollection,
} from "../../components/ِApi/collectionApi";

import { showToast } from "@/lib/utils";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CollectionForm from "./CollectionForm";

export default function CollectionPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // ================= TRUE OPTIMISTIC UPDATES =================
  const addCollectionOptimistic = useCallback((newCollection) => {
    setCollections((prev) => [newCollection, ...prev]);
  }, []);

  const updateCollectionOptimistic = useCallback((updatedCollection) => {
    setCollections((prev) =>
      prev.map((col) =>
        col._id === updatedCollection._id ? updatedCollection : col,
      ),
    );
  }, []);

  const deleteCollectionOptimistic = useCallback((id) => {
    setCollections((prev) => prev.filter((col) => col._id !== id));
  }, []);

  const handleClickEdit = (item) => {
    setEditingCollection(item);
    setIsOpen(true);
  };

  const handleClickDelete = (item) => {
    setEditingCollection(item);
    setIsOpenDelete(true);
  };

  // ================= CREATE - INSTANT UPDATE =================
  const handleCreateCollection = async (data) => {
    try {
      setActionLoading(true);

      // 🚀 OPTIMISTIC: UI updates IMMEDIATELY (<10ms)
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const optimisticCollection = {
        ...data,
        _id: tempId,
        slug: data.name?.toLowerCase().replace(/\s+/g, "-") || "new-collection",
        createdAt: new Date().toISOString(),
        status: data.status || "active",
      };
      addCollectionOptimistic(optimisticCollection);

      // API call (background)
      const created = await createCollection(data);

      // Replace temp with real data
      setCollections((prev) =>
        prev.map((c) =>
          c._id === tempId
            ? { ...created, status: created.status || "active" }
            : c,
        ),
      );

      showToast({
        message: "Collection created successfully",
        type: "success",
      });
    } catch (error) {
      // Revert optimistic update
      await fetchCollections();
      showToast({
        message:
          error?.response?.data?.message || "Failed to create collection",
        type: "error",
      });
    } finally {
      setActionLoading(false);
      setIsOpen(false);
      setEditingCollection(null);
    }
  };

  // ================= UPDATE - INSTANT UPDATE =================
  const handleUpdateCollection = async (data) => {
    try {
      setActionLoading(true);

      // 🚀 OPTIMISTIC: UI updates IMMEDIATELY (<10ms)
      const optimisticCollection = { ...editingCollection, ...data };
      updateCollectionOptimistic(optimisticCollection);

      // API call (background)
      const updated = await updateCollection(editingCollection._id, data);
      updateCollectionOptimistic(updated);

      showToast({
        message: "Collection updated successfully",
        type: "success",
      });
    } catch (error) {
      // Revert optimistic update
      await fetchCollections();
      showToast({
        message:
          error?.response?.data?.message || "Failed to update collection",
        type: "error",
      });
    } finally {
      setActionLoading(false);
      setIsOpen(false);
      setEditingCollection(null);
      console.log(collections);
    }
  };

  // ================= DELETE - INSTANT UPDATE =================
  const handleCollectionDelete = async () => {
    try {
      setActionLoading(true);

      // 🚀 OPTIMISTIC: UI updates IMMEDIATELY (<10ms)
      deleteCollectionOptimistic(editingCollection._id);

      // API call (background)
      await deleteCollection(editingCollection._id);

      showToast({
        message: "Collection deleted successfully",
        type: "success",
      });
    } catch (error) {
      // Revert optimistic update
      await fetchCollections();
      showToast({
        message:
          error?.response?.data?.message || "Failed to delete collection",
        type: "error",
      });
    } finally {
      setActionLoading(false);
      setIsOpenDelete(false);
      setEditingCollection(null);
    }
  };

  // ================= MAIN SUBMIT HANDLER =================
  const handleCollectionSubmit = async (data) => {
    if (editingCollection) {
      await handleUpdateCollection(data);
    } else {
      await handleCreateCollection(data);
    }
    await fetchCollections();
  };

  // ================= FETCH =================
  const fetchCollections = async () => {
    try {
      setLoadingCollections(true);
      const data = await getAllCollections();
      const collections = data.collections;
      setCollections(collections);
    } catch (error) {
      setCollections([]);
      showToast({
        message:
          error?.response?.data?.message || "Failed to fetch collections",
        type: "error",
      });
    } finally {
      setLoadingCollections(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  console.log(collections);

  return (
    <_motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <PageInfo
            head={"Collections"}
            title={"Manage and organize your product collections"}
          />
        </div>

        <div
          onClick={() => {
            setEditingCollection(null);
            setIsOpen(true);
          }}
        >
          <ButtonAdd title="Add Collection" disabled={actionLoading} />
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loadingCollections ? (
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4 bg-white"
              >
                <Skeleton height={20} width="60%" className="mb-3" />
                <Skeleton height={15} width="40%" className="mb-2" />
                <Skeleton count={3} />
              </div>
            ))
        ) : collections.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">
            No data found yet
          </div>
        ) : (
          collections.map((col) => (
            <div
              key={col._id || col.id}
              className={`border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition relative ${
                actionLoading ? "opacity-75 pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{col.name}</h3>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${
                      col.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {col.status}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="p-2 hover:cursor-pointer rounded-full hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-offset-white border border-transparent transition disabled:opacity-50"
                        disabled={actionLoading}
                      >
                        <BsThreeDotsVertical size={18} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-50 bg-white rounded-sm space-y-1 py-4 px-2 border border-gray-200 shadow-none ring-0 focus:outline-none"
                    >
                      <DropdownMenuItem
                        onClick={() => handleClickEdit(col)}
                        className="flex hover:bg-gray-100 py-2 items-center gap-2 cursor-pointer disabled:pointer-events-none"
                        disabled={actionLoading}
                      >
                        <MdEdit /> Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleClickDelete(col)}
                        className="flex items-center gap-2 hover:bg-gray-100 py-2 text-red-500 cursor-pointer disabled:pointer-events-none"
                        disabled={actionLoading}
                      >
                        <AiFillDelete /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-2">/{col.slug}</p>

              <p className="text-sm text-gray-600 line-clamp-3">
                {col.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>Created</span>
                <span>{new Date(col.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODALS */}
      <CollectionForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        editingCollection={editingCollection}
        title="Collection"
        onSubmit={handleCollectionSubmit}
        loading={actionLoading}
      />

      <DeleteModal
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onConfirm={handleCollectionDelete}
        isLoading={actionLoading}
        title="Delete collection"
        itemTitle={editingCollection?.name}
      />
    </_motion.div>
  );
}
