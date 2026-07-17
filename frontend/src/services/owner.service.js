import api from "./api";

const getDashboard = async () => {
  const response = await api.get("/owner/dashboard");
  return response.data;
};

const getRatings = async (params = {}) => {
  const response = await api.get("/owner/ratings", {
    params,
  });

  return response.data;
};

export default {
  getDashboard,
  getRatings,
};