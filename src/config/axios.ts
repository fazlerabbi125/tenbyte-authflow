import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer `;
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async function (error) {
        throw error;
    }
);
