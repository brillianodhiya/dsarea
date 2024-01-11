"use server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import axios, { AxiosRequestHeaders } from "axios";

// Membuat instance axios dengan konfigurasi dasar
export const axiosInstance = axios.create({
  baseURL: process.env.URL_BE, // Sesuaikan dengan URL API Anda
});

// Menambahkan interceptor permintaan untuk menambahkan header Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    // Mendapatkan token dari cookie
    const token = getCookie("DS-X-Access-Agent-Token", { cookies });

    console.log(token, "TOKEN");
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
