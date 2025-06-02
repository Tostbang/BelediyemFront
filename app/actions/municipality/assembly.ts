"use server"

import { ApiResponse, PaginationBody, AssemblyDetailResponse, AssemblyResponse } from "@/types";
import { apiFetch } from "@/utils/api";

export const getAssembliesMuni = async (body: PaginationBody) => {
    try {
        const data = await apiFetch('municipality/listmunicipalityassemblyarea', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize
            }
        });

        return data as AssemblyResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getAssemblyByIdMuni = async (id: string) => {
    try {
        const data = await apiFetch(`municipality/getassemblyareasdetail?assemblyAreaId=${id}`);

        return data as AssemblyDetailResponse
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

        const response = await apiFetch<ApiResponse>('municipality/createassemblyareas', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Toplanma alanı içeriği başarıyla eklendi.',
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

        const response = await apiFetch<ApiResponse>('municipality/updatessemblyareas', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Toplanma alanı içeriği başarıyla güncellendi.',
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
        const data = await apiFetch<ApiResponse>(`municipality/deletevenue?id=${id}`, {
            method: 'DELETE'
        });

        return {
            success: true,
            message: data.message || 'Toplanma alanı içeriği başarıyla silindi.',
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