import axiosInstance from "./axiosInstance";

export const vratiJelo = async (id) => {
  try {
    const response = await axiosInstance.get(`/jelo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom pronalazenja jela", error);
    throw error;
  }
};

export const vratiSvaJelaRestorana = async () => {
  try {
    const odgovor = await axiosInstance.get("/jelo");
    console.log(odgovor.data);
    return odgovor.data;
  } catch (error) {
    console.error("Greska prilikom vracanja jela:", error);
    throw error;
  }
};

export const kreirajJelo = async (jeloZaKreiranje) => {
  try {
    await axiosInstance.post("/jelo", jeloZaKreiranje, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Greska prilikom kreiranja jela:", error);
    throw error;
  }
};

export const izmeniJelo = async (jeloData) => {
  try {
    console.log("uslo");
    const response = await axiosInstance.put(`/jelo`, jeloData, {
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
