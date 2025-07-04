"use server"

import { PaginationBody, FacilityDetailResponse, FacilityResponse, ApiResponseT } from "@/types";
import axiosInstance from "@/utils/axios";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";
import { handleApiError } from "@/utils/errorHandler";
import { getCookie } from "../cookies";

export const getFacilitiesMuniAdmin = async (body: PaginationBody): Promise<ApiResponseT<FacilityResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/listmunicipalityfacility?municipalityId=${municipalityId}`, {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return {
            success: true,
            data: response.data as FacilityResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getFacilityByIdMuniAdmin = async (id: string): Promise<ApiResponseT<FacilityDetailResponse>> => {
    const municipalityId = await getCookie('municipalityId');
    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/getfacilitydetail?facilityId=${id}&municipalityId=${municipalityId}`);

        return {
            success: true,
            data: response.data as FacilityDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const addFacilityMuniAdmin = async (formData: FormData) => {
    const municipalityId = await getCookie('municipalityId');
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

        const response = await axiosInstance.post(`adminmunicipalitypanel/createfacility?municipalityId=${municipalityId}`, payload);

        return {
            success: true,
            message: response.data.message || 'Tesis içeriği başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateFacilityMuniAdmin = async (formData: FormData) => {
    const municipalityId = await getCookie('municipalityId');
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

        const response = await axiosInstance.put(`adminmunicipalitypanel/updatefacility?municipalityId=${municipalityId}`, payload);

        return {
            success: true,
            message: response.data.message || 'Tesis içeriği başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const deleteFacilityMuniAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`adminmunicipalitypanel/deletevenue?id=${id}`);

        return {
            success: true,
            message: response.data.message || 'Tesis içeriği başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}