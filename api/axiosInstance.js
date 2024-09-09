import axios from "axios";
import { getToken } from "../utils/tokenService";
import { API_BASE_URL } from "../utils/zajednickiPodaci";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL  ,
// });

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
