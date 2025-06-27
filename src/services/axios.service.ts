import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/config/axios";

const AxiosServices = {
    get: async function <D = any, C extends AxiosRequestConfig = AxiosRequestConfig<any>>(
        url: string,
        config?: C
    ) {
        return axiosInstance.get<D>(url, config);
    },
    post: async function <
        D = any,
        B extends Record<string, any> = object,
        C extends AxiosRequestConfig = AxiosRequestConfig<any>
    >(url: string, body: B, config?: C) {
        return axiosInstance.post<D>(url, body, config);
    },
    update: async function <
        D = any,
        B extends Record<string, any> = object,
        C extends AxiosRequestConfig = AxiosRequestConfig<any>
    >(url: string, body: B, config?: C) {
        return axiosInstance.patch<D>(url, body, config);
    },
    delete: async function <D = any, C extends AxiosRequestConfig = AxiosRequestConfig<any>>(
        url: string,
        config?: C
    ) {
        return axiosInstance.delete<D>(url, config);
    },
};

export default AxiosServices;
