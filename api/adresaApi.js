import axiosInstance from "./axiosInstance";

const API_BASE_URL = "http://192.168.0.13:5076/api/adresa";
// const API_BASE_URL = "http://192.168.1.54:5076/api/adresa";

export const kreirajAdresu = async (orderData) => {
  try {
    console.log(orderData);
    const odgovor = await axiosInstance.post(API_BASE_URL, orderData, {
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
