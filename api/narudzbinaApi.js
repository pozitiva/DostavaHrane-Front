import axiosInstance from "./axiosInstance";

export const napraviNarudzbinu = async (orderData) => {
  try {
    console.log("uslo ponovo");
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
