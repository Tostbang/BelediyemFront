"use server"

import { ApiResponse, ContractsResponse, ContractDetailResponse } from "@/types";
import { apiFetch } from "@/utils/api";

export const getContractsAdmin = async () => {
    try {
        const data = await apiFetch('admin/getallcontract');

        return data as ContractsResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getContractByIDAdmin = async (id: string) => {
    try {
        const data = await apiFetch(`admin/getcontractdetail?contractId=${id}`);

        return data as ContractDetailResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateContractAdmin = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const content = formData.get('content') as string;

        if (!id || !name || !content) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            id,
            name,
            content
        };

        const response = await apiFetch<ApiResponse>('admin/contractupdate', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Sözleşme İçerik başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Sözleşme İçerik güncellenemedi.',
        };
    }
}