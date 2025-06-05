"use server"

import { PaginationBody, SupportDetailResponse, SupportResponse } from "@/types";
import axiosInstance from "@/utils/axios";

export const getSupportsMuni = async (body: PaginationBody) => {
    try {
        const response = await axiosInstance.post('municipality/municipalitygetsupports', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            searchText: body.searchText || ''
        });

        return response.data as SupportResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getSupporByIdMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/municipalitygetsupportdetail?supportId=${id}`);

        return response.data as SupportDetailResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const answerToSupportMuni = async (id: string, message: string) => {
    try {
        const response = await axiosInstance.post('municipality/answeredsupporttoemail', {
            supportId: id,
            message,
        });

        return {
            success: true,
            message: response.data.message || 'Destek talebine cevap verildi.'
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Cevap verilirken bir hata oluştu.' };
    }
}

export const forwardSupportToAdminMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/supporttoadmin?supportId=${id}`);

        return {
            success: true,
            message: response.data.message || 'Destek talebi admine başarıyla yönlendirildi.'
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Destek talebi admine yönlendirilirken bir hata oluştu.' };
    }
}

export const rejecetSupportMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/supporttoreject?supportId=${id}`);

        return {
            success: true,
            message: response.data.message || 'Destek talebi reddedildi.'
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Destek talebi reddedilirken bir hata oluştu.' };
    }
}