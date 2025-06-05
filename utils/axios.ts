import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie, deleteCookie } from "../app/actions/cookies";
import { notification } from "antd";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const customHeaders = {
    Accept: "application/json",
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    validateStatus: () => {
        return true;
    },
});

const getAuthToken = async () => {
    try {
        return await getCookie("token");
    } catch (error) {
        console.error("auth token hatası ", error);
        return null;
    }
};

axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await getAuthToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        if (response.status === 401) {
            Promise.all([
                deleteCookie("token"),
                deleteCookie("user"),
                deleteCookie("municipalityId")
            ]).then(() => {
                window.location.href = "/login";
                notification.error({ message: "Yetkisiz İstek" });
            });
            return Promise.reject(response);
        }

        if (response.status === 404) {
            notification.error({ message: "Kaynak Bulunamadı" });
            return Promise.reject(response);
        }

        if (response.status === 400) {
            notification.error({ message: "Hatalı İstek" });
            return Promise.reject(response);
        }

        if (response.status === 413) {
            notification.error({ message: "Dosya boyutu çok büyük (maksimum 10MB)" });
            return Promise.reject(response);
        }

        if (response.status >= 500) {
            notification.error({ message: "Servis Kullanım Dışı" });
            return Promise.reject(response);
        }

        return Promise.reject(response);
    },
    (error: AxiosError) => {
        if (error.message?.includes("indexedDbStorage") || ((error as { cause?: string }).cause === "indexedDbStorage")) {
            window.location.reload();
            return Promise.reject(error);
        }
        if (error.code === "ECONNABORTED") {
            notification.error({ message: "Bağlantı Zaman Aşımına Uğradı" });
            return Promise.reject(error);
        }

        if (error.response?.status === 413) {
            notification.error({ message: "Dosya boyutu çok büyük (maksimum 10MB)" });
            return Promise.reject(error);
        }

        if (!error.response) {
            notification.error({ message: "Ağ Bağlantı Hatası" });
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
