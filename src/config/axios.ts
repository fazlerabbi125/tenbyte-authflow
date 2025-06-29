import { deleteSession, getSessionData, setSessionData } from "@/services/session.service";
import { useAuthStore } from "@/store/auth.store";
import axios, { AxiosError, HttpStatusCode } from "axios";
import APIRoutes from "./api-routes";
import type { RefreshResponse } from "@/lib/response/auth";

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

axiosInstance.interceptors.response.use(
    (response) => response,
    async function (error: AxiosError) {
        const prevRequest = error.config;
        const { refresh_token: oldRefreshToken } = await getSessionData();
        const authStore = useAuthStore.getState();
        if (error.status === HttpStatusCode.Unauthorized && oldRefreshToken && prevRequest) {
            try {
                const {
                    data: { access_token, refresh_token },
                } = await axios.post<RefreshResponse>(
                    process.env.NEXT_PUBLIC_BACKEND_URL + APIRoutes.refreshToken,
                    {
                        refresh_token: oldRefreshToken,
                        remember_me: true,
                    }
                );
                authStore.setToken(access_token);
                // await setSessionData({ refresh_token });
                prevRequest.headers["Authorization"] = `Bearer ${access_token}`;
                return axiosInstance(prevRequest);
            } catch (err) {
                authStore.clearToken();
                // await deleteSession();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
