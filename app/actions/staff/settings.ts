"use server";

import { DevicesResponse, FAQResponse, InfoStaff, ApiResponseT } from "@/types";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";


export const getInfoStaff = async (): Promise<ApiResponseT<InfoStaff>> => {
    try {
        const response = await axiosInstance.get('municipalstaff/getinfo');
        return {
            success: true,
            data: response.data as InfoStaff
        };
    } catch (error) {
        return handleApiError(error);
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

        const response = await axiosInstance.put('municipalstaff/putinfo', payload);

        return {
            success: true,
            message: response.data.message || 'Bilgiler başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
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
        return handleApiError(error);
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
        return handleApiError(error);
    }
}

export const getDevicesStaff = async (): Promise<ApiResponseT<DevicesResponse>> => {
    try {
        const response = await axiosInstance.get('municipalstaff/getalldevice');

        return {
            success: true,
            data: response.data as DevicesResponse
        };
    } catch (error) {
        return handleApiError(error);
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
        return handleApiError(error);
    }
}

export const getFAQsStaff = async (): Promise<ApiResponseT<FAQResponse>> => {
    try {
        const response = await axiosInstance.get('municipalstaff/getmunicipalityfrequentlyaskedquestions');

        return {
            success: true,
            data: response.data as FAQResponse
        };
    } catch (error) {
        return handleApiError(error);
    }
}
