"use server"
import { ApiResponseT, FAQDetail, FAQResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const getFAQsMuniAdmin = async (): Promise<ApiResponseT<FAQResponse>> => {
    try {
        const response = await axiosInstance.get('adminmunicipalitypanel/getfrequentlyaskedquestions');

        return {
            success: true,
            data: response.data as FAQResponse
        };

    } catch (error) {
        return handleApiError(error);
    }
}

export const getFAQByIdMuniAdmin = async (id: string): Promise<ApiResponseT<FAQDetail>> => {
    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/getfrequentlyaskedquestiondetail?faqId=${id}`);

        return {
            success: true,
            data: response.data as FAQDetail
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const addFAQMuniAdmin = async (formData: FormData) => {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!title || !description) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            title,
            description
        };

        const response = await axiosInstance.post('adminmunicipalitypanel/createfrequentlyaskedquestions',
            payload
        );

        return {
            success: true,
            message: response.data.message || 'Sıkça Sorulan Sorular başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateFAQMuniAdmin = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!id || !title || !description) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            faqId: id,
            title,
            description
        };

        const response = await axiosInstance.put('adminmunicipalitypanel/updatefrequentlyaskedquestion', payload);

        return {
            success: true,
            message: response.data.message || 'Sıkça Sorulan Sorular başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const deleteFAQMuniAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`adminmunicipalitypanel/deletefrequentlyaskedquestion?faqId=${id}`);

        return {
            success: true,
            message: response.data.message || 'Sıkça Sorulan Sorular başarıyla silindi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}