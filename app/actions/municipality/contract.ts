"use server"

import { ContractsResponse, ContractDetailResponse, ApiResponseT } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const getContractsMuni = async (): Promise<ApiResponseT<ContractsResponse>> => {
    try {
        const response = await axiosInstance.get('municipality/getallcontract');

        return {
            success: true,
            data: response.data as ContractsResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getContractByIDMuni = async (id: string): Promise<ApiResponseT<ContractDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/getcontractdetail?contractId=${id}`);
        return {
            success: true,
            data: response.data as ContractDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}
