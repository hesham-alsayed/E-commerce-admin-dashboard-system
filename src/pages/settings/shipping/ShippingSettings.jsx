"use client";

import React, { useEffect, useState } from "react";

import { ShippingHeader } from "./ShippingHeader";
import { ShippingZonesTable } from "./ShippingZonesTable";
import { ZoneModal } from "./ZoneModal";
import { CityModal } from "./CityModal";
import { DeleteModal } from "@/components/DeleteModal";

import { useShipping } from "@/components/hooks/useShipping";
import { showToast } from "@/lib/utils";

export default function ShippingSettings() {
  const {
    zones,
    fetchZones,

    // zone
    addZone,
    editZone,
    removeZone,

    // city
    addCityToZone,
    editCity,
    removeCity,

    // toggle all
    toggleZonesStatus,
    loadingToggleAll,

    // loading
    loadingDelete,
  } = useShipping();

  // =========================
  // ZONES STATE
  // =========================
  const [openZoneModal, setOpenZoneModal] = useState(false);
  const [zoneMode, setZoneMode] = useState("create");
  const [selectedZone, setSelectedZone] = useState(null);

  const [deleteZoneModal, setDeleteZoneModal] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState(null);

  const [loadingCreateZone, setLoadingCreateZone] = useState(false);
  const [loadingUpdateZone, setLoadingUpdateZone] = useState(false);

  // =========================
  // CITY STATE
  // =========================
  const [openCityModal, setOpenCityModal] = useState(false);
  const [cityMode, setCityMode] = useState("create");
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeZoneForCity, setActiveZoneForCity] = useState(null);

  const [deleteCityModal, setDeleteCityModal] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [zoneOfCityToDelete, setZoneOfCityToDelete] = useState(null);

  const [loadingCreateCity, setLoadingCreateCity] = useState(false);
  const [loadingUpdateCity, setLoadingUpdateCity] = useState(false);

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    fetchZones();
  }, []);

  // =========================
  // ZONE ACTIONS
  // =========================
  const openCreateZone = () => {
    setZoneMode("create");
    setSelectedZone(null);
    setOpenZoneModal(true);
  };

  const openEditZone = (zone) => {
    setZoneMode("edit");
    setSelectedZone(zone);
    setOpenZoneModal(true);
  };

  const handleZoneSubmit = async (data) => {
    try {
      if (zoneMode === "create") {
        setLoadingCreateZone(true);
        await addZone(data);
      } else {
        setLoadingUpdateZone(true);
        await editZone(selectedZone._id, data);
      }

      await fetchZones();

      setOpenZoneModal(false);
      setSelectedZone(null);

      showToast({ message: "Zone saved", type: "success" });
    } catch (err) {
      showToast({ message: err.response.data.message, type: "error" });
    } finally {
      setLoadingCreateZone(false);
      setLoadingUpdateZone(false);
    }
  };

  const openDeleteZone = (zone) => {
    setZoneToDelete(zone);
    setDeleteZoneModal(true);
  };

  const confirmDeleteZone = async () => {
    try {
      await removeZone(zoneToDelete._id);

      setDeleteZoneModal(false);
      setZoneToDelete(null);

      await fetchZones();
    } catch (err) {
      showToast({ message: err.response.data.message, type: "error" });
    }
  };

  // =========================
  // CITY ACTIONS
  // =========================
  const openCreateCity = (zone) => {
    setCityMode("create");
    setSelectedCity(null);
    setActiveZoneForCity(zone);
    setOpenCityModal(true);
  };

  const openEditCity = (city, zone) => {
    setCityMode("edit");
    setSelectedCity(city);
    setActiveZoneForCity(zone);
    setOpenCityModal(true);
  };

  const handleCitySubmit = async (data) => {
    try {
      const zoneId = data.zoneId || activeZoneForCity?._id;

      if (cityMode === "create") {
        setLoadingCreateCity(true);
        await addCityToZone(zoneId, data);
      } else {
        setLoadingUpdateCity(true);
        await editCity(zoneId, selectedCity._id, data);
      }

      await fetchZones();

      setOpenCityModal(false);
      setSelectedCity(null);
      setActiveZoneForCity(null);
    } catch (err) {
      showToast({ message: err.response.data.message, type: "error" });
    } finally {
      setLoadingCreateCity(false);
      setLoadingUpdateCity(false);
    }
  };

  const openDeleteCity = (city, zone) => {
    setCityToDelete(city);
    setZoneOfCityToDelete(zone);
    setDeleteCityModal(true);
  };

  const confirmDeleteCity = async () => {
    try {
      await removeCity(zoneOfCityToDelete._id, cityToDelete._id);

      setDeleteCityModal(false);
      setCityToDelete(null);
      setZoneOfCityToDelete(null);

      await fetchZones();
    } catch (err) {
      showToast({ message: err.response.data.message, type: "error" });
    }
  };

  // =========================
  // TOGGLE ALL
  // =========================
  const handleToggleAllZones = async (active) => {
    try {
      await toggleZonesStatus(active);

      showToast({
        message: active ? "All zones activated" : "All zones deactivated",
        type: "success",
      });
    } catch (err) {
      showToast({ message: err.response.data.message, type: "error" });
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="space-y-6">
      <ShippingHeader
        zones={zones}
        onCreateZone={openCreateZone}
        onAddCity={openCreateCity}
        onToggleAllZones={handleToggleAllZones}
        loadingToggleAll={loadingToggleAll}
      />

      <ShippingZonesTable
        zones={zones}
        onEditZone={openEditZone}
        onDeleteZone={openDeleteZone}
        onEditCity={openEditCity}
        onDeleteCity={openDeleteCity}
        onToggleZone={(zone, value) =>
          editZone(zone._id, { ...zone, isActive: value })
        }
      />

      <ZoneModal
        open={openZoneModal}
        onClose={() => setOpenZoneModal(false)}
        onSubmit={handleZoneSubmit}
        mode={zoneMode}
        initialData={selectedZone}
        loading={zoneMode === "create" ? loadingCreateZone : loadingUpdateZone}
      />

      <CityModal
        open={openCityModal}
        onClose={() => setOpenCityModal(false)}
        onSubmit={handleCitySubmit}
        mode={cityMode}
        initialData={selectedCity}
        zones={zones}
        selectedZone={activeZoneForCity?.name}
        selectedZoneId={activeZoneForCity?._id}
        loading={cityMode === "create" ? loadingCreateCity : loadingUpdateCity}
      />

      <DeleteModal
        isOpen={deleteZoneModal}
        onClose={() => setDeleteZoneModal(false)}
        onConfirm={confirmDeleteZone}
        title="Delete Zone"
        itemTitle={zoneToDelete?.name}
        isLoadingDelete={loadingDelete}
      />

      <DeleteModal
        isOpen={deleteCityModal}
        onClose={() => setDeleteCityModal(false)}
        onConfirm={confirmDeleteCity}
        title="Delete City"
        itemTitle={cityToDelete?.city}
        isLoadingDelete={loadingDelete}
      />
    </div>
  );
}
