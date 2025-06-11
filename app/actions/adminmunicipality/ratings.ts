"use server"

import { ApiResponseT, PaginationBody, RatingDetail, RatingResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";
import { getCookie } from "../cookies";

export const getRatingsMuniAdmin = async (body: PaginationBody): Promise<ApiResponseT<RatingResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/listmunicipalityallratings?municipalityId=${municipalityId}`, {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return {
            success: true,
            data: response.data as RatingResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getRatingByIdMuniAdmin = async (id: string): Promise<ApiResponseT<RatingDetail>> => {
    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/getratingdetail?ratingId=${id}`);

        return {
            success: true,
            data: response.data as RatingDetail
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const approvedRatingMuniAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/approvedrating?ratingId=${id}`);
        return {
            success: true,
            message: response.data.message || 'Değerlendirme başarıyla onaylandı.',
            errors: [],
        };

    } catch (error) {
        return handleApiError(error);
    }
}
