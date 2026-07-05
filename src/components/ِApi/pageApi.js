import { api } from ".";

// ================= PAGE =================

// Get all pages
export const getAllPages = async () => {
  const res = await api.get("/pages");
  return res.data;
};

// Get single page
export const getPage = async (id) => {
  const res = await api.get(`/pages/${id}`);
  return res.data;
};

// Create page
export const createPage = async (data) => {
  const res = await api.post("/pages", data);
  return res.data;
};

// Update page
export const updatePage = async (id, data) => {
  const res = await api.patch(`/pages/${id}`, data);
  return res.data;
};

export const updatePageMeta = async (id, data) => {
  const res = await api.patch(`/pages/${id}/meta`, data);
  return res.data;
};

// Delete page
export const deletePage = async (id) => {
  const res = await api.delete(`/pages/${id}`);
  return res.data;
};

// ================= SECTIONS =================

// Add section
export const addSection = async (pageId, data) => {
  const res = await api.post(`/pages/${pageId}/sections`, data);
  return res.data;
};

// Update section
export const updateSection = async (pageId, sectionId, data) => {
  const res = await api.patch(`/pages/${pageId}/sections/${sectionId}`, data);
  return res.data;
};

// Delete section
export const deleteSection = async (pageId, sectionId) => {
  const res = await api.delete(`/pages/${pageId}/sections/${sectionId}`);
  return res.data;
};
