import axiosInstance from "./axiosInstance";

export const izmeniKorisnika = async (musterijaData) => {
  try {
    console.log(musterijaData);
    console.log("uslo u izmenu korisnika");
    const response = await axiosInstance.put(`/musterija`, musterijaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Greska prilikom izmene musterije:", error);
  }
};
