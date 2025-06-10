"use server";

import { AnnouncementDetailResponse, AnnouncementPaginationBody, AnnouncementResponse, ApiResponseT } from "@/types";
import axiosInstance from "@/utils/axios";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";
import { handleApiError } from "@/utils/errorHandler";

export const getAnnsMuni = async (body: AnnouncementPaginationBody): Promise<ApiResponseT<AnnouncementResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/getallannouncements', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            announcementsType: body.announcementsType || null,
            startDate: body.startDate || undefined,
            endDate: body.endDate || undefined,
        });

        return {
            success: true,
            data: response.data as AnnouncementResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getAnnByIdMuni = async (id: string): Promise<ApiResponseT<AnnouncementDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/getannouncementdetail?announcementId=${id}`);

        return {
            success: true,
            data: response.data as AnnouncementDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
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

        const response = await axiosInstance.post('municipality/createannouncement', payload);

        return {
            success: true,
            message: response.data.message || 'Etkinlik başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
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

        const response = await axiosInstance.put('municipality/updateannouncement', payload);

        return {
            success: true,
            message: response.data.message || 'Etkinlik bilgileri başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const deleteAnnMuni = async (id: string) => {
    try {
        const response = await axiosInstance.delete('municipality/deleteannouncement', {
            data: {
                announcementId: id
            }
        });

        return {
            success: true,
            message: response.data.message || 'Etkinlik başarıyla silindi.',
            errors: [],
        };
    }
    catch (error) {
        return handleApiError(error);
    }
}