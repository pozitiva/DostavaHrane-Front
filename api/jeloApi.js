import axiosInstance from "./axiosInstance";

// const API_BASE_URL = "http://192.168.1.54:5076/api/jelo";
const API_BASE_URL = "http://192.168.0.13:5076/api/musterija";

export const vratiJelo = async (id) => {
  try {
    const response = await axiosInstance.get(`/jelo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
