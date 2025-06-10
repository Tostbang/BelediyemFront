"use server"

import { ApiResponse, ApiResponseT, DevicesResponse, FAQDetail, FAQResponse, InfoAdmin } from "@/types";
import axiosInstance from "@/utils/axios";
import { uploadImage } from "../file";
import { validateBase64Size } from "@/utils/fileUtils";
import { handleApiError } from "@/utils/errorHandler";

export const getInfoAdmin = async (): Promise<ApiResponseT<InfoAdmin>> => {
    try {
        const response = await axiosInstance.get('admin/getinfo');
        return {
            success: true,
            data: response.data as InfoAdmin
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateInfoAdmin = async (formData: FormData) => {
    try {
        const imageData = formData.get('profileImage') as string;
        const name = formData.get('name') as string;
        const surname = formData.get('surname') as string;
        const phone = formData.get('phone') as string;
        const email = formData.get('email') as string;

        if (!imageData || !name || !phone || !surname || !email) {
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
            email,
            profileImage: imagePath,
        };

        const response = await axiosInstance.put('admin/putinfo', payload);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Bilgiler başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

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

        const response = await axiosInstance.post('admin/changepassword', payload);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Şifre başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getDevicesAdmin = async (): Promise<ApiResponseT<DevicesResponse>> => {
    try {
        const response = await axiosInstance.get('admin/getalldevice');
        return {
            success: true,
            data: response.data as DevicesResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const closeDeviceAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.get(`admin/closedevice?deviceId=${id}`);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Oturum başarıyla kapatıldı.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getFAQsAdmin = async (): Promise<ApiResponseT<FAQResponse>> => {
    try {
        const response = await axiosInstance.get('admin/getfrequentlyaskedquestions');
        return {
            success: true,
            data: response.data as FAQResponse
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getFAQByIdAdmin = async (id: string): Promise<ApiResponseT<FAQDetail>> => {
    try {
        const response = await axiosInstance.get(`admin/getfrequentlyaskedquestiondetail?faqId=${id}`);
        return {
            success: true,
            data: response.data as FAQDetail
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const addFAQAdmin = async (formData: FormData) => {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!title || !description) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            title,
            description
        };

        const response = await axiosInstance.post('admin/createfrequentlyaskedquestions', payload);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Sıkça Sorulan Sorular başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateFAQAdmin = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!id || !title || !description) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            faqId: id,
            title,
            description
        };

        const response = await axiosInstance.put('admin/updatefrequentlyaskedquestion', payload);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Sıkça Sorulan Sorular başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const deleteFAQAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`admin/deletefrequentlyaskedquestion?faqId=${id}`);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Sıkça Sorulan Sorular başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}