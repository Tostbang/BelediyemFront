"use server";

import { ChatHistoryResponse, MessagesResponse, PaginationBody } from "@/types";
import axiosInstance from "@/utils/axios";

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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Mesaj güncellenemedi.',
        };
    }
}

export const getMessages = async (complaintId: string) => {
    try {
        if (!complaintId) {
            return {
                success: false,
                message: "",
                code: "400",
                errors: 'Şikayet ID boş olamaz.',
                messageGroups: []
            } as MessagesResponse;
        }

        const response = await axiosInstance.get(`message/getmessages?complaintId=${complaintId}`);

        return response.data as MessagesResponse;

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            code: "400",
            errors: error instanceof Error ? error.message : 'Mesaj alınamadı.',
            messageGroups: []
        } as MessagesResponse;
    }
}

export const getChatHistyory = async (body: PaginationBody) => {
    try {
        const response = await axiosInstance.post('message/getcomplaintsummaries', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
        });

        return response.data as ChatHistoryResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}
