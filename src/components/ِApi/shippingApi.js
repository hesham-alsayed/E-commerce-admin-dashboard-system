// ======================
// ZONES
// ======================

import { api } from ".";

// Get all zones
export const getAllZones = () => {
  return api.get("/shipping-zones");
};

// Get single zone
export const getZone = (id) => {
  return api.get(`/shipping-zones/${id}`);
};

// Create zone
export const createZone = (data) => {
  return api.post("/shipping-zones", data);
};

// Update zone
export const updateZone = (id, data) => {
  return api.patch(`/shipping-zones/${id}`, data);
};

// Delete zone
export const deleteZone = (id) => {
  return api.delete(`/shipping-zones/${id}`);
};

// ======================
// CITIES
// ======================

// Add city
export const addCity = (zoneId, data) => {
  return api.post(`/shipping-zones/${zoneId}/cities`, data);
};

// Update city
export const updateCity = (zoneId, cityId, data) => {
  return api.patch(`/shipping-zones/${zoneId}/cities/${cityId}`, data);
};

// Delete city
export const deleteCity = (zoneId, cityId) => {
  return api.delete(`/shipping-zones/${zoneId}/cities/${cityId}`);
};

export const toggleAllZones = async (active) => {
  console.log(active);

  return await api.patch("/shipping-zones/toggle-all", {
    active, // MUST match backend
  });
};

export const saveAllZonesApi = async (zones) => {
  const res = await api.put('/shipping-zones', {
    value: zones, // 👈 backend expects value
  });

  return res.data;
};
