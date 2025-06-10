"use server"

import { ApiResponseT, PaginationBody, VenueDetailResponse, VenueResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";
import { handleApiError } from "@/utils/errorHandler";

export const getVenuesMuni = async (body: PaginationBody): Promise<ApiResponseT<VenueResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/getallvenue', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return {
            success: true,
            data: response.data as VenueResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getVenueByIdMuni = async (id: string): Promise<ApiResponseT<VenueDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/getvenuedetail?venueId=${id}`);

        return {
            success: true,
            data: response.data as VenueDetailResponse
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const addVenueMuni = async (formData: FormData) => {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const imageData = formData.get('image') as string;
        const latitude = formData.get('latitude') as string;
        const longitude = formData.get('longitude') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;

        if (!title || !imageData || !description || !latitude || !longitude) {
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
            latitude,
            longitude,
            status,
            image: imagePath
        };

        const response = await axiosInstance.post('municipality/createvenues', payload);

        return {
            success: true,
            message: response.data.message || 'Mekan içeriği başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateVenueMuni = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const imageData = formData.get('image') as string;
        const latitude = formData.get('latitude') as string;
        const longitude = formData.get('longitude') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;


        if (!id || !title || !imageData || !description || !latitude || !longitude) {
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
            venuesId: id,
            title,
            description,
            latitude,
            longitude,
            status,
            image: imagePath
        };

        const response = await axiosInstance.put('municipality/updatevenue', payload);

        return {
            success: true,
            message: response.data.message || 'Mekan içeriği başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const deleteVenueMuni = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`municipality/deletevenue?id=${id}`);

        return {
            success: true,
            message: response.data.message || 'Mekan içeriği başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}