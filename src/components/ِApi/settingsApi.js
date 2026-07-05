import { api } from ".";

export const createSetting = async (data) => {
  const res = await api.post("/settings", data);
  return res.data;
};

export const updateSetting = async (id, data) => {
  const res = await api.patch(`/settings/${id}`, data);
  return res.data;
};

export const getSettingByKey = async (key) => {
  const res = await api.get(`/settings/key/${key}`);
  console.log(res.data);
  return res;
};

export const updateSettingValue = async (key, value) => {
  const res = await api.put(`/settings/key/${key}/value`, {
    value,
  });
  return res;
};

export const createValueForSetting = async (settingId, data) => {
  const res = await api.post(`/settings/${settingId}/value`, data);
  return res.data;
};

// DELETE VALUE
export const deleteValueForSetting = async (settingId, valueId) => {
  const res = await api.delete(`/settings/${settingId}/value/${valueId}`);

  return res;
};

// UPDATE GLOBAL VALUE (toggle or full update)
export const updateValueForSetting = async (settingId, valueId, data) => {
  const res = await api.patch(`/settings/${settingId}/value/${valueId}`, data);

  return res.data;
};

export const updateGlobalSettingStatus = async (settingId, enabled) => {
  const res = await api.patch(`/settings/${settingId}/toggle-all`, { enabled });

  return res.data; // ✅ IMPORTANT
};
