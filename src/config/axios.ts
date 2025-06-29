import { deleteSession, getSession, setSessionData } from "@/services/session.service";
import { useAuthStore } from "@/store/auth.store";
import axios, { AxiosError, HttpStatusCode } from "axios";
import APIRoutes from "./api-routes";
import { RefreshResponse } from "@/lib/response/auth";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use(function (config) {
    const access_token = useAuthStore.getState().access_token;
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
});
