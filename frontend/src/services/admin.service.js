import api from "./api";

const getDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

const getUsers = async (params = {}) => {
  const response = await api.get("/admin/users", {
    params,
  });

  return response.data;
};

const createUser = async (data) => {
  const response = await api.post("/admin/users", data);
  return response.data;
};

const getStores = async (params = {}) => {
  const response = await api.get("/admin/stores", {
    params,
  });

  return response.data;
};

const getUserDetails = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

export default {
  getDashboard,
  getUsers,
  createUser,
  getStores,
  getUserDetails,
};