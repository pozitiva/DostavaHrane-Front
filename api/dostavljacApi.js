import axios from "axios";
import { API_BASE_URL } from "../utils/zajednickiPodaci";

const baseUrl = `${API_BASE_URL}/api`;
export const kreirajDostavljaca = async (userData) => {
  try {
    console.log(userData);
    const odgovor = await axios.post(`${baseUrl}/dostavljac`, userData);
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
