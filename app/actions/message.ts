"use server";

import { ApiResponseT, ChatHistoryResponse, MessagesResponse, PaginationBody } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const sendMessage = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const content = formData.get('content') as string;
        if (!id || !content) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            complaintId: id,
            content
        };

        const response = await axiosInstance.post('message/sendmessage', payload);

        return {
            success: true,
            message: response.data.message || 'Mesaj başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getMessages = async (complaintId: string): Promise<ApiResponseT<MessagesResponse>> => {
    try {
        if (!complaintId) {
            return { success: false, errors: "Şikayet Id boş olamaz" };
        }

        const response = await axiosInstance.get(`message/getmessages?complaintId=${complaintId}`);

        return {
            success: true,
            data: response.data as MessagesResponse
        }

    } catch (error) {
        return handleApiError(error);
    }
}

export const getChatHistyory = async (body: PaginationBody): Promise<ApiResponseT<ChatHistoryResponse>> => {
    try {
        const response = await axiosInstance.post('message/getcomplaintsummaries', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
        });

        return {
            success: true,
            data: response.data as ChatHistoryResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getChatHistyoryStaff = async (body: PaginationBody): Promise<ApiResponseT<ChatHistoryResponse>> => {
    try {
        const response = await axiosInstance.post('message/staffgetcomplaintsummaries', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
        });

        return {
            success: true,
            data: response.data as ChatHistoryResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}
