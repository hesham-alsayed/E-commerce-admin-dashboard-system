/* eslint-disable no-unused-vars */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
} from "@mui/material";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BsThreeDots } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { AiFillDelete, AiOutlineClear } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/DeleteModal";
import FilterSidebar from "@/components/FilterSidebar";
import StockToggle from "@/components/filters/StockFilter";
import CollectionFilter from "./filters/CollectionFilter";
import PriceFilter from "./filters/PriceFilter";
import ButtonsFilters from "./ButtonsFilters";
import { AnimatePresence, motion as _motion } from "framer-motion";
import { useProducts } from "./hooks/useProducts";
import { useCollections } from "./hooks/useCollections";
import ProductsTableSkeleton from "./ProductsTableSkelton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCategories } from "./hooks/useCategories";
import { useSubCategories } from "./hooks/useSubcategories";
import { useCollectionFilter } from "./filters/useCollectionFilter";
import CategoryFilter from "./filters/CategoryFilter";
import SubCategoryFilter from "./filters/SubCategoryFilter";
import { useStockFilter } from "./filters/useStockFilter";
import { useCategoryFilter } from "./filters/useCategoryFilter";
import { useSubcategoryFilter } from "./filters/useSubCategoryFilter";
import { usePriceFilter } from "./filters/usePriceFilter";
import { cleanFilters, showToast } from "@/lib/utils";
import { useSort } from "./filters/useSort";
import { renderIcon } from "./TableHeadSort";
import { useLateSearch } from "./hooks/useLateSearch";
import ProductsPagination from "@/pages/product/ProductPagination";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import { Label } from "./ui/label";

