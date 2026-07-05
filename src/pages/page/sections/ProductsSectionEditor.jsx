"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import ProductPickerModal from "@/pages/settings/shipping/ProductPickerModal";
import { X } from "lucide-react";

import { useCollections } from "@/components/hooks/useCollections";
import { useCategories } from "@/components/hooks/useCategories";
import { useSubCategories } from "@/components/hooks/useSubcategories";
import { useProducts } from "@/components/hooks/useProducts";

const TYPE_OPTIONS = ["custom", "recommended", "best_selling", "latest"];

export default function ProductsSectionEditor({ section, updateSection }) {
  const props = section.props;
  console.log(section);

  const [openModal, setOpenModal] = useState(false);

  // ================= HOOKS INSIDE COMPONENT =================
  const { collections, fetchCollections } = useCollections();
  const { categories, fetchCategories } = useCategories();
  const { subcategories, fetchSubcategories } = useSubCategories();
  const { products, fetchProducts } = useProducts();

  // ================= UPDATE =================
  const set = (key, value) => {
    updateSection(section.id, {
      ...props,
      [key]: value,
    });
  };
  useEffect(() => {
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(categories);

  useEffect(() => {
    if (props.collection?._id) {
      fetchCategories({
        collectionId: props.collection._id,
        limit: 100,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.category?._id) {
      fetchSubcategories({
        collectionId: props.collection?._id,
        categoryId: props.category._id,
        limit: 100,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (key, value) => {
    // ================= COLLECTION =================
    if (key === "collection") {
      const selectedCollection = collections.find((c) => c._id === value);

      if (!selectedCollection) return;

      const updatedProps = {
        ...props,

        collection: {
          _id: selectedCollection._id,
          name: selectedCollection.name,
          slug: selectedCollection.slug,
        },

        category: {
          _id: "",
          name: "",
          slug: "",
        },

        subCategory: {
          _id: "",
          name: "",
          slug: "",
        },

        products: [],
      };

      updateSection(section.id, updatedProps);

      await fetchCategories({
        collectionId: selectedCollection._id,
        limit: 100,
      });

      return;
    }

    // ================= CATEGORY =================
    if (key === "category") {
      const selectedCategory = categories.find((c) => c._id === value);

      if (!selectedCategory) return;

      const updatedProps = {
        ...props,

        category: {
          _id: selectedCategory._id,
          name: selectedCategory.name,
          slug: selectedCategory.slug,
        },

        subCategory: {
          _id: "",
          name: "",
          slug: "",
        },

        products: [],
      };

      updateSection(section.id, updatedProps);

      // 🔥 fetch subcategories
      await fetchSubcategories({
        collectionId: props.collection?._id,
        categoryId: selectedCategory._id,
        limit: 100,
      });

      // 🔥 fetch products by category
      await fetchProducts({
        collection: props.collection?._id,
        category: selectedCategory._id,
        limit: 20,
      });

      return;
    }

    // ================= SUB CATEGORY =================
    if (key === "subCategory") {
      // ================= ALL =================
      if (value === "all") {
        updateSection(section.id, {
          ...props,

          subCategory: {
            _id: "",
            name: "",
            slug: "",
          },

          products: [],
        });

        // 🔥 fetch products without subcategory filter
        await fetchProducts({
          collection: props.collection?._id,
          category: props.category?._id,
          limit: 20,
        });

        return;
      }

      // ================= NORMAL SUBCATEGORY =================
      const selectedSub = subcategories.find((s) => s._id === value);

      if (!selectedSub) return;

      updateSection(section.id, {
        ...props,

        subCategory: {
          _id: selectedSub._id,
          name: selectedSub.name,
          slug: selectedSub.slug,
        },

        products: [],
      });

      // 🔥 fetch products with subcategory filter
      await fetchProducts({
        collection: props.collection?._id,
        category: props.category?._id,
        subcategory: selectedSub._id,
        limit: 20,
      });

      return;
    }
    // ================= OTHER INPUTS =================
    updateSection(section.id, {
      ...props,
      [key]: value,
    });
  };
  const handleSelectProducts = (items) => {
    set("products", items);
  };

  console.log(collections);

  return (
    <div className="p-4 space-y-6 bg-gray-50/50 rounded-xl border">
      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* TYPE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Products Type</label>
          <Input
            className="w-full border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            value={props.productType ?? ""}
            onChange={(e) => set("productType", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Collection</label>

          <Select
            value={props.collection?._id || ""}
            onValueChange={(val) => handleChange("collection", val)}
          >
            <SelectTrigger className="w-full border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
              {" "}
              <SelectValue
                placeholder={props.collection?.name || "Select collection"}
              />
            </SelectTrigger>

            <SelectContent>
              {collections?.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CATEGORY */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Category</label>

          <Select
            value={props.category?._id || ""}
            onValueChange={(val) => handleChange("category", val)}
            disabled={!props.collection?._id}
          >
            <SelectTrigger className="w-full border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
              {" "}
              <SelectValue
                placeholder={props.category?.name || "Select category"}
              />
            </SelectTrigger>

            <SelectContent>
              {categories?.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* SUB CATEGORY */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Sub Category</label>

          <Select
            value={props.subCategory?._id || "all"}
            onValueChange={(val) => handleChange("subCategory", val)}
            disabled={!props.category?._id}
          >
            <SelectTrigger className="w-full border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
              {" "}
              <SelectValue
                placeholder={props.subCategory?.name || "All Sub Categories"}
              />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Sub Categories</SelectItem>

              {subcategories?.map((s) => (
                <SelectItem key={s._id} value={s._id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div>
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 border rounded bg-white"
        >
          Select Products ({props.products?.length || 0})
        </button>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {props.products?.map((p) => (
            <div key={p._id} className="relative border rounded">
              <button
                onClick={() =>
                  set(
                    "products",
                    props.products.filter((i) => i._id !== p._id),
                  )
                }
                className="absolute top-1 right-1 bg-black text-white w-5 h-5 rounded-full"
              >
                <X size={14} />
              </button>

              <img
                src={p.variants?.[0]?.images?.[0]}
                className="w-full h-24 object-cover"
              />
              <p className="text-xs p-1">{p.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <ProductPickerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        products={products}
        selected={props.products || []}
        onSelect={handleSelectProducts}
      />
    </div>
  );
}
