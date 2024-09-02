import axiosInstance from "./axiosInstance";

const API_BASE_URL = "http://192.168.1.54:5076/api/jelo";
// const API_BASE_URL = "http://192.168.0.13:5076/api/jelo";

export const vratiJelo = async (id) => {
  try {
    const response = await axiosInstance.get(`/jelo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom pronalazenja jela", error);
    throw error;
  }
};

export const vratiSvaJela = async () => {
  try {
    const odgovor = await axiosInstance.get("/jelo");
    console.log(odgovor.data);
    return odgovor.data;
  } catch (error) {
    console.error("Greska prilikom vracanja jela:", error);
    throw error;
  }
};

export const kreirajJelo = async (jeloZaKreirati) => {
  try {
    console.log("USAO SAM U KREIRAJ");
    const odgovor = await axiosInstance.post("/jelo", jeloZaKreirati, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(odgovor);
    return odgovor.data;
  } catch (error) {
    console.error("Greska prilikom kreiranja jela:", error);
    throw error;
  }
};

export const izmeniJelo = async (id, jeloData) => {
  try {
    console.log("uslo");
    const response = await axiosInstance.put(`/jelo/${id}`, jeloData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Greska prilikom izmene jela:", error);
    throw error;
  }
};

export const obrisiJelo = async (id) => {
  try {
    const response = await axiosInstance.delete(`/jelo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom brisanja jela", error);
    throw error;
  }
};
