"use server"

import { PaginationBody, AssemblyDetailResponse, AssemblyResponse } from "@/types";
import axiosInstance from "@/utils/axios";

export const getAssembliesMuni = async (body: PaginationBody) => {
    try {
        const response = await axiosInstance.post('municipality/listmunicipalityassemblyarea', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return response.data as AssemblyResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getAssemblyByIdMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/getassemblyareasdetail?assemblyAreaId=${id}`);

        return response.data as AssemblyDetailResponse
    } catch (error) {
        console.error(error);
        return null;
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Toplanma alanı içeriği eklenemedi.',
        };
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Toplanma alanı içeriği güncellenemedi.',
        };
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Toplanma alanı içeriği silinemedi.',
        };
    }
}