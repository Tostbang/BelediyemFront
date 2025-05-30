"use server"
import { ApiResponse, DevicesResponse, FAQDetail, FAQResponse, InfoMuni } from "@/types";
import { apiFetch } from "@/utils/api";

import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";

export const getInfoMuni = async () => {
    try {
        const data = await apiFetch('municipality/getinfo');

        return data as InfoMuni
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateInfoMuni = async (formData: FormData) => {
    try {
        const imageData = formData.get('logoImg') as string;
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const landlinePhone = formData.get('landlinePhone') as string;
        const url = formData.get('url') as string;
        const city = formData.get('city') as string;
        const discrit = formData.get('discrit') as string;
        const adressline = formData.get('adressline') as string;

        if (!imageData || !name || !phone || !landlinePhone || !url || !city || !discrit || !adressline) {
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
            landlinePhone,
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

export const changePasswordMuni = async (formData: FormData) => {
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

export const sendResetRequestMuni = async () => {
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

export const getDevicesMuni = async () => {
    try {
        const data = await apiFetch('municipality/getalldevice');

        return data as DevicesResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const closeDeviceMuni = async (id: string) => {
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

export const getFAQsMuni = async () => {
    try {
        const data = await apiFetch('municipality/getfrequentlyaskedquestions');

        return data as FAQResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getFAQByIdMuni = async (id: string) => {
    try {
        const data = await apiFetch(`municipality/getfrequentlyaskedquestiondetail?faqId=${id}`);

        return data as FAQDetail
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const addFAQMuni = async (formData: FormData) => {
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

        const response = await apiFetch<ApiResponse>('municipality/createfrequentlyaskedquestions', {
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

export const updateFAQMuni = async (formData: FormData) => {
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

        const response = await apiFetch<ApiResponse>('municipality/updatefrequentlyaskedquestion', {
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

export const deleteFAQMuni = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>(`municipality/deletefrequentlyaskedquestion?faqId=${id}`, {
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