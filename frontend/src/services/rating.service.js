import api from "./api";

const getMyRatings = async () => {
  const response = await api.get("/ratings/my");
  return response.data;
};

const submitRating = async (data) => {
  const response = await api.post("/ratings", data);
  return response.data;
};

const updateRating = async (storeId, rating) => {
  const response = await api.put(`/ratings/${storeId}`, {
    rating,
  });

  return response.data;
};

export default {
  getMyRatings,
  submitRating,
  updateRating,
};