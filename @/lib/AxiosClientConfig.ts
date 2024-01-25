import axios, { AxiosRequestHeaders } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { redirect } from "next/navigation";

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


axiosClientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Menangani kesalahan respons
    if (error.response && error.response.status === 401) {
      // Token tidak valid atau kedaluwarsa, redirect ke halaman login
      // Gantilah '/login' dengan URL halaman login Anda
      // redirect('/')
      deleteCookie("DS-X-Access-Agent-Token");
      deleteCookie("DS-X-Access-Agent-Role");
      window.location.href = '/';

    }
    return Promise.reject(error);
  }
);