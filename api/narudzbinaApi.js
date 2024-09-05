import axiosInstance from "./axiosInstance";

export const napraviNarudzbinu = async (orderData) => {
  try {
    const odgovor = await axiosInstance.post("/narudzbina", orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const vratiSveNarudzbine = async () => {
  try {
    const odgovor = await axiosInstance.get("/narudzbina");
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const vratiNarudzbinuoId = async (id) => {
  try {
    const response = await axiosInstance.get(`/narudzbina/${id}`);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom pronalazenja narudzbine", error);
    throw error;
  }
};

export const izmeniNarudzbinu = async (narudzbinaData) => {
  try {
    console.log("uslo u skladiste");
    const response = await axiosInstance.put(`/narudzbina`, narudzbinaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Greska prilikom izmene narudzbine:", error);
    throw error;
  }
};
