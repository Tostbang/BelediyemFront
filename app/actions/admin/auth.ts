"use server"

import { ApiResponse, ApiResponseT, CustomJwtPayload, DashboardStatisticsAdmin, LoginResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const handleLoginAdmin = async (formData: FormData) => {
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

        const response = await axiosInstance.post('admin/login', payload);
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
            profileImage: data.profileImage
        }), {
            expires: expirationDate,
            path: '/'
        });

        return { success: true, message: data.message || 'Giriş başarılı, yönlendiriliyorsunuz.', errors: [], email, password };
    } catch (error) {
        return handleApiError(error);

    }
}

export const handleLogoutAdmin = async () => {
    try {
        const response = await axiosInstance.get('admin/logout');
        const data = response.data as ApiResponse;
        return { success: true, message: data.message || 'Çıkış yapıldı.', errors: [] };

    } catch (error) {
        return handleApiError(error);
    }
}

export const getDashboardAdmin = async (): Promise<ApiResponseT<DashboardStatisticsAdmin>> => {
    try {
        const response = await axiosInstance.get('admin/getdashboardstatistics');
        return {
            success: true,
            data: response.data as DashboardStatisticsAdmin,
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateLastSeenAdmin = async () => {
    try {
        const response = await axiosInstance.get('admin/lastseenupdate');
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