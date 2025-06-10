"use server"

import { ApiResponse, ContractsResponse, ContractDetailResponse, ApiResponseT } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const getContractsAdmin = async (): Promise<ApiResponseT<ContractsResponse>> => {
    try {
        const response = await axiosInstance.get('admin/getallcontract');

        return {
            success: true,
            data: response.data as ContractsResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getContractByIDAdmin = async (id: string): Promise<ApiResponseT<ContractDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`admin/getcontractdetail?contractId=${id}`);
        return {
            success: true,
            data: response.data as ContractDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
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
        return handleApiError(error);
    }
}