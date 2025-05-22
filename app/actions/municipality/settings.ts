"use server"
import { ApiResponse, DevicesResponse, InfoMuni } from "@/types";
import { apiFetch } from "@/utils/api";

import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";

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

export const sendResetRequestMun = async () => {
    try {
        const data = await apiFetch<ApiResponse>('municipality/municipalityresetrequest');

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

export const getDevicesMun = async () => {
    try {
        const data = await apiFetch('municipality/getalldevice');

        return data as DevicesResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const closeDeviceMun = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>(`municipality/closedevice?deviceId=${id}`);

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