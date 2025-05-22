"use server";

import { ApiResponse, DevicesResponse } from "@/types";
import { apiFetch } from "@/utils/api";

export const changePasswordStaff = async (formData: FormData) => {
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

        const response = await apiFetch<ApiResponse>('municipalstaff/changepassword', {
            method: 'POST',
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

export const sendResetRequestStaff = async () => {
    try {
        const data = await apiFetch<ApiResponse>('municipalstaff/municipalitystaffresetrequest');

        return {
            success: true,
            message: data.message || 'Şifre sıfırlama isteği gönderildi.',
            errors: [],
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Şifre sıfırlama isteği gönderilemedi.',
        };
    }
}

export const getDevicesStaff = async () => {
    try {
        const data = await apiFetch('municipalstaff/getalldevice');

        return data as DevicesResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const closeDeviceStaff = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>(`municipalstaff/closedevice?deviceId=${id}`);

        return {
            success: true,
            message: data.message || 'Oturum başarıyla kapatıldı.',
            errors: [],
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Oturum kapatılamadı.',
        };
    }
}