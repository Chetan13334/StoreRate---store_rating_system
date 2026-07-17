import api from "./api";

const getStores = async (params = {}) => {
  const response = await api.get("/stores/all", {
    params,
  });

  return response.data;
};

const getStoreById = async (id) => {
  const response = await api.get(`/stores/${id}`);
  return response.data;
};

export default {
  getStores,
  getStoreById,
};
