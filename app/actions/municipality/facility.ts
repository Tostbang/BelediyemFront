"use server"

import { PaginationBody, FacilityDetailResponse, FacilityResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";

export const getFacilitiesMuni = async (body: PaginationBody) => {
    try {
        const response = await axiosInstance.post('municipality/listmunicipalityfacility', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return response.data as FacilityResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getFacilityByIdMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/getfacilitydetail?facilityId=${id}`);

        return response.data as FacilityDetailResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const addFacilityMuni = async (formData: FormData) => {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const imageData = formData.get('image') as string;
        const latitude = formData.get('latitude') as string;
        const longitude = formData.get('longitude') as string;
        const address = formData.get('address') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;


        if (!title || !imageData || !description || !latitude || !longitude || !address) {
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
            status,
            description,
            latitude,
            longitude,
            address,
            image: imagePath
        };

        const response = await axiosInstance.post('municipality/createfacility', payload);

        return {
            success: true,
            message: response.data.message || 'Tesis içeriği başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Tesis içeriği eklenemedi.',
        };
    }
}

export const updateFacilityMuni = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const imageData = formData.get('image') as string;
        const latitude = formData.get('latitude') as string;
        const longitude = formData.get('longitude') as string;
        const address = formData.get('address') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;


        if (!title || !imageData || !description || !latitude || !longitude || !address) {
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
            facilityId: id,
            title,
            status,
            description,
            latitude,
            longitude,
            address,
            image: imagePath
        };

        const response = await axiosInstance.put('municipality/updatefacility', payload);

        return {
            success: true,
            message: response.data.message || 'Tesis içeriği başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Tesis içeriği güncellenemedi.',
        };
    }
}

export const deleteFacilityMuni = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`municipality/deletevenue?id=${id}`);

        return {
            success: true,
            message: response.data.message || 'Tesis içeriği başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Tesis içeriği silinemedi.',
        };
    }
}