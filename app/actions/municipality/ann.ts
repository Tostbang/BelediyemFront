"use server";

import { AnnouncementDetailResponse, AnnouncementPaginationBody, AnnouncementResponse, ApiResponse } from "@/types";
import { apiFetch } from "@/utils/api";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";

export const getAnnsMuni = async (body: AnnouncementPaginationBody) => {
    try {
        const data = await apiFetch('municipality/getallannouncements', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize,
                announcementsType: body.announcementsType || null,
                startDate: body.startDate || undefined,
                endDate: body.endDate || undefined,
            }
        });

        return data as AnnouncementResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getAnnsByIdMuni = async (id: string) => {
    try {
        const data = await apiFetch(`municipality/getannouncementdetail?announcementId=${id}`);

        return data as AnnouncementDetailResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const addAnnfMuni = async (formData: FormData) => {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const imageData = formData.get('image') as string;
        const announcementsType = formData.get('announcementsType') as string;

        if (!title || !description || !imageData || !announcementsType) {
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
            title,
            description,
            image: imagePath,
            announcementsType: parseInt(announcementsType),
        };

        const response = await apiFetch<ApiResponse>('municipality/createannouncement', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Etkinlik başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Etkinlik eklenemedi.',
        };
    }
}

export const updateAnnMuni = async (formData: FormData) => {
    try {

        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const imageData = formData.get('image') as string;
        const announcementsType = formData.get('announcementsType') as string;

        if (!title || !description || !imageData || !announcementsType) {
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
            id,
            title,
            description,
            image: imagePath,
            announcementsType: parseInt(announcementsType),
        };

        const response = await apiFetch<ApiResponse>('municipality/updateannouncement', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Etkinlik bilgileri başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Etkinlik bilgileri güncellenemedi.',
        };
    }
}

export const deleteAnnMuni = async (id: string) => {
    try {
        const response = await apiFetch<ApiResponse>('municipality/deleteannouncement', {
            method: 'DELETE',
            body: {
                announcementId: id,
            }
        });

        return {
            success: true,
            message: response.message || 'Etkinlik başarıyla silindi.',
            errors: [],
        };
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Etkinlik silinemedi.',
        };
    }
}