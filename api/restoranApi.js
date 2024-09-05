import axiosInstance from "./axiosInstance";

export const vratiSveRestorane = async () => {
  try {
    const odgovor = await axiosInstance.get("/restoran");
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const vratiRestoran = async (id) => {
  try {
    const odgovor = await axiosInstance.get(`/restoran/${id}`);
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const vratiJelaZaRestoran = async (id) => {
  try {
    const odgovor = await axiosInstance.get(`/restoran/${id}/jela`);
    return odgovor.data;
  } catch (error) {
    console.error("Greska u vracanju svih jela", error);
    throw error;
  }
};

export const pretragaRestorana = async (naziv = null, tip = null) => {
  try {
    const response = await axiosInstance.get(`/restoran/pretraga`, {
      params: { naziv, tip },
    });
    return response.data;
  } catch (error) {
    console.error("Greska prilikom pretrage restorana", error);
    throw error;
  }
};
