import axios from "axios";
import { storeToken } from "../utils/tokenService";
import { API_BASE_URL } from "../utils/zajednickiPodaci";

const baseUrl = `${API_BASE_URL}/api`;
export const registracijaMusterije = async (userData) => {
  try {
    const odgovor = await axios.post(
      `${baseUrl}/korisnik/musterija/register`,
      userData
    );
    return odgovor.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export const loginMusterija = async (userData) => {
  try {
    const odgovor = await axios.post(
      `${baseUrl}/korisnik/musterija/login`,
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
      `${baseUrl}/korisnik/restoran/login`,
      userData
    );

    const { token } = odgovor.data;
    await storeToken(token);
    return odgovor.data.rezultat;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export const loginAdmin = async (userData) => {
  try {
    const odgovor = await axios.post(
      `${baseUrl}/korisnik/admin/login`,
      userData
    );

    // const { token } = odgovor.data;
    // await storeToken(token);
    return odgovor.data.rezultat;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
