import PageInfo from "@/components/PageInfo";
import { useEffect, useState, useCallback } from "react";
import { motion as _motion } from "framer-motion";
import DropDownCollection from "@/components/DropDownCollection";
import CategoryOrganization from "@/components/CategoryOrganization";
import SubcategoryOrganization from "@/components/SubcategoryOrganization";
import { RiTShirtLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import ProductForm from "@/components/products/prodcutForm/ProductForm";
import { getAllCollections } from "@/components/ِApi/collectionApi";
import { getAllCategories } from "@/components/ِApi/categoryApi";
import { getAllSubCategories } from "@/components/ِApi/subcategoryApi";
import { normalizeVariants, showToast } from "@/lib/utils";
import { createProduct, updateProduct } from "@/components/ِApi/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "@/components/hooks/useProducts";
import useProductVariants from "@/components/hooks/useProductVariants";
import UpdateProductSkelton from "@/components/UpdateProductSkelton";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";

export default function CreateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, loading } = useProducts();
  const [variants, setVariants] = useState([]);
  const variantHandlers = useProductVariants(variants, setVariants);
  const [variantError, setVariantError] = useState("");
  const [product, setProduct] = useState();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [openCollection, setOpenCollection] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorsOrg, setErrorsOrg] = useState({
    collection: null,
    category: null,
    subcategory: null,
  });

  const form = useForm({
    defaultValues: {
      gender: "men",
      type: "clothes",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  // ================= INIT PRODUCT =================

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      const data = await fetchProductById(id);
      const product = data.product;

      setProduct(product);

      const normalized = normalizeVariants(product.variants || []);
      
      setVariants(structuredClone(normalized)); // IMPORTANT

      form.reset({
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        brand: product.brand || "",
        material: product.material || "",
        gender: product.gender || "men",
        type: product.type || "",
      });

      setSelectedCollection(product.collection || null);
      setSelectedCategory(product.category || null);
      setSelectedSubcategory(product.subcategory || null);
    };

    getProduct();
  }, [id]);

  // ================= INIT COLLECTIONS =================
  console.log(product);

  console.log("selectedCategory", selectedCategory);

  useEffect(() => {
    const fetchAllCollections = async () => {
      try {
        const data = await getAllCollections();
        setCollections(data.collections);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCollections();
  }, []);

  // ================= COLLECTION CHANGE =================
  const fetchAllCategories = async (param) => {
    try {
      const data = await getAllCategories(param);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCollectionChange = (collection) => {
    setSelectedCollection(collection);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setErrorsOrg((prev) => ({
      ...prev,
      collection: null,
    }));
    fetchAllCategories({
      collectionId: collection._id,
    });
  };

  // ================= CATEGORY CHANGE =================
  const fetchSubCategories = async (param) => {
    try {
      const data = await getAllSubCategories(param);
      setSubCategories(data.subcategories);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(collections);
  console.log(categories);
  console.log(subCategories);

  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
      setErrorsOrg((prev) => ({
        ...prev,
        category: null,
      }));
      fetchSubCategories({
        categoryId: category._id,
        collectionId: selectedCollection?._id,
      });
    },
    [selectedCollection],
  );

  // ================= SUBCATEGORY =================
  const handleSubcategoryChange = useCallback((sub) => {
    setSelectedSubcategory(sub);
    setErrorsOrg((prev) => ({
      ...prev,
      subcategory: null,
    }));
  }, []);

  const submitHandler = async (data) => {
    try {
      console.log(data, "=>>>>data in submit handler");
      setSubmitLoading(true);
      const formData = new FormData();

      // ✅ clean variants (URL فقط)
      const cleanVariants = variants.map((v) => ({
        color: v.color,
        colorCode: v.colorCode,
        sizes: v.sizes,
        images: v.images.filter((img) => !img.file).map((img) => img.url),
      }));

      const payload = {
        ...data,
        gender: data.gender || "men", // 🔥 FIX HERE
        type: data.type || "",
        collection: selectedCollection._id,
        category: selectedCategory._id,
        subcategory: selectedSubcategory._id,
        variants: cleanVariants,
      };

      formData.append("product", JSON.stringify(payload));

      // ✅ IMPORTANT: mapping files → variants
      const variantIndexArray = [];

      variants.forEach((variant, vIndex) => {
        variant.images.forEach((img) => {
          if (img.file) {
            formData.append("files", img.file);
            variantIndexArray.push(vIndex);
          }
        });
      });

      formData.append("variantIndex", JSON.stringify(variantIndexArray));

      if (id) {
        await updateProduct(id, formData);
        showToast({ message: "product updated success", type: "success" });
      } else {
        await createProduct(formData);
        showToast({ message: "product created success", type: "success" });
      }
      navigate("/admin/commerce/products");
    } catch (err) {
      console.log(err);
      showToast({ message: err.response.data.message, type: "success" });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <UpdateProductSkelton />
      ) : (
        <div className="mb-6 container mx-auto">
          <_motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PageInfo
              head="New Product"
              title="Add a new product to the catalog"
            />
          </_motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-6 ">
            {/* LEFT */}
            <_motion.div className="lg:col-span-4 bg-white border rounded-xl px-2 py-4">
              <ProductForm
                form={form}
                onSubmit={submitHandler}
                variants={variants}
                variantHandlers={variantHandlers}
                variantError={variantError}
                setVariantError={setVariantError}
              />{" "}
            </_motion.div>

            {/* RIGHT */}
            <div className="lg:col-span-2 mt-4 lg:mt-0   ">
              <div className="top-6 bg-white border rounded-xl px-2 py-4">
                <span className=" font-bold">Organization</span>
                <DropDownCollection
                  open={openCollection}
                  setOpen={setOpenCollection}
                  collections={collections}
                  selectedCollection={selectedCollection}
                  handleCollectionChange={handleCollectionChange}
                  setCategories={setCategories}
                  error={errorsOrg.collection}
                />

                <CategoryOrganization
                  isOpen={openCategory}
                  setOpenCategory={setOpenCategory}
                  handleCategoryChange={handleCategoryChange}
                  selectedCategory={selectedCategory}
                  selectedCollection={selectedCollection}
                  categories={categories}
                  setSubCategories={setSubCategories}
                  error={errorsOrg.category}
                />

                <SubcategoryOrganization
                  isOpen={openSubcategory}
                  setOpenSubcategory={setOpenSubcategory}
                  handleSubcategoryChange={handleSubcategoryChange}
                  selectedSubcategory={selectedSubcategory}
                  selectedCategory={selectedCategory}
                  subcategories={subCategories}
                  error={errorsOrg.subcategory}
                />

                <button
                  type="submit"
                  form="create-product-form"
                  disabled={isSubmitting}
                  className="bg-black text-white flex items-center justify-center capitalize hover:cursor-pointer hover:opacity-80 w-full mt-4 py-2 rounded-xl"
                >
                  {submitLoading ? (
                    <LoaderSpinnerButton />
                  ) : id && product ? (
                    "Update product"
                  ) : (
                    "create product"
                  )}
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => setSubmitLoading(false)}
                  className="bg-white border border-gray-300 hover:cursor-pointer hover:bg-gray-50 w-full mt-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
