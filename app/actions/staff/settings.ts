"use server";

import { DevicesResponse, FAQResponse, InfoStaff } from "@/types";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";
import axiosInstance from "@/utils/axios";

export const getInfoStaff = async () => {
    try {
        const response = await axiosInstance.get('municipalstaff/getinfo');

        return response.data as InfoStaff
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateInfoStaff = async (formData: FormData) => {
    try {
        const imageData = formData.get('profileImage') as string;
        const name = formData.get('name') as string;
        const surname = formData.get('surname') as string;
        const phone = formData.get('phone') as string;

        if (!imageData || !name || !phone || !surname) {
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
            surname,
            phone,
            profileImage: imagePath,
        };

        const response = await axiosInstance.put('municipalstaff/putinfo',
            payload
        );

        return {
            success: true,
            message: response.data.message || 'Bilgiler başarıyla güncellendi.',
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

        const response = await axiosInstance.post('municipalstaff/changepassword', payload);

        return {
            success: true,
            message: response.data.message || 'Şifre başarıyla güncellendi.',
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
        const response = await axiosInstance.get('municipalstaff/municipalitystaffresetrequest');

        return {
            success: true,
            message: response.data.message || 'Şifre sıfırlama isteği gönderildi.',
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
        const response = await axiosInstance.get('municipalstaff/getalldevice');

        return response.data as DevicesResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const closeDeviceStaff = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipalstaff/closedevice?deviceId=${id}`);

        return {
            success: true,
            message: response.data.message || 'Oturum başarıyla kapatıldı.',
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

export const getFAQsStaff = async () => {
    try {
        const response = await axiosInstance.get('municipalstaff/getmunicipalityfrequentlyaskedquestions');

        return response.data as FAQResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}
