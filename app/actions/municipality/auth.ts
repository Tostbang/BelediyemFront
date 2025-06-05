"use server"

import { ApiResponse, CustomJwtPayload, DashboardStatisticsMuni, LoginResponse, PaginationBody, ReportsMuniResponse } from "@/types";
import axiosInstance from "@/utils/axios";
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

        const token = data.token;
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
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Giriş yapılamadı.',
        };
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Şifre sıfırlama bağlantısı gönderilemedi.',
        };
    }
}

export const handleLogoutMuni = async () => {
    try {
        const response = await axiosInstance.get('municipality/logout');
        const data = response.data as ApiResponse;
        return { success: true, message: data.message || 'Çıkış yapıldı.', errors: [] };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Çıkış yapılamadı.',
        };
    }
}

export const getDashboardMuni = async () => {
    try {
        const response = await axiosInstance.get('municipality/getdashboardstatistics');
        return response.data as DashboardStatisticsMuni;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getReportsMuni = async (body: PaginationBody) => {
    try {
        const response = await axiosInstance.post('municipality/getallreports', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return response.data as ReportsMuniResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createReportMuni = async () => {
    try {
        const response = await axiosInstance.get('municipality/createstatisticsreport');
        const data = response.data as ApiResponse;

        return { success: true, message: data.message || 'Rapor oluşturuldu.', errors: [] };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Rapor oluşturulamadı.',
        };
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Son görülme güncellenemedi.',
        };
    }
}