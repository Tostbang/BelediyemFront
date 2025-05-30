"use server"

import { ApiResponse, SliderDetailResponse, SliderResponse } from "@/types";
import { apiFetch } from "@/utils/api";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";

export const getSlidersMuni = async () => {
    try {
        const data = await apiFetch('municipality/listmunicipalityslider');

        return data as SliderResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getSliderByIdMuni = async (id: string) => {
    try {
        const data = await apiFetch(`municipality/getsliderdetail?sliderId=${id}`);

        return data as SliderDetailResponse
    } catch (error) {
        console.error(error);
        return null;
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

        const response = await apiFetch<ApiResponse>('municipality/createslider', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Slayt içeriği başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Slayt içeriği eklenemedi.',
        };
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Slayt içeriği güncellenemedi.',
        };
    }
}

export const deleteSliderMuni = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>(`municipality/deleteslider?sliderId=${id}`, {
            method: 'DELETE'
        });

        return {
            success: true,
            message: data.message || 'Slayt içeriği başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Slayt içeriği silinemedi.',
        };
    }
}