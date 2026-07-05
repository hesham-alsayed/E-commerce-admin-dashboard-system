/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/preserve-manual-memoization */
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
import { motion as _motion } from "framer-motion";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { showToast } from "@/lib/utils";

import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
} from "@/components/ِApi/subcategoryApi";

import { getAllCategories } from "@/components/ِApi/categoryApi";
import { getAllCollections } from "@/components/ِApi/collectionApi";

import SubCategoryForm from "./SubcategoryForm";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { LucideSlash } from "lucide-react";

export default function SubCategoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);

  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesForm, setCategoriesForm] = useState([]);
  const [categoriesPage, setCategoriesPage] = useState([]);

  const [collectionsForm, setCollectionsForm] = useState([]);
  const [collectionsPage, setCollectionsPage] = useState([]);
  const [selectedCategoryForm, setSelectedCategroyForm] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
  });
  // fetch collection form
  const fetchCollectionsForm = async () => {
    try {
      setLoading(true);
      const data = await getAllCollections();

      setCollectionsForm(data.collections || []);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to fetch collections",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // fetch collections page
  const fetchCollectionsPage = async () => {
    try {
      setLoading(true);
      const data = await getAllCollections();
      setCollectionsPage(data.collections || []);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to fetch collections",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // fetch categories form
  const fetchCategoriesForm = async (collectionId) => {
    try {
      const data = await getAllCategories({
        collectionId: collectionId,
      });

      setCategoriesForm(data.categories || []);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to fetch categories",
        type: "error",
      });
    }
  };

  const fetchCategoriesPage = async (collectionId) => {
    try {
      setLoading(true);
      const data = await getAllCategories({
        collectionId: collectionId,
      });

      setCategoriesPage(data.categories || []);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Failed to fetch categories",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // fetch subcategories
  const fetchSubCategories = useCallback(
    async ({
      page = 1,
      limit = 10,
      categoryId = null,
      collectionId = null,
    } = {}) => {
      try {
        setLoadingSubcategories(true);
        const params = {
          page,
          limit,
        };

        const finalCategoryId = categoryId || selectedCategory?._id;
        const finalCollectionId = collectionId || selectedCollection?._id;

        if (finalCategoryId) {
          params.categoryId = finalCategoryId;
        }

        if (finalCollectionId) {
          params.collectionId = finalCollectionId;
        }

        const data = await getAllSubCategories(params);

        setSubCategories(data?.subcategories || []);
        console.log(data);

        setPagination(data?.pagination || {}); // ✅ fix
      } catch (err) {
        showToast({
          message:
            err?.response?.data?.message || "Failed to fetch subcategories",
          type: "error",
        });
      } finally {
        setLoadingSubcategories(false);
      }
    },
    [selectedCategory?._id, selectedCollection?._id], // ✅ dependencies الصح
  );

  useEffect(() => {
    fetchCollectionsPage();
    fetchCollectionsForm();

    // 🔥 load ALL subcategories initially
    fetchSubCategories({
      page: 1,
      limit: 10,
      categoryId: null,
      collectionId: null,
    });
  }, [fetchSubCategories]);

  const handleCollectionFormChange = useCallback((id) => {
    fetchCategoriesForm(id);
  }, []);

  const handleCollectionPageChange = useCallback(
    (collection) => {
      setSelectedCollection(collection);
      setSelectedCategory(null); // 🔥 مهم جدًا

      fetchCategoriesPage(collection._id);

      fetchSubCategories({
        page: 1,
        limit: 10,
        collectionId: collection._id,
        categoryId: selectedCategory?._id,
      });
    },
    [fetchSubCategories, selectedCategory?._id],
  );

  const handleCategoryPageChange = useCallback(
    (category) => {
      setSelectedCategory(category);

      fetchSubCategories({
        page: 1,
        limit: 10,
        categoryId: category._id,
        collectionId: selectedCollection?._id,
      });
    },
    [fetchSubCategories, selectedCollection?._id],
  );

  console.log(subCategories);

  const handlePageChange = (pageNumber) => {
    fetchSubCategories({
      page: pageNumber,
      categoryId: selectedCategory?._id,
      collectionId: selectedCollection?._id,
    });
  };
  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedCollection(null);
    setSearchTerm("");

    fetchSubCategories({
      page: 1,
      limit: 10,
      categoryId: null,
      collectionId: null,
    });
  };
  // ================= CRUD =================
  const handleEdit = (item) => {
    setEditingSubCategory(item);
    setIsOpen(true);
  };

  const handleDelete = (item) => {
    setEditingSubCategory(item);
    setIsOpenDelete(true);
  };

  const handleSubmit = async (data) => {
    try {
      setActionLoading(true);

      if (editingSubCategory) {
        const updated = await updateSubCategory(editingSubCategory._id, data);
        setSubCategories((prev) =>
          prev.map((i) => (i._id === updated._id ? updated : i)),
        );
        showToast({ message: "Updated successfully", type: "success" });
      } else {
        const created = await createSubCategory(data);
        setSubCategories((prev) => [created, ...prev]);
        showToast({ message: "Created successfully", type: "success" });
      }

      setIsOpen(false);
      setEditingSubCategory(null);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Operation failed",
        type: "error",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setActionLoading(true);
      await deleteSubCategory(editingSubCategory._id);
      setSubCategories((prev) =>
        prev.filter((i) => i._id !== editingSubCategory._id),
      );
      showToast({ message: "Deleted successfully", type: "success" });
      setIsOpenDelete(false);
      setEditingSubCategory(null);
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Delete failed",
        type: "error",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);

      if (!value.trim()) {
        fetchSubCategories({
          page: 1,
          limit: 10,
        });
        return;
      }

      const filtered = subCategories.filter((sub) =>
        sub.name.toLowerCase().includes(value.toLowerCase()),
      );

      setSubCategories(filtered);
    },
    [subCategories, fetchSubCategories],
  );

  console.log(subCategories);

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
            head="Subcategories"
            title="Manage and organize your product subcategories"
          />
        </div>
        <div
          onClick={() => {
            setEditingSubCategory(null);
            setIsOpen(true);
          }}
        >
          <ButtonAdd title="Add Subcategory" disabled={actionLoading} />
        </div>
      </div>
      <div className="flex items-center  gap-4 flex-wrap">
        {/* LEFT SIDE */}
        <div className="flex items-baseline-last gap-10 flex-wrap">
          <div className="space-y-1">
            <Label
              htmlFor="collection"
              className="text-[15px] font-semibold text-gray-800"
            >
              Collection:
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!collectionsPage || loading}
                  className="
                    w-full min-w-56 flex items-center justify-between
                    text-sm font-medium
                    border border-gray-200
                    bg-white hover:bg-gray-50
                    rounded-md px-3 py-2
                    focus:outline-none focus:ring-0 focus-visible:ring-0
                  "
                >
                  <span className="capitalize mr-2 truncate max-w-55">
                    {selectedCollection?.name || "Select collection..."}
                  </span>
                  <IoIosArrowDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={4}
                className="bg-white max-h-75 rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none "
              >
                {collectionsPage.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No collections available
                  </div>
                ) : (
                  collectionsPage.map((collection) => (
                    <DropdownMenuItem
                      key={collection._id}
                      onClick={() => handleCollectionPageChange(collection)}
                      className="flex capitalize p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all w-full"
                    >
                      {collection.name}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* CATEGORY FILTER */}
          <div className="space-y-1">
            <Label
              htmlFor="category"
              className="text-[15px] font-semibold text-gray-800"
            >
              category:
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!selectedCollection}
                  className=" w-50 max-w-full flex items-center justify-between text-sm font-medium border-gray-200 hover:bg-gray-50"
                >
                  <span className="capitalize mr-2 truncate max-w-55">
                    {selectedCategory?.name || "Select category..."}
                  </span>
                  <IoIosArrowDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={4}
                className="bg-white max-h-75 rounded-sm p-2 border border-gray-200 shadow-none ring-0 focus:outline-none "
              >
                {categoriesPage.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No collections available
                  </div>
                ) : (
                  categoriesPage.map((category) => (
                    <DropdownMenuItem
                      key={category._id}
                      onClick={() => handleCategoryPageChange(category)}
                      className="flex capitalize p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all w-full"
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            onClick={resetAllFilters}
            className="bg-gray-50 text-black capitalize border flex items-center gap-4 border-gray-200 hover:cursor-pointer rounded-xl px-4 py-1"
          >
            reset filter
            <RiResetLeftFill />
          </button>
        </div>

        {/* PAGINATION */}
        {/* here  */}
        {/* PAGINATION */}
        <div className="flex items-center gap-1 ml-auto">
          {Array.from({ length: pagination?.numberOfPages || 1 }, (_, i) => {
            const pageNumber = i + 1;
            const isActive = pagination?.currentPage === pageNumber;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-2 py-0.5 border hover:cursor-pointer rounded border-gray-200 transition ${
                  isActive ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center w-80 border border-gray-200 rounded-md px-3 py-2 bg-white gap-2">
        <IoSearch className="text-gray-400 text-lg" />

        <input
          type="text"
          placeholder="Search subcategories..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full text-sm bg-transparent focus:outline-none"
        />
      </div>

      {/* CARDS - PERFECT CATEGORY MATCH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* ✅ 1. Loading Skeleton */}
        {loadingSubcategories &&
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
            ))}

        {/* ✅ 2. Show Data */}
        {!loadingSubcategories &&
          subCategories?.length > 0 &&
          subCategories?.map((sub) => (
            <div
              key={sub?._id}
              className={`border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition relative ${
                actionLoading ? "opacity-75 pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {sub?.name} <LucideSlash size={15} /> {sub?.collection?.name}
                </h3>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${
                      sub.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {sub.status}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="p-2 hover:cursor-pointer rounded-full hover:bg-gray-100 focus:outline-none border border-transparent transition disabled:opacity-50"
                        disabled={actionLoading}
                      >
                        <BsThreeDotsVertical size={18} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-50 bg-white rounded-sm space-y-1 py-4 px-2 border border-gray-200"
                    >
                      <DropdownMenuItem
                        onClick={() => handleEdit(sub)}
                        className="flex hover:bg-gray-100 py-2 items-center gap-2 cursor-pointer"
                      >
                        <MdEdit className="w-4 h-4" /> Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleDelete(sub)}
                        className="flex items-center gap-2 hover:bg-gray-100 py-2 text-red-500 cursor-pointer"
                      >
                        <AiFillDelete className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex gap-2 text-xs mb-2 flex-wrap">
                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                  category : {sub?.category?.name || selectedCategoryForm?.name}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {sub?.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>Created</span>
                <span>{new Date(sub?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}

        {/* ✅ 3. No Data */}
        {!loadingSubcategories && subCategories?.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-10">
            No data found
          </div>
        )}
      </div>

      {/* FORM & DELETE MODAL */}
      <SubCategoryForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        editingSubCategory={editingSubCategory}
        collections={collectionsForm}
        categories={categoriesForm}
        loading={actionLoading}
        onCollectionChange={handleCollectionFormChange}
        updateSelectedCategoryForm={setSelectedCategroyForm} 
      />

      <DeleteModal
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Subcategory"
        itemTitle={editingSubCategory?.name}
        loading={actionLoading}
      />
    </_motion.div>
  );
}
