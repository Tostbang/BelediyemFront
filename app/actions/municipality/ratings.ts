"use server"

import { ApiResponseT, PaginationBody, RatingDetail, RatingResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const getRatingsMuni = async (body: PaginationBody): Promise<ApiResponseT<RatingResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/listmunicipalityallratings', {
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

export const getRatingByIdMuni = async (id: string): Promise<ApiResponseT<RatingDetail>> => {
    try {
        const response = await axiosInstance.get(`municipality/getratingdetail?ratingId=${id}`);

        return {
            success: true,
            data: response.data as RatingDetail
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const approvedRatingMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/approvedrating?ratingId=${id}`);

        return {
            success: true,
            message: response.data.message || 'Değerlendirme başarıyla onaylandı.',
            errors: [],
        };

    } catch (error) {
        return handleApiError(error);
    }
}
