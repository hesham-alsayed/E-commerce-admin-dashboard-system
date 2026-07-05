/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import {
  getAllZones,
  createZone,
  updateZone,
  deleteZone,
  addCity,
  updateCity,
  deleteCity,
  toggleAllZones,
  saveAllZonesApi,
} from "../../ِApi/shippingApi";

import { ShippingContext } from "./ShippingContext";

export const ShippingProvider = ({ children }) => {
  const [zones, setZones] = useState([]);
  const [error, setError] = useState(null);
  const [loadingToggleAll, setLoadingToggleAll] = useState(false);
  // ======================
  // LOADING STATES (ZONE)
  // ======================
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingCreateZone, setLoadingCreateZone] = useState(false);
  const [loadingUpdateZone, setLoadingUpdateZone] = useState(false);
  const [loadingDeleteZone, setLoadingDeleteZone] = useState(false);
  const [saving, setSaving] = useState(false);

  // ======================
  // LOADING STATES (CITY)
  // ======================
  const [loadingCreateCity, setLoadingCreateCity] = useState(false);
  const [loadingUpdateCity, setLoadingUpdateCity] = useState(false);
  const [loadingDeleteCity, setLoadingDeleteCity] = useState(false);

  // ======================
  // FETCH ZONES
  // ======================
  const fetchZones = async () => {
    try {
      setLoadingFetch(true);
      const res = await getAllZones();

      setZones(res.data.zones);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching zones");
    } finally {
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  // ======================
  // ZONE - CREATE
  // ======================
  const addZone = async (data) => {
    try {
      setLoadingCreateZone(true);

      const res = await createZone(data);
      const newZone = res.data.data;

      setZones((prev) => [newZone, ...prev]);

      return newZone;
    } catch (err) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoadingCreateZone(false);
    }
  };

  // ======================
  // ZONE - UPDATE
  // ======================
  const editZone = async (id, data) => {
    try {
      setLoadingUpdateZone(true);

      const res = await updateZone(id, data);
      const updatedZone = res.data.data;

      setZones((prev) => prev.map((z) => (z._id === id ? updatedZone : z)));

      return updatedZone;
    } catch (err) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoadingUpdateZone(false);
    }
  };

  // ======================
  // ZONE - DELETE
  // ======================
  const removeZone = async (id) => {
    try {
      setLoadingDeleteZone(true);

      await deleteZone(id);

      setZones((prev) => prev.filter((z) => z._id !== id));
    } catch (err) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoadingDeleteZone(false);
    }
  };

  // ======================
  // CITY - CREATE
  // ======================
  const addCityToZone = async (zoneId, data) => {
    try {
      setLoadingCreateCity(true);

      const res = await addCity(zoneId, data);

      setZones((prev) =>
        prev.map((z) => (z._id === zoneId ? res.data.data : z)),
      );
    } catch (err) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoadingCreateCity(false);
    }
  };

  // ======================
  // CITY - UPDATE
  // ======================
  const editCity = async (zoneId, cityId, data) => {
    try {
      setLoadingUpdateCity(true);

      const res = await updateCity(zoneId, cityId, data);

      setZones((prev) =>
        prev.map((z) => (z._id === zoneId ? res.data.data : z)),
      );
    } catch (err) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoadingUpdateCity(false);
    }
  };

  // ======================
  // CITY - DELETE
  // ======================
  const removeCity = async (zoneId, cityId) => {
    try {
      setLoadingDeleteCity(true);

      const res = await deleteCity(zoneId, cityId);

      setZones((prev) =>
        prev.map((z) => (z._id === zoneId ? res.data.data : z)),
      );
    } catch (err) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoadingDeleteCity(false);
    }
  };

  const toggleZonesStatus = async (active) => {
    try {
      setLoadingToggleAll(true);

      await toggleAllZones(active); // API call

      setZones((prev) =>
        prev.map((z) => ({
          ...z,
          isActive: active,
        })),
      );
      await fetchZones();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoadingToggleAll(false);
    }
  };
  const saveZones = async () => {
    try {
      setSaving(true);
      const data = await saveAllZonesApi(zones);
      // 👇 أهم سطر
      setZones(data.zones);
      return data;
    } catch (err) {
      return {
        success: false,
        error: err?.response?.data?.message,
      };
    } finally {
      setSaving(false);
    }
  };
  return (
    <ShippingContext.Provider
      value={{
        zones,
        error,

        // fetch
        loadingFetch,

        // zone loading
        loadingCreateZone,
        loadingUpdateZone,
        loadingDeleteZone,
        loadingToggleAll,
        // city loading
        loadingCreateCity,
        loadingUpdateCity,
        loadingDeleteCity,
        saving,
        fetchZones,

        // zone actions
        addZone,
        editZone,
        removeZone,

        // city actions
        addCityToZone,
        editCity,
        removeCity,
        toggleZonesStatus,
        saveZones,
        setZones,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};
