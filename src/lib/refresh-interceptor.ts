import "server-only";
import { axiosInstance } from "@/config/axios";
import { deleteSession, getSession, setSessionData } from "@/services/session.service";
import { useAuthStore } from "@/store/auth.store";
import { AxiosError, HttpStatusCode } from "axios";
import { RefreshResponse } from "./response/auth";
import APIRoutes from "@/config/api-routes";

axiosInstance.interceptors.response.use(
    (response) => response,
    async function (error: AxiosError) {
        const prevRequest = error.config;
        const session = await getSession();
        const authStore = useAuthStore.getState();
        if (!(error.status === HttpStatusCode.Unauthorized && session.refresh_token && prevRequest))
            return Promise.reject(error);

        try {
            const {
                data: { access_token, refresh_token },
            } = await axiosInstance.post<RefreshResponse>(APIRoutes.refreshToken, {
                refresh_token: session.refresh_token,
                remember_me: true,
            });
            authStore.setToken(access_token);
            await setSessionData({ refresh_token });
            prevRequest.headers["Authorization"] = `Bearer ${access_token}`;
            return axiosInstance(prevRequest);
        } catch (err) {
            authStore.clearToken();
            await deleteSession();
            return Promise.reject(err);
        }
    }
);
