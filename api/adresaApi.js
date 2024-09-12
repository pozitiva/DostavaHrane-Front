import { API_BASE_URL } from "../utils/zajednickiPodaci";
import axiosInstance from "./axiosInstance";

const baseUrl = `${API_BASE_URL}/api`;
export const kreirajAdresu = async (adresaZaKreiranje) => {
  try {
    console.log("uslo u api");
    await axiosInstance.post(baseUrl, adresaZaKreiranje, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Greska prilikom kreiranja adrese :", error);
    throw error;
  }
};

export const vratiSveAdreseMusterije = async () => {
  try {
    const odgovor = await axiosInstance.get("/adresa");
    return odgovor.data;
  } catch (error) {
    console.error("Greska prilikom vracanja adresa:", error);
    throw error;
  }
};

export const izmeniAdresu = async (id, adresaData) => {
  try {
    const response = await axiosInstance.put(
      `${baseUrl}/adresa/${id}`,
      adresaData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Greska prilikom izmene adrese:", error);
    throw error;
  }
};
