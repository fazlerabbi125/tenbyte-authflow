import { AxiosRequestConfig } from "axios";
import { apiAxios } from "@/config/axios.config";

const AxiosServices = {
    get: async function <D = any, C extends AxiosRequestConfig = AxiosRequestConfig<any>>(
        url: string,
        config?: C
    ) {
        return apiAxios.get<D>(url, config);
    },
    post: async function <
        D = any,
        B extends Record<string, any> = object,
        C extends AxiosRequestConfig = AxiosRequestConfig<any>
    >(url: string, body?: B, config?: C) {
        return apiAxios.post<D>(url, body, config);
    },
    update: async function <
        D = any,
        B extends Record<string, any> = object,
        C extends AxiosRequestConfig = AxiosRequestConfig<any>
    >(url: string, body: B, config?: C) {
        return apiAxios.patch<D>(url, body, config);
    },
    delete: async function <D = any, C extends AxiosRequestConfig = AxiosRequestConfig<any>>(
        url: string,
        config?: C
    ) {
        return apiAxios.delete<D>(url, config);
    },
};

export default AxiosServices;
