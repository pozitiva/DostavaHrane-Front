import axios from "axios";
import useMusterijaSkladiste from "./../store/MusterijaSkladiste";

const API_BASE_URL = "http://192.168.1.54:5076/api/narudzbina";
``;
export const napraviNarudzbinu = async (orderData) => {
  const { korisnik } = useMusterijaSkladiste.getState();
  try {
    const odgovor = await axios.post(API_BASE_URL, orderData, {
      headers: {
        Authorization: `${korisnik?.id}`,
        "Content-Type": "application/json",
      },
    });
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
