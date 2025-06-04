"use server";

import { ApiResponse, ChatHistoryResponse, MessagesResponse, PaginationBody } from "@/types";
import { apiFetch } from "@/utils/api";

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

        const response = await apiFetch<ApiResponse>('message/sendmessage', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Mesaj başarıyla güncellendi.',
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

        const data = await apiFetch(`message/getmessages?complaintId=${complaintId}`);

        return data as MessagesResponse;

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
        const data = await apiFetch('message/getcomplaintsummaries', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize,
            }
        });

        return data as ChatHistoryResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}
