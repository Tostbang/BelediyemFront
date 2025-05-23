"use server"

import { ApiResponse, DevicesResponse, FAQDetail, FAQResponse, InfoAdmin } from "@/types";
import { apiFetch } from "@/utils/api";
import { uploadImage } from "../file";
import { validateBase64Size } from "@/utils/fileUtils";

export const getInfoAdmin = async () => {
    try {
        const data = await apiFetch('admin/getinfo');

        return data as InfoAdmin
    } catch (error) {
        console.error(error);
        return null;
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

        const response = await apiFetch<ApiResponse>('admin/putinfo', {
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

export const getFAQsAdmin = async () => {
    try {
        const data = await apiFetch('admin/getfrequentlyaskedquestions');

        return data as FAQResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getFAQByIdAdmin = async (id: string) => {
    try {
        const data = await apiFetch(`admin/getfrequentlyaskedquestiondetail?faqId=${id}`);

        return data as FAQDetail
    } catch (error) {
        console.error(error);
        return null;
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

        const response = await apiFetch<ApiResponse>('admin/createfrequentlyaskedquestions', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Sıkça Sorulan Sorular başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Sıkça Sorulan Sorular eklenemedi.',
        };
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

        const response = await apiFetch<ApiResponse>('admin/updatefrequentlyaskedquestion', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Sıkça Sorulan Sorular başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Sıkça Sorulan Sorular güncellenemedi.',
        };
    }
}

export const deleteFAQAdmin = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>(`admin/deletefrequentlyaskedquestion?faqId=${id}`, {
            method: 'DELETE'
        });

        return {
            success: true,
            message: data.message || 'Sıkça Sorulan Sorular başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Sıkça Sorulan Sorular silinemedi.',
        };
    }
}