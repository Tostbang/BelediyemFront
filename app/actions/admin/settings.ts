"use server"

import { ApiResponse, DevicesResponse } from "@/types";
import { apiFetch } from "@/utils/api";

export const changePasswordAdmin = async (formData: FormData) => {
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

        const response = await apiFetch<ApiResponse>('admin/changepassword', {
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

export const getDevicesAdmin = async () => {
    try {
        const data = await apiFetch('admin/getalldevice');

        return data as DevicesResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const closeDeviceAdmin = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>(`admin/closedevice?deviceId=${id}`);

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