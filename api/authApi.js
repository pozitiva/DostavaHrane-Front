import axios from "axios";

//const API_BASE_URL = "http://192.168.1.54:5076/api/musterija";
const API_BASE_URL = "http://192.168.0.13:5076/api/musterija";

export const registerUser = async (userData) => {
  try {
    const odgovor = await axios.post(`${API_BASE_URL}/register`, userData);
    //console.log(odgovor.data);
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export const loginUser = async (userData) => {
  try {
    const odgovor = await axios.post(`${API_BASE_URL}/login`, userData);

    return odgovor.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
