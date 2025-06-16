import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "../app/actions/cookies";

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
            if (response.data && response.data.code &&
                (response.data.code === '400' || response.data.code === '401' ||
                    response.data.code === '403' || response.data.code === '404' ||
                    response.data.code === '500')) {

                const formattedError = {
                    type: "ERROR_IN_RESPONSE",
                    code: response.data.code,
                    message: response.data.message || 'Bir hata oluştu.',
                    errors: response.data.errors || [],
                    originalResponse: response
                };

                return Promise.reject(formattedError);
            }
            return response;
        }

        if (response.status === 401) {
            const formattedError = {
                type: "UNAUTHORIZED",
                message: "Yetkisiz Erişim: Token geçersiz veya süresi dolmuş.",
                originalResponse: response
            };
            return Promise.reject(formattedError);
        }

        if (response.status === 404) {
            const formattedError = {
                type: "NOT_FOUND",
                message: `Kaynak Bulunamadı: ${response.config.url}`,
                originalResponse: response
            };

            return Promise.reject(formattedError);
        }

        if (response.status === 400) {
            return Promise.reject(response.data);
        }

        if (response.status === 413) {
            const formattedError = {
                type: "PAYLOAD_TOO_LARGE",
                message: "Dosya boyutu çok büyük (maksimum 10MB)",
                originalResponse: response
            };

            return Promise.reject(formattedError);
        }

        if (response.status >= 500) {
            const formattedError = {
                type: "SERVER_ERROR",
                message: "Sunucu Hatası",
                originalResponse: response
            };
            return Promise.reject(formattedError);
        }

        return Promise.reject(response);
    },
    (error: AxiosError) => {
        if (error.message?.includes("indexedDbStorage") || ((error as { cause?: string }).cause === "indexedDbStorage")) {
            window.location.reload();
            return Promise.reject(error);
        }
        if (error.code === "ECONNABORTED") {
            const formattedError = {
                type: "ECONNABORTED",
                message: "Bağlantı Zaman Aşımına Uğradı",
                originalResponse: error.response
            };
            return Promise.reject(formattedError);
        }

        if (!error.response) {
            const formattedError = {
                type: "NETWORK_ERROR",
                message: "Ağ Bağlantı Hatası",
                originalResponse: error
            };
            return Promise.reject(formattedError);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
