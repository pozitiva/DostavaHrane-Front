import axios from "axios";

const API_BASE_URL = "http://192.168.1.54:5076/api/jelo";

export const vratiJelo = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