export default function DataTable() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const debouncedSearch = useLateSearch(search, 500);

  const { stock } = useStockFilter();
  const { selectedCollection } = useCollectionFilter();
  const { selectedCategory } = useCategoryFilter();
  const { selectedSubCategories } = useSubcategoryFilter();
  const { minPrice, maxPrice } = usePriceFilter();

  const [limit, setLimit] = useState(40);
  const [page, setPage] = useState(1);

  const {
    products,
    pagination,
    fetchProducts,
    loading: loadingProducts,
    fetchProductById,
    fetchDeleteProduct,
  } = useProducts();

  const { collections, fetchCollections } = useCollections();
  const { categories, fetchCategories } = useCategories();
  const { subcategories, fetchSubcategories } = useSubCategories();
  const { sort, setSort, getSortType } = useSort();

  // =========================
  // 🔥 CENTRAL QUERY BUILDER
  // =========================
  const buildQuery = (extra = {}) => {
    return cleanFilters({
      page,
      limit,
      sort,

      collection: selectedCollection,
      category: selectedCategory,
      subcategory: selectedSubCategories.join(",") || selectedSubCategories[0],

      priceMin: minPrice,
      priceMax: maxPrice,
      stock,

      search: debouncedSearch || "",

      ...extra,
    });
  };

  // =========================
  // SELECT HANDLER
  // =========================
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // =========================
  // PAGINATION FIXED
  // =========================
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);

    fetchProducts(
      buildQuery({
        page: pageNumber,
      }),
    );
  };

  // =========================
  // COLLECTION / CATEGORY
  // =========================
  const handleSelectCollection = (collectionId) => {
    fetchCategories({ collectionId });
  };

  const handleSelectCategory = (categoryId) => {
    fetchSubcategories({
      categoryId,
      collectionId: selectedCollection,
    });
  };

  // =========================
  // INIT LOAD (FIXED)
  // =========================
  useEffect(() => {
    fetchProducts(buildQuery({ page: 1 }));
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCollections, sort, limit]);

  // =========================
  // SEARCH EFFECT (FIXED)
  // =========================
  useEffect(() => {
    const runSearch = async () => {
      try {
        setIsSearching(true);

        const query = buildQuery({
          page: 1,
          search: debouncedSearch,
        });

        await fetchProducts(query);
      } catch (error) {
        console.log(error);
        showToast({
          message: error.response?.data?.message,
          type: "error",
        });
      } finally {
        setIsSearching(false);
      }
    };

    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // =========================
  // APPLY FILTERS
  // =========================
  const handleApplyFilters = async () => {
    try {
      setPage(1);

      const queryParams = buildQuery({ page: 1 });

      await fetchProducts(queryParams);
    } catch (error) {
      showToast({
        message: error.response?.data?.message,
        type: "error",
      });
    } finally {
      setIsFilterOpen(false);
    }
  };

  // =========================
  // CLEAR FILTERS
  // =========================
  const handleClearFilters = async () => {
    try {
      setSearchParams(new URLSearchParams());

      setSearch("");
      setPage(1);

      await fetchProducts(
        buildQuery({
          page: 1,
          search: "",
          collection: "",
          category: "",
          subcategory: "",
          priceMin: "",
          priceMax: "",
          stock: "",
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsFilterOpen(false);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDeleteProduct = async (id) => {
    try {
      setIsLoadingDelete(true);

      await fetchDeleteProduct(id);

      await fetchProducts(buildQuery());

      showToast({
        message: "product deleted success",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error.response?.data?.message,
        type: "error",
      });
    } finally {
      setIsLoadingDelete(false);
      setIsModalOpen(false);
    }
  };

  // =========================
  // VIEW PRODUCT
  // =========================
  const handleViewProduct = async (id) => {
    try {
      const data = await fetchProductById(id);
      console.log(data.product);
    } catch (error) {
      showToast({
        message: error.response?.data?.message,
        type: "error",
      });
    }
  };
  console.log(searchParams);

  return (
    <div className="bg-white border  p-4 rounded-2xl">
      {/* Search + Filter button */}
      <_motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-6 mb-6 "
      >
        <div className="relative w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded-md focus:border-black"
          />

          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        <Button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center justify-between gap-2 px-8 py-1 border rounded-sm hover:cursor-pointer "
        >
          <Filter /> Filter
        </Button>

        {searchParams.size > 0 && (
          <Button
            onClick={handleClearFilters}
            className=" flex items-center text-red-600 hover:text-red-700 bg-red-50 gap-4  hover:cursor-pointer px-2 py-1 rounded-sm"
          >
            Clear Filters <AiOutlineClear />
          </Button>
        )}
        <div className="space-y-2 mb-5">
          <Label className={"capitalize"}>Limit Per Page</Label>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              const newLimit = Number(value);

              setLimit(newLimit);

              fetchProducts({
                page: 1,
                limit: newLimit,
              });
            }}
          >
            <SelectTrigger className="w-30">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="80">80</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <ProductsPagination
            fetchLoading={loadingProducts}
            pagination={pagination}
            onPageChange={(page) => {
              fetchProducts({
                page,
                limit, // 🔥 مهم جدًا
              });
            }}
          />
        </div>
      </_motion.div>

      {/* Table */}
      <AnimatePresence>
        <_motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {loadingProducts ? (
            <ProductsTableSkeleton rows={8} />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead className="bg-gray-100 rounded-xl">
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Subcategory</TableCell>
                    <TableCell
                      onClick={() => setSort("price")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span>Price</span>
                        {renderIcon(getSortType("price"))}
                      </div>
                    </TableCell>
                    <TableCell
                      onClick={() => setSort("stock")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span>Stock</span>
                        {renderIcon(getSortType("stock"))}
                      </div>
                    </TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell
                      onClick={() => setSort("createdAt")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span>Created At</span>
                        {renderIcon(getSortType("createdAt"))}
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <TableRow
                        key={product._id}
                        className="hover:bg-gray-50 hover:cursor-pointer"
                      >
                        <TableCell className="capitalize">
                          {product?.title}
                        </TableCell>
                        <TableCell>
                          <img
                            src={
                              product?.variants?.[0]?.images?.[0] ||
                              "https://via.placeholder.com/40"
                            }
                            alt={product?.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                        </TableCell>
                        <TableCell className="capitalize">
                          {product?.category?.name}
                        </TableCell>
                        <TableCell className="capitalize">
                          {product?.subcategory?.name}
                        </TableCell>
                        <TableCell>${product?.price}</TableCell>
                        <TableCell>{product?.stock}</TableCell>
                        <TableCell>
                          <Chip
                            className="capitalize"
                            label={product?.status}
                            color={
                              product?.status === "Active"
                                ? "default"
                                : "success"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(product?.createdAt).toLocaleString("en-EG")}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div className="hover:bg-gray-100 flex items-center justify-center rounded-full py-2  cursor-pointer">
                                <BsThreeDots className="cursor-pointer" />
                              </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="start"
                              className="mr-12 w-45 border bg-white border-gray-200 shadow-none ring-0 focus:outline-none p-4"
                            >
                              <Link
                                to={`/admin/commerce/product-details/${product._id}`}
                              >
                                <DropdownMenuItem className="flex p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all ">
                                  <GrView /> Show Details
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(
                                    `/admin/commerce/products/update/${product._id}`,
                                  )
                                }
                                className="flex p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all"
                              >
                                <MdEdit /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setIsModalOpen(true);
                                }}
                                className="flex p-2 items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all text-red-500"
                              >
                                <AiFillDelete /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} align="center">
                        <p className="text-gray-600 capitalize font-bold text-[16px]">
                          No products found
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </_motion.div>
      </AnimatePresence>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDeleteProduct(selectedProduct?._id)}
        isLoadingDelete={isLoadingDelete}
        loadingProducts={loadingProducts}
        title="Delete Product"
        itemTitle={selectedProduct?.title}
      />
      {/* Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <StockToggle />
        <CollectionFilter
          collections={collections}
          handleSelectCollection={handleSelectCollection}
        />
        <CategoryFilter
          categories={categories}
          handleSelectCategory={handleSelectCategory}
          selectedCollection={selectedCollection}
        />
        <SubCategoryFilter subcategories={subcategories} />
        <PriceFilter />
        <ButtonsFilters
          handleApply={handleApplyFilters}
          handleClear={handleClearFilters}
          loading={loadingProducts}
        />
      </FilterSidebar>
    </div>
  );
}
