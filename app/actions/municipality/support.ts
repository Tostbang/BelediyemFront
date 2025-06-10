"use server"

import { ApiResponseT, PaginationBody, SupportDetailResponse, SupportResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const getSupportsMuni = async (body: PaginationBody): Promise<ApiResponseT<SupportResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/municipalitygetsupports', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            searchText: body.searchText || ''
        });

        return {
            success: true,
            data: response.data as SupportResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getSupporByIdMuni = async (id: string): Promise<ApiResponseT<SupportDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/municipalitygetsupportdetail?supportId=${id}`);

        return {
            success: true,
            data: response.data as SupportDetailResponse
        };
    } catch (error) {
        return handleApiError(error);
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
        return handleApiError(error);
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
        return handleApiError(error);
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
        return handleApiError(error);
    }
}