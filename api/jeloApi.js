import axiosInstance from "./axiosInstance";

export const vratiJelo = async (id) => {
  try {
    const response = await axiosInstance.get(`/jelo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
