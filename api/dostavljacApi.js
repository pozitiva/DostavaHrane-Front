import axios from "axios";
import { API_BASE_URL } from "../utils/zajednickiPodaci";
import axiosInstance from "./axiosInstance";

const baseUrl = `${API_BASE_URL}/api`;
export const kreirajDostavljaca = async (userData) => {
  try {
    const odgovor = await axios.post(`${baseUrl}/dostavljac`, userData);
    return odgovor.data;
  } catch (error) {
    console.error("Greska prilikom kreiranja dostavljaca:", error);
  }
};

export const vratiSveDostavljace = async () => {
  try {
    const odgovor = await axiosInstance.get("/dostavljac");
    return odgovor.data;
  } catch (error) {
    console.error("Greska prilikom vracanja dostavljaca:", error);
    throw error;
  }
};
