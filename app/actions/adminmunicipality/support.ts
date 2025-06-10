"use server"

import { ApiResponseT, PaginationBody, SupportDetailResponse, SupportResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";
import { getCookie } from "../cookies";

export const getSupportsMuniAdmin = async (body: PaginationBody): Promise<ApiResponseT<SupportResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/municipalitygetsupports?municipalityId=${municipalityId}`, {
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

export const getSupporByIdMuniAdmin = async (id: string): Promise<ApiResponseT<SupportDetailResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/municipalitygetsupportdetail?supportId=${id}&municipalityId=${municipalityId}`);

        return {
            success: true,
            data: response.data as SupportDetailResponse
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const answerToSupportMuniAdmin = async (id: string, message: string) => {
    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/answeredsupporttoemail`, {
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

export const rejecetSupportMuniAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/supporttoreject?supportId=${id}`);

        return {
            success: true,
            message: response.data.message || 'Destek talebi reddedildi.'
        };
    } catch (error) {
        return handleApiError(error);
    }
}