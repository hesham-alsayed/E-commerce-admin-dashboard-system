"use client";

import { useEffect, useRef, useState } from "react";

import { SettingsHeader } from "../SettingsHeader";
import { SettingsTable } from "./SettingsTable";
import { SettingDialog } from "./SettingsModal";
import { DeleteModal2 } from "@/components/DeleteModal2";
import { useSettings } from "@/components/hooks/useSettings";
import { showToast } from "@/lib/utils";
import { SettingSkeleton } from "../SettingSkelton";
import { updateSetting } from "@/components/ِApi/settingsApi";
import { ModalCreateSetting } from "../ModalCreateSetting";
import { DeleteModal } from "@/components/DeleteModal";

export default function GeneralSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchedOnce = useRef(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [editingSetting, setEditingSetting] = useState(null);
  const [deletingSetting, setDeletingSetting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    fetchSettingByKey,
    createValue,
    updateValue,
    removeValue,
    updateStatusGlobal,
  } = useSettings();

  // =========================
  // LOAD ONCE (FIX LOOP)
  // =========================
  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const loadSetting = async () => {
      setLoading(true);

      try {
        const res = await fetchSettingByKey(
          import.meta.env.VITE_GENERAL_SETTINGS_KEY,
        );

        const data = res?.data?.setting || null;
        setSettings(data);
      } catch (error) {
        console.log(error);

        showToast({
          message: error?.response?.data?.message || "Failed to load settings",
          type: "error",
        });

        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    loadSetting();
  }, []);

  // =========================
  // CREATE
  // =========================
  const handleCreateValue = async (data) => {
    try {
      setDialogLoading(true);

      const res = await createValue(settings._id, data);

      setSettings(res.setting);

      showToast({
        message: "Created successfully",
        type: "success",
      });
    } catch (err) {
      showToast({
        message: err?.response?.data?.message || "Create failed",
        type: "error",
      });
    } finally {
      setDialogLoading(false);
    }
  };

  // =========================
  // UPDATE VALUE
  // =========================
  const handleUpdateValue = async (data) => {
    try {
      setDialogLoading(true);

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
        message: "Updated successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Update failed",
        type: "error",
      });
    } finally {
      setDialogLoading(false);
    }
  };

  // =========================
  // DELETE (NO REFETCH LOOP FIX)
  // =========================
  const handleDeleteConfirm = async () => {
    if (!deletingSetting) return;

    try {
      setDeleteLoading(true);

      await removeValue(settings._id, deletingSetting._id);

      setSettings((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          value: prev.value.filter((i) => i._id !== deletingSetting._id),
          updatedAt: new Date().toISOString(),
        };
      });

      showToast({
        message: "Deleted successfully",
        type: "success",
      });

      // اقفل بعد النجاح
      setDeleteDialogOpen(false);
      setDeletingSetting(null);
    } catch (err) {
      console.log(err);

      showToast({
        message: err?.response?.data?.message || "Delete failed",
        type: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // =========================
  // UPDATE GLOBAL SETTINGS
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
      console.log(error);

      showToast({
        message: error?.response?.data?.message || "Update failed",
        type: "error",
      });
    }
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async (data) => {
    if (editingSetting) {
      await handleUpdateValue(data);
    } else {
      await handleCreateValue(data);
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
      console.log(error);

      showToast({
        message: error?.response?.data?.message || "Toggle failed",
        type: "error",
      });
    }
  };

  const onEdit = (item) => {
    setEditingSetting(item);
    setDialogOpen(true);
  };

  const onDelete = (item) => {
    setDeletingSetting(item);
    setDeleteDialogOpen(true);
  };

  // =========================
  // LOADING (FIXED)
  // =========================
  if (loading) {
    return <SettingSkeleton />;
  }

  // =========================
  // EMPTY STATE (PAGE LEVEL ONLY FOR ROOT DATA)
  // =========================
  if (!settings) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
        <p className="text-lg font-semibold">No settings found</p>
        <p className="text-sm">
          Create your first configuration to get started
        </p>
      </div>
    );
  }

  // =========================
  // DATA STATE
  // =========================
  return (
    <div>
      <SettingsHeader
        type="general"
        settings={settings}
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
        type="general"
        settings={settings?.value || []}
        globalEnabled={settings?.enabled}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <SettingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        setting={editingSetting}
        onConfirm={handleSave}
        loading={dialogLoading} // 🔥 IMPORTANT
      />

      <DeleteModal
        key={deletingSetting?._id}
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeletingSetting(null);
        }}
        setting={deletingSetting}
        onConfirm={handleDeleteConfirm}
        itemTitle={deletingSetting?.type}
        title="Delete General Value"
        isLoadingDelete={deleteLoading}
      />
    </div>
  );
}
