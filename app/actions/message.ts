"use server";

import { ApiResponse, MessagesResponse } from "@/types";
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
            return { success: false, message: "", errors: 'Şikayet ID boş olamaz.' };
        }

        const data = await apiFetch<ApiResponse>('message/getmessages', {
            method: 'POST',
            body: { complaintId }
        });

        return data as MessagesResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}