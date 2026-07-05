/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import ButtonAdd from "@/components/ButtonAdd";
import PageInfo from "@/components/PageInfo";
import React, { useEffect, useState, useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
// import imageNotResultFound from "../../assets/no-result-found.webp";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteModal } from "@/components/DeleteModal";
import DynamicModalCatalog from "@/components/DynamicModalCatalog";
import { motion as _motion } from "framer-motion";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { showToast } from "@/lib/utils";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/components/ِApi/categoryApi";

import { getAllCollections } from "@/components/ِApi/collectionApi";
import CategoryForm from "./CategroyForm";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";

export default function CategoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [collections, setCollections] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
  });
  // ================= TRUE OPTIMISTIC UPDATES =================
  const addCategoryOptimistic = useCallback((newCategory) => {
    setCategories((prev) => [newCategory, ...prev]);
  }, []);

  const updateCategoryOptimistic = useCallback((updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat,
      ),
    );
  }, []);

  const deleteCategoryOptimistic = useCallback((id) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
  }, []);

  const handleClickEdit = (item) => {
    setEditingCategory(item);
    setIsOpen(true);
  };

  const handleClickDelete = (item) => {
    setEditingCategory(item);
    setIsOpenDelete(true);
  };

  // ================= CREATE - INSTANT UPDATE =================
  const handleCreateCategory = async (data) => {
    try {
      setActionLoading(true);

      // 🚀 OPTIMISTIC: UI updates IMMEDIATELY (<10ms)
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const optimisticCategory = {
        ...data,
        _id: tempId,
        slug: data.name?.toLowerCase().replace(/\s+/g, "-") || "new-category",
        createdAt: new Date().toISOString(),
        status: data.status || "active",
      };
      addCategoryOptimistic(optimisticCategory);

      // API call (background)
      const created = await createCategory(data);

      // Replace temp with real data
      setCategories((prev) =>
        prev.map((c) =>
          c._id === tempId
            ? { ...created, status: created.status || "active" }
            : c,
        ),
      );

      showToast({
        message: "Category created successfully",
        type: "success",
      });
    } catch (error) {
      // Revert optimistic update
      await fetchCategories();
      showToast({
        message: error?.response?.data?.message || "Failed to create category",
        type: "error",
      });
    } finally {
      setActionLoading(false);
      setIsOpen(false);
      setEditingCategory(null);
    }
  };

  // ================= UPDATE - INSTANT UPDATE =================
  const handleUpdateCategory = async (data) => {
    try {
      setActionLoading(true);

      // 🚀 OPTIMISTIC: UI updates IMMEDIATELY (<10ms)
      const optimisticCategory = { ...editingCategory, ...data };
      updateCategoryOptimistic(optimisticCategory);

      // API call (background)
      const updated = await updateCategory(editingCategory._id, data);
      updateCategoryOptimistic(updated);

      showToast({
        message: "Category updated successfully",
        type: "success",
      });
    } catch (error) {
      // Revert optimistic update
      await fetchCategories();
      showToast({
        message: error?.response?.data?.message || "Failed to update category",
        type: "error",
      });
    } finally {
      setActionLoading(false);
      setIsOpen(false);
      setEditingCategory(null);
    }
  };

  // ================= DELETE - INSTANT UPDATE =================
  const handleCategoryDelete = async () => {
    try {
      setActionLoading(true);

      // 🚀 OPTIMISTIC: UI updates IMMEDIATELY (<10ms)
      deleteCategoryOptimistic(editingCategory._id);

      // API call (background)
      await deleteCategory(editingCategory._id);

      showToast({
        message: "Category deleted successfully",
        type: "success",
      });
    } catch (error) {
      // Revert optimistic update
      await fetchCategories();
      showToast({
        message: error?.response?.data?.message || "Failed to delete category",
        type: "error",
      });
    } finally {
      setActionLoading(false);
      setIsOpenDelete(false);
      setEditingCategory(null);
    }
  };

  // ================= MAIN SUBMIT HANDLER =================
  const handleCategorySubmit = async (data) => {
    if (editingCategory) {
      await handleUpdateCategory(data);
    } else {
      await handleCreateCategory(data);
    }
  };

  // ================= FETCH =================
  const fetchCollections = async () => {
    try {
      const data = await getAllCollections();
      setCollections(data.collections || []);
    } catch (error) {
      console.error("Collections fetch error:", error);
    }
  };

  const fetchCategories = useCallback(
    async (defaultPage = 1, collectionIdParam = selectedCollection?._id) => {
      try {
        setLoadingCategories(true);
        const params = {
          page: defaultPage,
          limit: 6,
        };

        if (collectionIdParam) {
          params.collectionId = collectionIdParam;
        }

        const data = await getAllCategories(params);
        console.log(data);

        setCategories(data?.categories || []);
        setAllCategories(data?.categories || []); // 👈 أهم سطر
        setPagination({
          currentPage: data?.pagination?.currentPage || 1,
          numberOfPages: data?.pagination?.numberOfPages || 1,
        });

        setPage(data?.pagination?.currentPage || 1);
      } catch (error) {
        setCategories([]);
        setAllCategories([]);
        showToast({
          message:
            error?.response?.data?.message || "Failed to fetch categories",
          type: "error",
        });
      } finally {
        setLoadingCategories(false);
      }
    },
    [selectedCollection?._id],
  );

  const handleFilterCollection = (collection) => {
    setSelectedCollection(collection);
    setPage(1);
    fetchCategories(1, collection?._id);
  };

  // ================= HELPER =================

  useEffect(() => {
    fetchCollections();
    fetchCategories(page);
  }, [page, selectedCollection?._id, fetchCategories]);

  const handleSearchCategory = (value) => {
    setSearchKeyword(value);

    if (!value) {
      setCategories(allCategories); // return origin
      return;
    }

    const filtered = allCategories.filter((cat) =>
      cat.name.toLowerCase().includes(value.toLowerCase()),
    );

    setCategories(filtered);
  };
  console.log(categories);

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
            head="Categories"
            title="Manage and organize your product categories"
          />
        </div>
        <div
          onClick={() => {
            setEditingCategory(null);
            setIsOpen(true);
          }}
        >
          <ButtonAdd title="Add Category" disabled={actionLoading} />
        </div>
      </div>

      <div className="flex items-center  gap-4 flex-wrap">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-30 flex-wrap">
          {/* COLLECTION FILTER */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-gray-700">
              Collection:
            </Label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  disabled={!collections.length}
                  variant="outline"
                  className="
                    w-full min-w-40 flex items-center justify-between
                    text-sm font-medium
                    border border-gray-200
                    bg-white hover:bg-gray-50
                    rounded-md px-3 py-2
                    focus:outline-none focus:ring-0 focus-visible:ring-0
                  "
                >
                  <span className="truncate">
                    {selectedCollection?.name || "All Collections"}
                  </span>
                  <IoIosArrowDown />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                sideOffset={4}
                className="bg-white max-h-75 rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none "
              >
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedCollection(null);
                    fetchCategories(1);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  All Collections
                </DropdownMenuItem>

                {collections.map((c) => (
                  <DropdownMenuItem
                    key={c._id}
                    onClick={() => handleFilterCollection(c)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {c.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* SEARCH */}
          <div className="flex w-80 items-center gap-2 border border-gray-200 rounded-md px-2 py-1 bg-white">
            <Label className="text-sm font-medium text-gray-700">
              Collection:
            </Label>

            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => handleSearchCategory(e.target.value)}
              placeholder="Search..."
              className="h-8 w-40 text-sm bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT SIDE PAGINATION */}
        <div className="flex items-center gap-1 ml-auto">
          {Array.from({ length: pagination.numberOfPages }, (_, i) => {
            const pageNumber = i + 1;
            const isActive = pagination.currentPage === pageNumber;

            return (
              <button
                key={pageNumber}
                onClick={() => fetchCategories(pageNumber)}
                className={`px-2 py-0.5 border rounded  hover:cursor-pointer border-gray-200 ${
                  isActive ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loadingCategories ? (
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
        ) : categories.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">
            No data found yet
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id || cat.id}
              className={`border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition relative ${
                actionLoading ? "opacity-75 pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{cat.name}</h3>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${
                      cat.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {cat.status}
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
                        onClick={() => handleClickEdit(cat)}
                        className="flex hover:bg-gray-100 py-2 items-center gap-2 cursor-pointer disabled:pointer-events-none"
                        disabled={actionLoading}
                      >
                        <MdEdit /> Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleClickDelete(cat)}
                        className="flex items-center gap-2 hover:bg-gray-100 py-2 text-red-500 cursor-pointer disabled:pointer-events-none"
                        disabled={actionLoading}
                      >
                        <AiFillDelete /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-2">
                Collection: {cat.collection.name}
              </p>

              <p className="text-sm text-gray-600 line-clamp-3">
                {cat.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>Created</span>
                <span>{new Date(cat.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODALS */}
      <CategoryForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        editingCategory={editingCategory} 
        collections={collections} 
        onSubmit={handleCategorySubmit}
        loading={actionLoading}
      />

      <DeleteModal
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onConfirm={handleCategoryDelete}
        isLoading={actionLoading}
        title="Delete Category"
        itemTitle={editingCategory?.name}
      />
    </_motion.div>
  );
}
