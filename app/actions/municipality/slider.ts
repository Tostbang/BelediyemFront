"use server"

import { ApiResponse, ApiResponseT, PaginationBody, SliderDetailResponse, SliderResponse } from "@/types";
import { apiFetch } from "@/utils/api";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const getSlidersMuni = async (body: PaginationBody): Promise<ApiResponseT<SliderResponse>> => {
    try {
        const payload = {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        }

        const response = await axiosInstance.post('municipality/listmunicipalityslider', payload);

        return {
            success: true,
            data: response.data as SliderResponse
        }

    } catch (error) {
        return handleApiError(error);
    }
}

export const getSliderByIdMuni = async (id: string): Promise<ApiResponseT<SliderDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/getsliderdetail?sliderId=${id}`);

        return {
            success: true,
            data: response.data as SliderDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const addSliderMuni = async (formData: FormData) => {
    try {
        const url = formData.get('url') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;
        const imageData = formData.get('image') as string;


        if (!url || !imageData) {
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
            url,
            status,
            image: imagePath
        };

        const response = await axiosInstance.post('municipality/createslider', payload);
        return {
            success: true,
            message: response.data.message || 'Slayt içeriği başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateSliderMuni = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const url = formData.get('url') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;
        const imageData = formData.get('image') as string;

        if (!id || !url || !imageData) {
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
            sliderId: id,
            url,
            status,
            image: imagePath
        };

        const response = await apiFetch<ApiResponse>('municipality/updateslider', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Slayt içeriği başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const deleteSliderMuni = async (id: string) => {
    try {

        const payload = {
            sliderId: id
        };

        const response = await axiosInstance.delete(`municipality/deleteslider`, {
            data: payload
        });

        return {
            success: true,
            message: response.data.message || 'Slayt içeriği başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}