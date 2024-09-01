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
    console.error("Error registering user:", error);
    throw error;
  }
};
