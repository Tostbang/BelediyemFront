"use server"

import { PaginationBody, RatingDetail, RatingResponse } from "@/types";
import axiosInstance from "@/utils/axios";

export const getRatingsMuni = async (body: PaginationBody) => {
    try {
        const response = await axiosInstance.post('municipality/listmunicipalityallratings', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return response.data as RatingResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getRatingByIdMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/getratingdetail?ratingId=${id}`);

        return response.data as RatingDetail;
    } catch (error) {
        console.error(error);
        return null;
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Değerlendirme onaylanamadı.',
        };
    }
}
