"use server"

import { ApiResponse, CustomJwtPayload, DashboardStatisticsMuni, InfoMuni, LoginResponse, PaginationBody, ReportsMuniResponse } from "@/types";
import { apiFetch } from "@/utils/api";
import { validateBase64Size } from "@/utils/fileUtils";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { uploadImage } from "../file";

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

        const data = await apiFetch<LoginResponse>('municipality/loginmunicipality', {
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

        const data = await apiFetch<ApiResponse>('municipality/passwordforgot', {
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

export const handleLogoutMun = async () => {
    try {
        const data = await apiFetch<ApiResponse>('municipality/logout');
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
        const data = await apiFetch('municipality/getdashboardstatistics');

        return data as DashboardStatisticsMuni
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getReportsMuni = async (body: PaginationBody) => {
    try {
        const data = await apiFetch('municipality/getallreports', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize
            }
        });

        return data as ReportsMuniResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getInfoMun = async () => {
    try {
        const data = await apiFetch('municipality/getinfo');

        return data as InfoMuni
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateInfoMun = async (formData: FormData) => {
    try {
        const imageData = formData.get('logoImg') as string;
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const url = formData.get('url') as string;
        const city = formData.get('city') as string;
        const discrit = formData.get('discrit') as string;
        const adressline = formData.get('adressline') as string;

        if (!imageData || !name || !phone || !url || !city || !discrit || !adressline) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        let imagePath = imageData;
        if (imageData.startsWith('data:image')) {
            const sizeValidation = validateBase64Size(imageData);
            if (!sizeValidation.valid) {
                return { success: false, message: "", errors: sizeValidation.message };
            }

            const imageFormData = new FormData();
            imageFormData.append('image', imageData);

            const uploadResult = await uploadImage(imageFormData);
            if (!uploadResult.success) {
                return {
                    success: false,
                    message: "",
                    errors: uploadResult.errors || 'Görsel yüklenemedi.'
                };
            }
            imagePath = uploadResult.path ?? '';
        }

        const payload = {
            name,
            phone,
            logoImg: imagePath,
            url,
            city,
            discrit,
            adressline,
        };

        const response = await apiFetch<ApiResponse>('municipality/putinfo', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Bilgiler başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Bilgiler güncellenemedi.',
        };
    }
}

export const changePasswordMun = async (formData: FormData) => {
    try {
        const oldPassword = formData.get('oldPassword') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        if (newPassword !== confirmPassword) {
            return { success: false, message: "", errors: 'Yeni şifreler eşleşmiyor.' };
        }

        const payload = {
            oldPassword,
            newPassword,
            confirmPassword
        };

        const response = await apiFetch<ApiResponse>('municipality/changepassword', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Şifre başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Şifre güncellenemedi.',
        };
    }
}