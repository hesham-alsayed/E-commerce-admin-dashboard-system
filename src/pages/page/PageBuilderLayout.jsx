"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
  Image,
  Layout,
  Type,
  Save,
} from "lucide-react";

import BannerSectionEditor from "./sections/BannerSectionEditor";
import ProductsSectionEditor from "./sections/ProductsSectionEditor";
import TextSectionEditor from "./sections/TextSectionEditor";
import { api } from "@/components/ِApi";
import { showToast, validateSectionsBeforeSave } from "@/lib/utils";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";
import { DeleteModal } from "@/components/DeleteModal";
import { usePages } from "@/components/hooks/usePages";
import { PageBuilderSkeleton } from "@/components/PageBuilderSkeleton";

const SECTION_TYPES = [
  { key: "banner", label: "Banner", icon: Image },
  { key: "products", label: "Products", icon: Layout },
  { key: "text", label: "Text", icon: Type },
];

export default function PageBuilderLayout() {
  const { pageId } = useParams();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);

  const [activeSectionId, setActiveSectionId] = useState(null);
  const [open, setOpen] = useState(true);

  const [deletingSection, setDeletingSection] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { deletePageSection, loading: actionLoading } = usePages();

  // ================= LOAD COLLECTIONS =================

  // ================= LOAD PAGE =================
  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/pages/${pageId}`);

        const normalized = res.data.page.sections.map((sec) => ({
          ...sec,
          id: sec.id || sec._id,
        }));

        setSections(normalized);

        const active = normalized.find((s) => s.type === "banner");
        setActiveSectionId(active?.id || normalized?.[0]?.id || null);
      } catch (err) {
        console.log(err);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pageId]);

  const createSection = (type) => {
    const base = {
      id: crypto.randomUUID(),
      type,
      order: sections.length,
    };

    switch (type) {
      case "banner":
        return {
          ...base,
          props: {
            title: "",
            subtitle: "",
            description: "",
            image: {
              url: "",
              file: null,
            },
            buttonText: "",
            buttonLink: "",
          },
        };

      case "text":
        return {
          ...base,
          props: {
            title: "",
            description: "",
            buttonText: "",
            buttonLink: "",
          },
        };

      case "products":
        return {
          ...base,
          props: {
            collection: {
              _id: "",
              name: "",
              slug: "",
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
            productType: "recommended",
            limit: 8,
            loading: false,
          },
        };

      default:
        return { ...base, props: {} };
    }
  };

  // ================= ADD =================
  const addSection = (type) => {
    const newSection = createSection(type);

    setSections((prev) => [...prev, newSection]);
    setActiveSectionId(newSection.id);
  };

  console.log(sections);

  // ================= UPDATE =================
  const updateSection = (id, newProps) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === id ? { ...sec, props: { ...sec.props, ...newProps } } : sec,
      ),
    );
  };

  const onClickDelete = (id) => {
    setDeletingSection(id);
    setOpenModalDelete(true);
  };

  const getNextActiveSection = (sections, deletedId) => {
    const index = sections.findIndex((s) => s.id === deletedId);

    // remove deleted
    const updated = sections.filter((s) => s.id !== deletedId);

    // next section
    const next = updated[index] || updated[index - 1] || updated[0];

    return {
      updatedSections: updated,
      nextActiveId: next?.id || null,
    };
  };
  // ================= DELETE =================
  const deleteSection = async () => {
    try {
      await deletePageSection(pageId, deletingSection);

      setSections((prev) => {
        const { updatedSections, nextActiveId } = getNextActiveSection(
          prev,
          deletingSection,
        );

        setActiveSectionId(nextActiveId);

        return updatedSections;
      });

      setOpenModalDelete(false);
      setDeletingSection(null);
      showToast({
        message: "Section deleted successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Delete failed",
        type: "error",
      });
    }
  };

  // ================= SAVE =================
  const savePage = async () => {
    try {
      setLoadingSave(true);

      // ✅ VALIDATION HERE
      const isValid = validateSectionsBeforeSave(sections);
      if (!isValid) return;

      const formData = new FormData();

      const cleanSections = sections.map((sec) => {
        let props = { ...sec.props };

        if (sec.type === "banner") {
          const image = sec.props?.image;

          if (image?.file instanceof File) {
            formData.append(`images[${sec.id}]`, image.file);
          }

          props.image = {
            url: image?.url || "",
          };
        }

        return {
          id: sec.id,
          type: sec.type,
          order: sec.order,
          props,
        };
      });

      formData.append("sections", JSON.stringify(cleanSections));

      await api.put(`/pages/${pageId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast({ message: "Saved successfully", type: "success" });
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Error",
        type: "error",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  if (loading) return <PageBuilderSkeleton open={open} />;

  const activeSection = sections.find((s) => s.id === activeSectionId);
  const hasInvalidProducts = (sections) => {
    return sections.some((sec) => {
      if (sec.type !== "products") return false;

      return !sec.props?.products || sec.props.products.length === 0;
    });
  };
  const isSaveDisabled = loadingSave || hasInvalidProducts(sections);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed left-0 top-30 pt-4 h-screen bg-white border-r flex flex-col transition-all duration-300
        ${open ? "w-64" : "w-16"}`}
      >
        <div className="flex items-center justify-between p-3 border-b">
          {open && <h1 className="font-bold text-sm">Builder</h1>}

          <button onClick={() => setOpen(!open)}>
            {open ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="p-2 space-y-2 border-b">
          {SECTION_TYPES.map((type) => {
            const Icon = type.icon;

            return (
              <button
                key={type.key}
                onClick={() => addSection(type.key)}
                className="flex items-center gap-2 w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
              >
                <Icon className="w-4 h-4" />
                {open && type.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1  p-2 space-y-2">
          {sections.map((sec, index) => {
            const type = SECTION_TYPES.find((t) => t.key === sec.type);
            const Icon = type?.icon;

            return (
              <div
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`flex items-center justify-between px-2 py-2 rounded border cursor-pointer text-sm
                ${
                  activeSectionId === sec.id
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" />}
                  {open && (
                    <span>
                      {index + 1}. {sec.type}
                    </span>
                  )}
                </div>

                <button
                  className="hover:cursor-pointer"
                  onClick={() => onClickDelete(sec.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div
        className={`flex-1  transition-all
  ${open ? "ml-64" : "ml-16"}`}
      >
        {/* SAVE BUTTON */}
        {sections.length > 0 && (
          <div className="flex justify-end mb-2">
            <button
              disabled={isSaveDisabled}
              onClick={savePage}
              className={` bg-black text-white flex items-center gap-3 rounded-sm px-4 py-1
    ${isSaveDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}
  `}
            >
              Save Page
            </button>
          </div>
        )}

        {/* ================= EMPTY STATE (FIX) ================= */}
        {sections.length === 0 ? (
          <div className="h-[70vh] flex flex-col items-center justify-center text-gray-500">
            <div className="text-center space-y-2">
              <Layout className="w-10 h-10 mx-auto opacity-40" />
              <h2 className="text-lg font-semibold">No Sections Found</h2>
              <p className="text-sm">
                Start by adding your first section from the left sidebar
              </p>
            </div>
          </div>
        ) : !activeSection ? (
          <div className="h-[70vh] flex items-center justify-center text-gray-500">
            Select a section to start editing
          </div>
        ) : (
          <>
            {/* ================= EDITORS ================= */}
            {activeSection.type === "banner" && (
              <BannerSectionEditor
                section={activeSection}
                updateSection={updateSection}
              />
            )}

            {activeSection.type === "products" && (
              <ProductsSectionEditor
                section={activeSection}
                updateSection={updateSection}
              />
            )}

            {activeSection.type === "text" && (
              <TextSectionEditor
                section={activeSection}
                updateSection={updateSection}
              />
            )}
          </>
        )}
      </div>
      <DeleteModal
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        itemTitle={deletingSection}
        title={"Section"}
        onConfirm={deleteSection}
        loadingData={actionLoading}
      />
    </div>
  );
}
