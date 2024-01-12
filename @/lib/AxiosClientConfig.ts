import axios, { AxiosRequestHeaders } from "axios";
import { getCookie } from "cookies-next";

// Membuat instance axios dengan konfigurasi dasar
export const axiosClientInstance = axios.create({
  baseURL: "https://api-dsarea.aitilokal.com", // Sesuaikan dengan URL API Anda
});

// Menambahkan interceptor permintaan untuk menambahkan header Authorization
axiosClientInstance.interceptors.request.use(
  (config) => {
    // Mendapatkan token dari localStorage
    const token = getCookie("DS-X-Access-Agent-Token");
    if (token) {
      // Menetapkan header Authorization dengan token
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
