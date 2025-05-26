"use server"

import { ApiResponse, PaginationBody, RatingResponse } from "@/types";
import { apiFetch } from "@/utils/api";

export const getRatingsMuni = async (body: PaginationBody) => {
    try {
        const data = await apiFetch('municipality/listmunicipalityallratings', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize
            }
        });

        return data as RatingResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const approvedRatingMuni = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>(`municipality/approvedrating?ratingId=${id}`);
        return {
            success: true,
            message: data.message || 'Değerlendirme başarıyla onaylandı.',
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
