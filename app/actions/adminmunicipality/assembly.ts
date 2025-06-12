"use server"

import { PaginationBody, AssemblyDetailResponse, AssemblyResponse, ApiResponseT } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";
import { getCookie } from "../cookies";

export const getAssembliesMuniAdmin = async (body: PaginationBody): Promise<ApiResponseT<AssemblyResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/listmunicipalityassemblyarea?municipalityId=${municipalityId}`, {
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

export const getAssemblyByIdMuniAdmin = async (id: string): Promise<ApiResponseT<AssemblyDetailResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/getassemblyareasdetail?assemblyAreaId=${id}&municipalityId=${municipalityId}`);

        return {
            success: true,
            data: response.data as AssemblyDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const addAssemblyMuniAdmin = async (formData: FormData) => {
    const municipalityId = await getCookie('municipalityId');
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

        const response = await axiosInstance.post(`adminmunicipalitypanel/createassemblyareas?municipalityId=${municipalityId}`, payload);

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

export const updateAssemblyMuniAdmin = async (formData: FormData) => {
    const municipalityId = await getCookie('municipalityId');
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
            assemblyAreasId: id,
            title,
            status,
            latitude,
            longitude,
        };

        const response = await axiosInstance.put(`adminmunicipalitypanel/updateassemblyareas?municipalityId=${municipalityId}`, payload);

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

export const deleteAssemblyMuniAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`adminmunicipalitypanel/deletevenue?id=${id}`);

        return {
            success: true,
            message: response.data.message || 'Toplanma alanı içeriği başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}