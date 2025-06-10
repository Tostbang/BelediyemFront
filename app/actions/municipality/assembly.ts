"use server"

import { PaginationBody, AssemblyDetailResponse, AssemblyResponse, ApiResponseT } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const getAssembliesMuni = async (body: PaginationBody): Promise<ApiResponseT<AssemblyResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/listmunicipalityassemblyarea', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return {
            success: true,
            data: response.data as AssemblyResponse
        }

    } catch (error) {
        return handleApiError(error);
    }
}

export const getAssemblyByIdMuni = async (id: string): Promise<ApiResponseT<AssemblyDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/getassemblyareasdetail?assemblyAreaId=${id}`);

        return {
            success: true,
            data: response.data as AssemblyDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const addAssemblyMuni = async (formData: FormData) => {
    try {
        const title = formData.get('title') as string;
        const latitude = formData.get('latitude') as string;
        const longitude = formData.get('longitude') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;

        if (!title || !latitude || !longitude) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            title,
            status,
            latitude,
            longitude,
        };

        const response = await axiosInstance.post('municipality/createassemblyareas', payload);

        return {
            success: true,
            message: response.data.message || 'Toplanma alanı içeriği başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateAssemblyMuni = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const latitude = formData.get('latitude') as string;
        const longitude = formData.get('longitude') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;


        if (!title || !latitude || !longitude) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            facilityId: id,
            title,
            status,
            latitude,
            longitude,
        };

        const response = await axiosInstance.put('municipality/updatessemblyareas', payload);

        return {
            success: true,
            message: response.data.message || 'Toplanma alanı içeriği başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const deleteAssemblyMuni = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`municipality/deletevenue?id=${id}`);

        return {
            success: true,
            message: response.data.message || 'Toplanma alanı içeriği başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}