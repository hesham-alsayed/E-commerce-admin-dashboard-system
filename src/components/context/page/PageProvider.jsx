/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { PageContext } from "./PageContext";

import {
  getAllPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  addSection,
  updateSection,
  deleteSection,
  updatePageMeta,
} from "@/components/ِApi/pageApi";

export default function PageProvider({ children }) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= FETCH ALL PAGES =================
  const fetchPages = async () => {
    try {
      setLoading(true);

      const data = await getAllPages();

      setPages(data?.pages || []);
      return data;
    } catch (error) {
      console.error("Fetch Pages Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ================= GET SINGLE PAGE =================
  const getPageById = async (id) => {
    try {
      setLoading(true);

      const data = await getPage(id);

      setCurrentPage(data?.page || null);

      return data;
    } catch (error) {
      console.error("Fetch Page Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ================= CREATE PAGE =================
  const createNewPage = async (formData) => {
    try {
      setLoading(true);

      const data = await createPage(formData);
      const newPage = data?.page;

      if (newPage) {
        setPages((prev) => [...prev, newPage]);
      }

      return data;
    } catch (error) {
      console.error("Create Page Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE PAGE =================
  const updatePageById = async (id, formData) => {
    try {
      setLoading(true);

      const data = await updatePage(id, formData);
      const updated = data?.page;

      if (updated) {
        setPages((prev) => prev.map((p) => (p._id === id ? updated : p)));

        if (currentPage?._id === id) {
          setCurrentPage(updated);
        }
      }

      return data;
    } catch (error) {
      console.error("Update Page Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePageMetaById = async (id, data) => {
    // 🧠 حفظ النسخة القديمة (rollback)
    const prevPages = pages;
    const prevCurrent = currentPage;

    try {
      // ================= OPTIMISTIC UPDATE =================
      const optimisticUpdate = (page) =>
        page._id === id
          ? {
              ...page,
              ...data,
            }
          : page;

      setPages((prev) => prev.map(optimisticUpdate));

      if (currentPage?._id === id) {
        setCurrentPage((prev) => ({
          ...prev,
          ...data,
        }));
      }

      // ================= API CALL =================
      const res = await updatePageMeta(id, data);

      const updated = res?.page;

      // replace with real server data (safe sync)
      if (updated) {
        setPages((prev) => prev.map((p) => (p._id === id ? updated : p)));

        if (currentPage?._id === id) {
          setCurrentPage(updated);
        }
      }

      return res;
    } catch (error) {
      // ================= ROLLBACK =================
      setPages(prevPages);
      setCurrentPage(prevCurrent);

      console.error("Update Page Meta Error:", error);
      throw error;
    }
  };
  // ================= DELETE PAGE =================
  const deletePageById = async (id) => {
    try {
      setLoading(true);

      await deletePage(id);

      setPages((prev) => prev.filter((p) => p._id !== id));

      if (currentPage?._id === id) {
        setCurrentPage(null);
      }
    } catch (error) {
      console.error("Delete Page Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ================= ADD SECTION =================
  const addPageSection = async (pageId, data) => {
    try {
      setLoading(true);

      const res = await addSection(pageId, data);
      const updatedPage = res?.page;

      if (updatedPage) {
        setPages((prev) =>
          prev.map((p) => (p._id === pageId ? updatedPage : p)),
        );

        if (currentPage?._id === pageId) {
          setCurrentPage(updatedPage);
        }
      }

      return res;
    } catch (error) {
      console.error("Add Section Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE SECTION =================
  const updatePageSection = async (pageId, sectionId, data) => {
    try {
      setLoading(true);

      const res = await updateSection(pageId, sectionId, data);
      const updatedSection = res?.section;

      if (currentPage?._id === pageId) {
        const updatedPage = {
          ...currentPage,
          sections: currentPage.sections.map((s) =>
            s._id === sectionId ? updatedSection : s,
          ),
        };

        setCurrentPage(updatedPage);
      }

      return res;
    } catch (error) {
      console.error("Update Section Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE SECTION =================
  const deletePageSection = async (pageId, sectionId) => {
    try {
      setLoading(true);

      await deleteSection(pageId, sectionId);

      if (currentPage?._id === pageId) {
        const updatedPage = {
          ...currentPage,
          sections: currentPage.sections.filter((s) => s._id !== sectionId),
        };

        setCurrentPage(updatedPage);
      }
    } catch (error) {
      console.error("Delete Section Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ================= INIT =================
  useEffect(() => {
    fetchPages();
  }, []);

  // ================= CONTEXT VALUE =================
  const value = useMemo(
    () => ({
      // state
      pages,
      currentPage,
      loading,

      // pages
      fetchPages,
      getPageById,
      createNewPage,
      updatePageById,
      deletePageById,

      // sections
      addPageSection,
      updatePageSection,
      deletePageSection,
      updatePageMetaById,
    }),
    [pages, currentPage, loading],
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}
