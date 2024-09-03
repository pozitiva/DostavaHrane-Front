import axios from "axios";
import useKorisnikSkladiste from "../store/KorisnikSkladiste";

// const axiosInstance = axios.create({
//   baseURL: "http://192.168.1.54:5076/api",
// });
const axiosInstance = axios.create({
  baseURL: "http://192.168.0.13:5076/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { korisnik } = useKorisnikSkladiste.getState();
    if (korisnik?.id) {
      config.headers["Authorization"] = `${korisnik.id}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
