import axios from "axios";
import { storeToken } from "../utils/tokenService";

const API_BASE_URL = `http://192.168.0.13:5076/api/korisnik`;
// const API_BASE_URL = `http://192.168.1.54:5076/api/korisnik`;

export const registracijaMusterije = async (userData) => {
  try {
    console.log(userData);
    const odgovor = await axios.post(
      `${API_BASE_URL}/musterija/register`,
      userData
    );
    //console.log(odgovor.data);
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export const loginMusterija = async (userData) => {
  try {
    const odgovor = await axios.post(
      `${API_BASE_URL}/musterija/login`,
      userData
    );

    const { token } = odgovor.data;
    await storeToken(token);
    return odgovor.data.rezultat;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const loginRestoran = async (userData) => {
  try {
    const odgovor = await axios.post(
      `${API_BASE_URL}/restoran/login`,
      userData
    );

    const { token } = odgovor.data;
    await storeToken(token);
    return odgovor.data.rezultat;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const loginAdmin = async (userData) => {
  try {
    const odgovor = await axios.post(`${API_BASE_URL}/admin/login`, userData);

    const { token } = odgovor.data;
    await storeToken(token);
    return odgovor.data.rezultat;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
