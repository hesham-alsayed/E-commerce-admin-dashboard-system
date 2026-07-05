"use client";

import React, { useEffect, useState } from "react";
import { SettingsHeader } from "../SettingsHeader";
import { useSettings } from "@/components/hooks/useSettings";
import { showToast } from "@/lib/utils";
import { SettingsTable } from "../general/SettingsTable";
import { SettingSkeleton } from "../SettingSkelton";
import { NotificationSettingModal } from "./NotificationSettingModal";
import { DeleteModal } from "@/components/DeleteModal";
import { ModalCreateSetting } from "../ModalCreateSetting";
import { updateSetting } from "@/components/ِApi/settingsApi";

export default function NotificationSettings() {
  const [settings, setSettings] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [editingSetting, setEditingSetting] = useState(null);

  const [deletingSetting, setDeletingSetting] = useState(null);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const [settingModalOpen, setSettingModalOpen] = useState(false);

  const {
    fetchSettingByKey,
    createValue,
    removeValue,
    updateValue,
    updateStatusGlobal,
  } = useSettings();

  // =========================
  // LOAD SETTINGS
  // =========================
  useEffect(() => {
    const loadSetting = async () => {
      try {
        setInitialLoading(true);

        const key = import.meta.env.VITE_NOTIFICATION_SETTINGS_KEY;

        const res = await fetchSettingByKey(key);

        setSettings(res?.data?.setting || null);
      } catch (error) {
        showToast({
          message: error?.response?.data?.message || "Failed to load settings",
          type: "error",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadSetting();
  }, []);

  // =========================
  // CREATE
  // =========================
  const handleCreate = async (data) => {
    try {
      if (!settings?._id) {
        showToast({
          message: "No setting found. Please create settings first.",
          type: "error",
        });

        return;
      }

      const res = await createValue(settings._id, data);

      setSettings(res.setting);

      showToast({
        message: "created successfully",
        type: "success",
      });
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Create failed",
        type: "error",
      });
    }
  };

  // =========================
  // UPDATE VALUE
  // =========================
  const handleUpdate = async (data) => {
    try {
      if (!editingSetting) return;

      const res = await updateValue(settings._id, editingSetting._id, data);

      const updatedValue = res.value;

      setSettings((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          value: prev.value.map((item) =>
            item._id === editingSetting._id ? updatedValue : item,
          ),
          updatedAt: new Date().toISOString(),
        };
      });

      showToast({
        message: "updated successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Update failed",
        type: "error",
      });
    }
  };

  // =========================
  // UPDATE SETTINGS
  // =========================
  const handleUpdateSetting = async (data) => {
    try {
      const res = await updateSetting(settings._id, data);

      setSettings((prev) => ({
        ...prev,
        ...(res?.setting || data),
        updatedAt: new Date().toISOString(),
      }));

      showToast({
        message: "Settings updated successfully",
        type: "success",
      });

      setSettingModalOpen(false);
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Update failed",
        type: "error",
      });
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDeleteConfirm = async () => {
    try {
      if (!deletingSetting) return;

      setLoadingDelete(true);

      await removeValue(settings._id, deletingSetting._id);

      setSettings((prev) => ({
        ...prev,
        value: prev.value.filter((item) => item._id !== deletingSetting._id),
        updatedAt: new Date().toISOString(),
      }));

      showToast({
        message: "deleted successfully",
        type: "success",
      });
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Delete failed",
        type: "error",
      });
    } finally {
      handleCloseDeleteModal();
      setLoadingDelete(false);
    }
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async (data) => {
    if (editingSetting) {
      await handleUpdate(data);
    } else {
      await handleCreate(data);
    }

    setDialogOpen(false);

    setEditingSetting(null);
  };

  // =========================
  // TOGGLE GLOBAL
  // =========================
  const handleToggleGlobal = async (checked) => {
    try {
      const res = await updateStatusGlobal(settings._id, checked);

      setSettings(res.setting);

      showToast({
        message: `Settings ${res.setting.enabled ? "enabled" : "disabled"}`,
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Toggle failed",
        type: "error",
      });
    }
  };

  // =========================
  // MODAL ACTIONS
  // =========================
  const onEdit = (item) => {
    setEditingSetting(item);

    setDialogOpen(true);
  };

  const onDelete = (item) => {
    setDeletingSetting(item);

    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteDialogOpen(false);

    setDeletingSetting(null);
  };

  // =========================
  // LOADING
  // =========================
  if (initialLoading) {
    return <SettingSkeleton />;
  }

  return (
    <div>
      <SettingsHeader
        type="notifications"
        settings={settings || []}
        onAddNew={() => {
          setEditingSetting(null);

          setDialogOpen(true);
        }}
        onToggleGlobal={handleToggleGlobal}
        onUpdateSetting={() => setSettingModalOpen(true)}
      />

      <ModalCreateSetting
        open={settingModalOpen}
        onClose={() => setSettingModalOpen(false)}
        initialData={{
          key: settings?.key || "",
          description: settings?.description || "",
        }}
        onCreate={handleUpdateSetting}
      />

      <SettingsTable
        type="notifications"
        settings={settings?.value || []}
        globalEnabled={settings?.enabled}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <NotificationSettingModal
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);

          setEditingSetting(null);
        }}
        setting={editingSetting}
        onConfirm={handleSave}
      />

      <DeleteModal
        isOpen={deleteDialogOpen}
        onClose={handleCloseDeleteModal}
        setting={deletingSetting}
        onConfirm={handleDeleteConfirm}
        itemTitle={deletingSetting?.type}
        title={"Notification value"}
        isLoadingDelete={loadingDelete}
      />
    </div>
  );
}
