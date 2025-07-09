import { getSessionData } from "@/services/session.service";
import axios, { AxiosError, HttpStatusCode } from "axios";
import APIRoutes from "./api-routes";
import type { RefreshResponse } from "@/lib/types/response/auth.res";
import { auth } from "@/auth";
import { useAuthStore } from "@/store";

declare module "axios" {
    export interface InternalAxiosRequestConfig {
        // to prevent infinite re-runs of the error callback of the response interceptor
        _retry?: boolean;
    }
}

export const apiAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

apiAxios.interceptors.request.use(async function (config) {
    const access_token = useAuthStore.getState().access_token;
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
});

apiAxios.interceptors.response.use(
    (response) => response,
    async function (error: AxiosError) {
        const prevRequest = error.config;
        // const { refresh_token: oldRefreshToken } = await getSessionData();
        const session = await auth();
        if (
            error.status === HttpStatusCode.Unauthorized &&
            session?.refresh_token &&
            prevRequest &&
            !prevRequest._retry
        ) {
            prevRequest._retry = true;
            try {
                const {
                    data: { access_token },
                } = await axios.post<RefreshResponse>(
                    process.env.NEXT_PUBLIC_APP_URL + APIRoutes.refreshToken,
                    {
                        oldRefreshToken: session.refresh_token,
                    }
                );
                useAuthStore.getState().setToken(access_token);
                return apiAxios(prevRequest);
            } catch (err) {}
        }
        if (prevRequest?._retry) prevRequest._retry = false;
        return Promise.reject(error);
    }
);
