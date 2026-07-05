import {  useState } from "react";
import {
  createValueForSetting,
  deleteValueForSetting,
  getSettingByKey,
  updateGlobalSettingStatus,
  updateSettingValue,
  updateValueForSetting,
} from "@/components/ِApi/settingsApi";
import { SettingsContext } from "./SettingsContext";


export default function SettingsProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const fetchSettingByKey = async (key) => {
    try {
      setLoading(true);
      const res = await getSettingByKey(key);
      return res;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const saveSettingsValue = async (key, value) => {
    return await updateSettingValue(key, value);
  };

  const createValue = async (settingId, data) => {
    return await createValueForSetting(settingId, data);
  };

  const updateValue = async (settingId, valueId, data) => {
    return await updateValueForSetting(settingId, valueId, data);
  };

  const removeValue = async (settingId, valueId) => {
    return await deleteValueForSetting(settingId, valueId);
  };

  const updateStatusGlobal = async (settingId, enabled) => {
    return await updateGlobalSettingStatus(settingId, enabled);
  };

  return (
    <SettingsContext.Provider
      value={{
        loading,
        fetchSettingByKey,
        saveSettingsValue,
        updateStatusGlobal,
        createValue,
        updateValue,
        removeValue,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
