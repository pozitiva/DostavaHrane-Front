import axios from "axios";
import { getToken } from "../utils/tokenService";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.13:5076/api",
});

// const axiosInstance = axios.create({
//   baseURL: "http://192.168.1.54:5076/api",
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
