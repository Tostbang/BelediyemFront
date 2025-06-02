"use server"

import { ApiResponse, PaginationBody, SupportDetailResponse, SupportResponse } from "@/types";
import { apiFetch } from "@/utils/api";

export const getSupportsMuni = async (body: PaginationBody) => {
    try {
        const data = await apiFetch('municipality/municipalitygetsupports', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize,
                searchText: body.searchText || ''
            }
        });

        return data as SupportResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getSupporByIdMuni = async (id: string) => {
    try {
        const data = await apiFetch(`municipality/municipalitygetsupportdetail?supportId=${id}`, {
            method: 'GET'
        });

        return data as SupportDetailResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const answerToSupportMuni = async (id: string, message: string) => {
    try {
        const response = await apiFetch<ApiResponse>('municipality/answeredsupporttoemail', {
            method: 'POST',
            body: {
                supportId: id,
                message,
            }
        });

        return {
            success: true,
            message: response.message || 'Destek talebine cevap verildi.'
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Cevap verilirken bir hata oluştu.' };
    }
}

export const forwardSupportToAdminMuni = async (id: string) => {
    try {
        const response = await apiFetch<ApiResponse>(`municipality/supporttoadmin?supportId=${id}`);

        return {
            success: true,
            message: response.message || 'Destek talebi admine başarıyla yönlendirildi.'
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Destek talebi admine yönlendirilirken bir hata oluştu.' };
    }
}

export const rejecetSupportMuni = async (id: string) => {
    try {
        const response = await apiFetch<ApiResponse>(`municipality/supporttoreject?supportId=${id}`);

        return {
            success: true,
            message: response.message || 'Destek talebi reddedildi.'
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Destek talebi reddedilirken bir hata oluştu.' };
    }
}