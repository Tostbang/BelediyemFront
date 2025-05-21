"use server"

import { ApiResponse, CustomJwtPayload, DashboardStatisticsStaff, LoginResponse } from "@/types";
import { apiFetch } from "@/utils/api";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const handleLoginStaff = async (formData: FormData) => {
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

        const data = await apiFetch<LoginResponse>('municipalstaff/loginmunicipalitystaff', {
            method: 'POST',
            body: payload
        });

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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Giriş yapılamadı.',
        };
    }
}

export const handleForgetPasswordStaff = async (formData: FormData) => {
    try {
        const email = formData.get('email') as string;
        if (!email) {
            return { success: false, message: "", errors: 'E-posta gereklidir!' };
        }
        const payload = {
            email,
        };

        const data = await apiFetch<ApiResponse>('municipalstaff/passwordforgot', {
            method: 'POST',
            body: payload
        });

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


export const handleLogoutStaf = async () => {
    try {
        const data = await apiFetch<ApiResponse>('municipalstaff/logout');
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

export const getDashboardStaff = async () => {
    try {
        const data = await apiFetch('municipalstaff/getdashboardstatistics');

        return data as DashboardStatisticsStaff
    } catch (error) {
        console.error(error);
        return null;
    }
}