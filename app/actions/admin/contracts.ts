"use server"

import { ApiResponse, ContractsResponse, ContractDetailResponse } from "@/types";
import axiosInstance from "@/utils/axios";

export const getContractsAdmin = async () => {
    try {
        const response = await axiosInstance.get('admin/getallcontract');
        return response.data as ContractsResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getContractByIDAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.get(`admin/getcontractdetail?contractId=${id}`);
        return response.data as ContractDetailResponse;
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

        const response = await axiosInstance.put('admin/contractupdate', payload);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Sözleşme İçerik başarıyla güncellendi.',
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