import axios from "axios";
import { API_BASE_URL } from "../utils/zajednickiPodaci";

export const kreirajDostavljaca = async (userData) => {
  try {
    console.log(userData);
    const odgovor = await axios.post(`${API_BASE_URL}/dostavljac`, userData);
    //console.log(odgovor.data);
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
