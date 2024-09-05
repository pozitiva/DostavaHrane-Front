import axiosInstance from "./axiosInstance";

// const API_BASE_URL = `http://192.168.0.13:5076/api/adresa`;
const API_BASE_URL = `http://192.168.1.54:5076/api/adresa`;

export const kreirajAdresu = async (adresaZaKreiranje) => {
  try {
    console.log("uslo u api");
    await axiosInstance.post(API_BASE_URL, adresaZaKreiranje, {
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
    console.log(odgovor.data);
    return odgovor.data;
  } catch (error) {
    console.error("Greska prilikom vracanja adresa:", error);
    throw error;
  }
};

export const izmeniAdresu = async (id, adresaData) => {
  try {
    console.log(" uslo u api");
    const response = await axiosInstance.put(`/adresa/${id}`, adresaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Greska prilikom izmene adrese:", error);
    throw error;
  }
};
