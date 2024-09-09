import axios from "axios";
import { storeToken } from "../utils/tokenService";
import { API_BASE_URL } from "../utils/zajednickiPodaci";

export const registracijaMusterije = async (userData) => {
  try {
    console.log(userData);
    const odgovor = await axios.post(
      `${API_BASE_URL}/korisnik/musterija/register`,
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
      `${API_BASE_URL}/korisnik/musterija/login`,
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
      `${API_BASE_URL}/korisnik/restoran/login`,
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
      `${API_BASE_URL}/korisnik/admin/login`,
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
