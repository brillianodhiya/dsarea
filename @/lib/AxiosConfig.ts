"use server";
import { cookies } from "next/headers";
import { deleteCookie, getCookie } from "cookies-next";
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

axiosInstance.interceptors.response.use(
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
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
