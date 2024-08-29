import axios from "axios";

const API_BASE_URL = "http://192.168.1.54:5076/api/restoran";
//const API_BASE_URL = "http://192.168.0.13:5076/api/restoran";

export const vratiSveRestorane = async () => {
  try {
    const odgovor = await axios.get(API_BASE_URL);
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const vratiRestoran = async (id) => {
  try {
    const odgovor = await axios.get(`${API_BASE_URL}/${id}`);
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const vratiJelaZaRestoran = async (id) => {
  try {
    const odgovor = await axios.get(`${API_BASE_URL}/${id}/jela`);
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
