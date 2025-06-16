"use server"

import { ApiResponse, ApiResponseT, CustomJwtPayload, DashboardStatisticsMuni, LoginResponse, PaginationBody, ReportsMuniResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


export const handleLoginMun = async (formData: FormData) => {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        if (!email || !password) {
            return { success: false, message: "", errors: 'E-posta ve şifre gereklidir!' };
        }
        const payload = {
            email,
            password,
        };

        const response = await axiosInstance.post('municipality/loginmunicipality', payload);
        const data = response.data as LoginResponse;

        if (data.code === "200" && data.token) {
            const token = data.token;
            try {
                const decoded = jwtDecode<CustomJwtPayload>(token);
                const expirationDate = new Date(decoded?.exp * 1000);

                (await cookies()).set('token', `Bearer ${token}`, {
                    expires: expirationDate,
                    path: '/'
                });
                (await cookies()).set('user', JSON.stringify({
                    userId: data.userId,
                    email: data.email,
                    name: data.name,
                    surname: data.surname,
                    role: data.role,
                    logoImage: data.logoImage
                }), {
                    expires: expirationDate,
                    path: '/'
                });

                return { success: true, message: data.message || 'Giriş başarılı, yönlendiriliyorsunuz.', errors: [], email, password };
            } catch (decodeError) {
                console.error("Error decoding token:", decodeError);
                return { success: false, message: "", errors: 'Token çözümleme hatası!' };
            }
        } else {
            return { success: false, message: "", errors: data.errors || data.message || 'Giriş başarısız!' };
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const handleForgetPasswordMun = async (formData: FormData) => {
    try {
        const email = formData.get('email') as string;
        if (!email) {
            return { success: false, message: "", errors: 'E-posta gereklidir!' };
        }
        const payload = {
            email,
        };

        const response = await axiosInstance.post('municipality/passwordforgot', payload);
        const data = response.data as ApiResponse;

        return { success: true, message: data.message || 'Şifre sıfırlama bağlantısı gönderildi.', errors: [] };
    } catch (error) {
        return handleApiError(error);
    }
}

export const handleLogoutMuni = async () => {
    try {
        const response = await axiosInstance.get('municipality/logout');
        const data = response.data as ApiResponse;
        return { success: true, message: data.message || 'Çıkış yapıldı.', errors: [] };

    } catch (error) {
        return handleApiError(error);
    }
}

export const getDashboardMuni = async (): Promise<ApiResponseT<DashboardStatisticsMuni>> => {
    try {
        const response = await axiosInstance.get('municipality/getdashboardstatistics');
        return {
            success: true,
            data: response.data as DashboardStatisticsMuni
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getReportsMuni = async (body: PaginationBody): Promise<ApiResponseT<ReportsMuniResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/getallreports', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return {
            success: true,
            data: response.data as ReportsMuniResponse
        };

    } catch (error) {
        return handleApiError(error);
    }
}

export const createReportMuni = async () => {
    try {
        const response = await axiosInstance.get('municipality/createstatisticsreport');
        const data = response.data as ApiResponse;

        return { success: true, message: data.message || 'Rapor oluşturuldu.', errors: [] };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateLastSeenMuni = async () => {
    try {
        const response = await axiosInstance.get('municipality/lastseenupdate');
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Son görülme güncellendi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}